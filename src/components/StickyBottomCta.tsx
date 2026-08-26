import React from 'react';
import { CONFIG } from '../config';
import { buildCampaignUrl, trackEvent } from '../utils/tracking';

export interface StickyBottomCtaProps {
  isVisible: boolean;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  const targetUrl = buildCampaignUrl(CONFIG.CAMPAIGN_BASE_URL);

  const handleClick = () => {
    trackEvent('click_rifa', { location: 'sticky_bottom_cta' });
  };

  return (
    <div
      id="sticky-bottom-bar"
      className="fixed inset-x-0 bottom-0 z-50 p-3 bg-black/90 backdrop-blur-lg border-t border-[#D4AF37]/30 shadow-[0_-8px_30px_rgba(0,0,0,0.9)] flex justify-center transition-all duration-300 transform translate-y-0"
    >
      <div className="w-full max-w-[430px]">
        <a
          id="btn-sticky-cta"
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="w-full min-h-[50px] px-4 py-2.5 rounded-xl gold-gradient gold-glow text-black font-montserrat font-black text-sm tracking-wider uppercase flex items-center justify-center text-center shadow-[0_4px_16px_rgba(255,201,40,0.4)] active:scale-95 transition-transform"
        >
          {CONFIG.CAMPAIGN_STICKY_CTA_TEXT}
        </a>
      </div>
    </div>
  );
};
