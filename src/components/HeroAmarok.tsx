import React, { useState } from 'react';
import { CONFIG } from '../config';

export const HeroAmarok: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = CONFIG.AMAROK_IMAGES;

  return (
    <section id="hero-amarok" className="w-full px-4 pt-1 pb-4 flex flex-col items-center">
      {/* Frame Principal da Foto da Amarok com Car Mask e Drop Shadow Dourado */}
      <div className="relative w-full aspect-[16/10] flex items-center justify-center mb-2">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0e0e0e] border border-[#222222] shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
          {images.map((img, idx) => {
            const isHero = idx === 0;
            const isVisible = activeImageIndex === idx;

            return (
              <picture
                key={img.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                  isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* 1. Formato AVIF mais leve e eficiente */}
                <source
                  type="image/avif"
                  srcSet={`
                    /assets/images/amarok/${img.baseName}-480.avif 480w,
                    /assets/images/amarok/${img.baseName}-768.avif 768w,
                    /assets/images/amarok/${img.baseName}-1080.avif 1080w,
                    /assets/images/amarok/${img.baseName}-1440.avif 1440w
                  `}
                  sizes="(max-width: 480px) 100vw, 430px"
                />

                {/* 2. Formato WebP compatível */}
                <source
                  type="image/webp"
                  srcSet={`
                    /assets/images/amarok/${img.baseName}-480.webp 480w,
                    /assets/images/amarok/${img.baseName}-768.webp 768w,
                    /assets/images/amarok/${img.baseName}-1080.webp 1080w,
                    /assets/images/amarok/${img.baseName}-1440.webp 1440w
                  `}
                  sizes="(max-width: 480px) 100vw, 430px"
                />

                {/* 3. Fallback Img com dimensões explícitas para CLS = 0 */}
                <img
                  id={`amarok-photo-${idx}`}
                  src={img.fallbackUrl}
                  alt={img.alt}
                  width={img.width || 720}
                  height={img.height || 450}
                  referrerPolicy="no-referrer"
                  loading={isHero ? 'eager' : 'lazy'}
                  // @ts-ignore: React 19 supports fetchPriority
                  fetchPriority={isHero ? 'high' : 'auto'}
                  decoding={isHero ? 'sync' : 'async'}
                  className="w-full h-full object-cover select-none"
                  onError={(e) => {
                    // Fallback para URL remota se houver erro
                    const target = e.currentTarget;
                    if (target.src !== img.remoteFallback) {
                      target.src = img.remoteFallback;
                    }
                  }}
                />
              </picture>
            );
          })}

          {/* Gradiente sutil inferior */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-20 pointer-events-none" />

          {/* Seletor rápido de fotos (2 imagens) */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2.5 z-30 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  id={`btn-photo-toggle-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Visualizar ${img.label}`}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-[#FFC928] ${
                    activeImageIndex === idx
                      ? 'bg-[#FFC928] text-black font-extrabold shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {idx === 0 ? '1' : '2'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Título de Impacto & Subtexto */}
      <div className="text-center px-2 mt-2 w-full max-w-[400px]">
        <h1
          id="campaign-headline-title"
          className="font-montserrat font-black text-2xl sm:text-3xl leading-none italic mb-1.5 tracking-tighter uppercase text-white"
        >
          AMAROK V6 <span className="text-[#FFC928]">STAGE 2</span>
        </h1>
        <p
          id="campaign-headline"
          className="text-[#FFC928] font-extrabold text-base sm:text-lg leading-tight uppercase tracking-tight"
        >
          {CONFIG.CAMPAIGN_HEADLINE}
        </p>
        <p
          id="campaign-subtext"
          className="text-[11px] text-[#A7A7A7] mt-1 font-medium leading-relaxed"
        >
          {CONFIG.CAMPAIGN_SUBTEXT}
        </p>
      </div>
    </section>
  );
};
