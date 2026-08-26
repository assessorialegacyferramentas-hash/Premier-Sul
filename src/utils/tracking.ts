/**
 * ============================================================================
 * SISTEMA DE RASTREAMENTO, ATRIBUIÇÃO UTM, META PIXEL E CONVERSIONS API
 * ============================================================================
 */

// Chaves UTM e identificadores de cliques monitorados
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'ttclid',
  'src',
  'sck'
];

const STORAGE_KEY = 'pps_traffic_params';

/**
 * Captura e persiste os parâmetros de tráfego presentes na URL da página.
 */
export function initTrafficParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingParams: Record<string, string> = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || '{}'
    );

    // Atualiza parâmetros capturados na URL atual
    let updated = false;
    UTM_KEYS.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        existingParams[key] = val;
        updated = true;
      }
    });

    if (updated || Object.keys(existingParams).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existingParams));
    }

    return existingParams;
  } catch (err) {
    console.warn('Erro ao processar UTMs:', err);
    return {};
  }
}

/**
 * Constrói o link final preservando parâmetros existentes (como afiliado=trafego)
 * e adicionando todos os parâmetros de UTM capturados da visita sem duplicações.
 */
export function buildCampaignUrl(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  try {
    const url = new URL(baseUrl);
    const storedParams: Record<string, string> = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || '{}'
    );

    const currentUrlParams = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((key) => {
      const val = currentUrlParams.get(key) || storedParams[key];
      if (val && !url.searchParams.has(key)) {
        url.searchParams.set(key, val);
      }
    });

    // Garante que o afiliado nunca seja removido
    if (!url.searchParams.has('afiliado')) {
      url.searchParams.set('afiliado', 'trafego');
    }

    return url.toString();
  } catch (err) {
    console.warn('Erro ao construir URL com UTMs:', err);
    return baseUrl;
  }
}

// Tipagem dos eventos suportados
export type TrackingEventName =
  | 'click_rifa'
  | 'click_whatsapp_group'
  | 'click_whatsapp_support'
  | 'click_instagram'
  | 'click_telegram';

// Mapeamento exato para eventos padrão e customizados do Meta Pixel
const META_CUSTOM_EVENT_MAP: Record<TrackingEventName, string> = {
  click_rifa: 'ClickRifa',
  click_whatsapp_group: 'ClickWhatsAppCommunity',
  click_whatsapp_support: 'ClickWhatsAppSupport',
  click_instagram: 'ClickInstagram',
  click_telegram: 'ClickTelegram'
};

/**
 * Envia evento assincronamente para a arquitetura de Meta Conversions API (CAPI)
 */
async function sendToConversionsApi(eventName: string, customEvent: string, eventData: Record<string, any>) {
  try {
    const storedParams = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_name: eventName,
        custom_event: customEvent,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: {
          client_user_agent: navigator.userAgent,
          fbc: storedParams['fbclid'] ? `fb.1.${Date.now()}.${storedParams['fbclid']}` : undefined
        },
        custom_data: eventData
      })
    }).catch(() => {
      // Ignora falhas em ambientes sem endpoint CAPI configurado
    });
  } catch {
    // Fail silently in browser
  }
}

/**
 * Dispara eventos de conversão para Meta Pixel, Conversions API, GA4 e GTM.
 * NUNCA dispara Purchase nesta microlanding (apenas eventos de intenção/clique).
 */
export function trackEvent(
  eventName: TrackingEventName,
  additionalData: Record<string, any> = {}
): void {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...additionalData
  };

  const metaCustomEvent = META_CUSTOM_EVENT_MAP[eventName] || eventName;

  // 1. Log para desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Tracking] Evento disparado: ${eventName} -> Meta: ${metaCustomEvent}`, eventPayload);
  }

  // 2. Custom DOM Event (permite escuta por outros scripts ou extensões)
  window.dispatchEvent(
    new CustomEvent('pps_track_event', { detail: { eventName, metaCustomEvent, ...eventPayload } })
  );

  // 3. Meta Pixel (fbq)
  try {
    const win = window as any;
    if (typeof win.fbq === 'function') {
      // Dispara o evento customizado específico exigido
      win.fbq('trackCustom', metaCustomEvent, eventPayload);
      
      // Também dispara o identificador interno
      win.fbq('trackCustom', eventName, eventPayload);
    }
  } catch (e) {
    console.warn('Meta Pixel dispatch error:', e);
  }

  // 4. Conversions API (server-side proxy)
  sendToConversionsApi(eventName, metaCustomEvent, eventPayload);

  // 5. Google Analytics 4 (gtag)
  try {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, eventPayload);
    }
  } catch (e) {
    console.warn('GA4 dispatch error:', e);
  }

  // 6. Google Tag Manager (dataLayer)
  try {
    const win = window as any;
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        meta_event: metaCustomEvent,
        ...eventPayload
      });
    }
  } catch (e) {
    console.warn('GTM dispatch error:', e);
  }
}
