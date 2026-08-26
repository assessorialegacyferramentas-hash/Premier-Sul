import React, { forwardRef } from 'react';
import { CONFIG } from '../config';
import { buildCampaignUrl, trackEvent } from '../utils/tracking';

export interface MainCtaProps {
  onCtaClick?: () => void;
}

export const MainCta = forwardRef<HTMLDivElement, MainCtaProps>(
  ({ onCtaClick }, ref) => {
    const targetUrl = buildCampaignUrl(CONFIG.CAMPAIGN_BASE_URL);

    const handleClick = () => {
      trackEvent('click_rifa', { location: 'main_hero_cta' });
      if (onCtaClick) onCtaClick();
    };

    return (
      <div
        ref={ref}
        id="main-cta-container"
        className="w-full px-4 pt-2 pb-4 flex flex-col items-center"
      >
        <a
          id="btn-main-cta"
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="gold-gradient gold-glow w-full min-h-[62px] py-2 px-4 flex flex-col items-center justify-center rounded-xl no-underline transform transition-transform active:scale-95 animate-cta-pulse focus:outline-none focus:ring-4 focus:ring-[#FFC928]/50 shadow-[0_4px_20px_rgba(255,201,40,0.35)]"
        >
          <span className="text-black font-montserrat font-black text-base sm:text-lg tracking-wide uppercase leading-tight">
            {CONFIG.CAMPAIGN_CTA_TEXT}
          </span>
          <span className="text-black/75 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">
            Você será direcionado para a campanha oficial.
          </span>
        </a>
      </div>
    );
  }
);

MainCta.displayName = 'MainCta';
