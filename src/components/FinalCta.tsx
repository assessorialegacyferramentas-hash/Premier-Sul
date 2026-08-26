import React from 'react';
import { CONFIG } from '../config';
import { buildCampaignUrl, trackEvent } from '../utils/tracking';

export const FinalCta: React.FC = () => {
  const targetUrl = buildCampaignUrl(CONFIG.CAMPAIGN_BASE_URL);

  const handleClick = () => {
    trackEvent('click_rifa', { location: 'final_bottom_cta' });
  };

  return (
    <section
      id="final-cta-section"
      className="w-full px-4 pt-2 pb-6 flex flex-col items-center"
    >
      <div className="w-full bg-[#111111] border border-[#222222] rounded-xl p-5 text-center shadow-xl">
        <h2
          id="final-cta-headline"
          className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight"
        >
          A PRÓXIMA AMAROK PODE SER A SUA.
        </h2>

        <p
          id="final-cta-text"
          className="mt-1 text-[11px] text-[#A7A7A7] font-medium"
        >
          Não deixe para depois. Entre agora na campanha.
        </p>

        <a
          id="btn-final-cta"
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="gold-gradient gold-glow mt-4 w-full h-[52px] px-4 flex items-center justify-center rounded-xl no-underline transform transition-transform active:scale-95 animate-cta-pulse text-black font-montserrat font-black text-sm uppercase tracking-wide shadow-md"
        >
          {CONFIG.CAMPAIGN_FINAL_CTA_TEXT}
        </a>
      </div>
    </section>
  );
};
