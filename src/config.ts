/**
 * ============================================================================
 * PREMIER PRÊMIOS SUL - CONFIGURAÇÕES GERAIS E LINKS OFICIAIS
 * ============================================================================
 * Edite os links, imagens e textos abaixo conforme necessário.
 */

export const CONFIG = {
  // Dados da Marca
  BRAND_NAME: 'Premier Prêmios Sul',
  TAGLINE: 'Grandes prêmios. Grandes oportunidades.',
  COPYRIGHT_YEAR: '2026',

  // Logo Oficial (servido localmente com fallback)
  LOGO_IMAGE_URL: '/assets/images/brand/logo.webp',
  LOGO_PNG_URL: '/assets/images/brand/logo.png',
  LOGO_FALLBACK_URL: 'https://i.imgur.com/JEvRmN6.png',

  // Campanha Principal (Amarok)
  // IMPORTANTE: O parâmetro ?afiliado=trafego será sempre preservado junto com as UTMs da URL
  CAMPAIGN_NAME: 'AMAROK V6 STAGE 2',
  CAMPAIGN_HEADLINE: 'ESSA AMAROK PODE SER SUA.',
  CAMPAIGN_SUBTEXT: 'Entre agora na campanha oficial da Premier Prêmios Sul.',
  CAMPAIGN_BASE_URL: 'https://premierpremios.com/amarok-v6-stege-2-360-cv?afiliado=trafego',
  CANONICAL_URL: 'https://www.acessepremiersul.com.br/',
  OG_IMAGE_URL: 'https://www.acessepremiersul.com.br/og-image.jpg',
  META_PIXEL_ID: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || '28699639839619491',
  CAMPAIGN_CTA_TEXT: '🔥 QUERO PARTICIPAR AGORA',
  CAMPAIGN_FINAL_CTA_TEXT: '🔥 GARANTIR MINHAS COTAS',
  CAMPAIGN_STICKY_CTA_TEXT: '🔥 PARTICIPAR AGORA',

  // Imagens Otimizadas da Amarok (AVIF, WebP, JPG)
  AMAROK_IMAGES: [
    {
      id: 'img1',
      baseName: 'amarok-hero',
      fallbackUrl: '/assets/images/amarok/amarok-hero-original.jpg',
      remoteFallback: 'https://i.imgur.com/i5RGpp4.jpeg',
      alt: 'Volkswagen Amarok V6 Stage 2 350 CV - Premier Prêmios Sul',
      label: 'Foto Principal',
      width: 720,
      height: 450
    },
    {
      id: 'img2',
      baseName: 'amarok-detail',
      fallbackUrl: '/assets/images/amarok/amarok-detail-original.jpg',
      remoteFallback: 'https://i.imgur.com/LbGPzeu.jpeg',
      alt: 'Volkswagen Amarok V6 Stage 2 - Visão Traseira e Detalhes da Campanha',
      label: 'Mais Detalhes',
      width: 720,
      height: 450
    }
  ],

  // Comunidade VIP (WhatsApp)
  COMMUNITY_TITLE: '🏆 ENTRE PARA A COMUNIDADE VIP',
  COMMUNITY_TEXT: 'Receba novidades, avisos e informações das campanhas diretamente no WhatsApp.',
  COMMUNITY_CTA_TEXT: 'ENTRAR NA COMUNIDADE VIP',
  COMMUNITY_URL: 'https://chat.whatsapp.com/HlOQtU4xjLyHo1cXEld54c',

  // Redes Sociais e Suporte
  INSTAGRAM_URL: 'https://www.instagram.com/premierpremiosblumenau/',
  INSTAGRAM_HANDLE: '@premierpremiosblumenau',
  
  // ==========================================================================
  // CONFIRMAR URL OFICIAL DO FACEBOOK:
  // O link originalmente recebido era inválido (www.facebook.com/www.tiktok.com/...).
  // Se preenchido com uma URL válida (ex: 'https://facebook.com/premierpremios'),
  // o botão do Facebook será exibido automaticamente. Se vazio, fica oculto.
  // ==========================================================================
  FACEBOOK_URL: '', // // CONFIRMAR URL OFICIAL DO FACEBOOK

  // Suporte WhatsApp (número oficial sem quebras de linha)
  WHATSAPP_SUPPORT_URL: 'https://api.whatsapp.com/send/?phone=5547992722026&text&type=phone_number&app_absent=0',

  // Telegram VIP
  TELEGRAM_URL: 'https://t.me/grupovippremios',

  // Links Jurídicos / Regulamento (opcionais - deixe vazio para ocultar no footer)
  REGULAMENTO_URL: '',
  TERMOS_URL: '',
  PRIVACIDADE_URL: ''
};
