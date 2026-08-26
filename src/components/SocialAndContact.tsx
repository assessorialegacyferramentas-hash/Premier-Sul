import React from 'react';
import { Instagram, Send, MessageSquare, Facebook } from 'lucide-react';
import { CONFIG } from '../config';
import { trackEvent } from '../utils/tracking';

export const SocialAndContact: React.FC = () => {
  const isFacebookConfigured =
    Boolean(CONFIG.FACEBOOK_URL) &&
    CONFIG.FACEBOOK_URL.trim() !== '' &&
    !CONFIG.FACEBOOK_URL.includes('tiktok.com');

  return (
    <section
      id="social-and-contact-section"
      className="w-full px-4 py-3 flex flex-col items-center"
    >
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          {/* Instagram */}
          <a
            id="btn-instagram"
            href={CONFIG.INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_instagram')}
            className="btn-secondary py-3 px-3 rounded-lg flex items-center justify-center gap-2 group active:scale-95 transition-all text-center"
            aria-label="Abrir Instagram oficial da Premier Prêmios Sul"
          >
            <Instagram className="w-4 h-4 text-[#E1306C] shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Instagram</span>
          </a>

          {/* Suporte WhatsApp */}
          <a
            id="btn-whatsapp-support"
            href={CONFIG.WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_whatsapp_support')}
            className="btn-secondary py-3 px-3 rounded-lg flex items-center justify-center gap-2 group active:scale-95 transition-all text-center"
            aria-label="Falar com o suporte no WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">Suporte</span>
          </a>
        </div>

        {/* Telegram VIP */}
        <a
          id="btn-telegram"
          href={CONFIG.TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('click_telegram')}
          className="btn-secondary w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 group active:scale-95 transition-all text-center"
          aria-label="Entrar no Telegram VIP da Premier Prêmios Sul"
        >
          <Send className="w-3.5 h-3.5 text-[#0088cc] shrink-0" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#A7A7A7] group-hover:text-white transition-colors">
            Telegram VIP
          </span>
        </a>

        {/* Facebook (condicional até configuração de URL válida) */}
        {isFacebookConfigured && (
          <a
            id="btn-facebook"
            href={CONFIG.FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-2.5 w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 group active:scale-95 transition-all text-center"
            aria-label="Abrir Facebook oficial"
          >
            <Facebook className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-white">
              Facebook Oficial
            </span>
          </a>
        )}
      </div>
    </section>
  );
};
