import React, { useState } from 'react';
import { CONFIG } from '../config';

export const HeaderLogo: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <header id="header-logo" className="pt-6 pb-3 px-4 text-center flex flex-col items-center w-full">
      <div className="w-full max-w-[260px] flex justify-center mb-1.5 min-h-[48px] items-center">
        {!hasError ? (
          <picture className="flex justify-center items-center">
            <source srcSet={CONFIG.LOGO_IMAGE_URL} type="image/webp" />
            <source srcSet={CONFIG.LOGO_PNG_URL} type="image/png" />
            <img
              id="brand-logo"
              src={CONFIG.LOGO_PNG_URL}
              alt="Premier Prêmios Sul - Logo Oficial"
              width={220}
              height={48}
              className="h-12 w-auto max-h-[48px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] select-none"
              referrerPolicy="no-referrer"
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
              decoding="sync"
              onError={() => setHasError(true)}
            />
          </picture>
        ) : (
          <div
            id="brand-logo-fallback"
            className="text-center py-1 font-montserrat font-black tracking-wider text-xl uppercase"
          >
            <span className="text-white">PREMIER</span>{' '}
            <span className="text-[#FFC928]">PRÊMIOS SUL</span>
          </div>
        )}
      </div>

      <p
        id="header-tagline"
        className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold opacity-95"
      >
        {CONFIG.TAGLINE}
      </p>
    </header>
  );
};
