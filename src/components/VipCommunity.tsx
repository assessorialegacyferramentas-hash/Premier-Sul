import React from 'react';
import { CONFIG } from '../config';
import { trackEvent } from '../utils/tracking';

export const VipCommunity: React.FC = () => {
  const handleClick = () => {
    trackEvent('click_whatsapp_group');
  };

  return (
    <section
      id="vip-community-section"
      className="w-full px-4 py-2 flex flex-col items-center"
    >
      <div className="w-full bg-[#111111] border border-[#222222] hover:border-[#25D366]/40 rounded-xl p-4 text-center transition-colors shadow-lg">
        <h2
          id="vip-community-title"
          className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight flex items-center justify-center gap-1.5"
        >
          {CONFIG.COMMUNITY_TITLE}
        </h2>

        <p
          id="vip-community-text"
          className="mt-1 text-[11px] text-[#A7A7A7] leading-relaxed max-w-[340px] mx-auto"
        >
          {CONFIG.COMMUNITY_TEXT}
        </p>

        <a
          id="btn-vip-community"
          href={CONFIG.COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="btn-secondary mt-3 w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 group text-[#25D366] hover:text-[#25D366] active:scale-95 transition-all text-xs font-bold uppercase tracking-tight shadow-sm"
        >
          <svg className="w-4 h-4 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835l.398.236c1.432.85 3.087 1.299 4.782 1.299 5.002 0 9.073-4.071 9.076-9.074.001-2.424-.943-4.703-2.659-6.42s-3.997-2.662-6.422-2.663c-5.004 0-9.074 4.069-9.077 9.073-.001 1.831.551 3.613 1.597 5.163l.261.387-1.01 3.69 3.784-.993zm8.384-5.263c-.273-.137-1.616-.798-1.867-.889-.25-.09-.432-.137-.614.137-.182.274-.706.889-.865 1.072-.158.182-.317.205-.59.068-.273-.137-1.155-.426-2.199-1.358-.813-.725-1.362-1.62-1.521-1.894-.159-.274-.017-.422.12-.558.122-.123.273-.319.41-.479.136-.159.182-.274.273-.456.091-.183.045-.342-.023-.479-.068-.137-.614-1.482-.841-2.03-.22-.533-.443-.459-.614-.467-.158-.008-.341-.01-.524-.01s-.478.069-.729.342c-.25.274-.956.935-.956 2.281 0 1.347.979 2.647 1.116 2.83.137.183 1.927 2.942 4.668 4.127.652.282 1.161.451 1.557.577.654.208 1.249.179 1.72.109.525-.078 1.616-.661 1.844-1.299.227-.638.227-1.186.159-1.299-.069-.114-.251-.183-.524-.319z"/>
          </svg>
          <span className="font-bold uppercase tracking-tight">Comunidade VIP WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
