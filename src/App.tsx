import { useEffect, useState, useRef } from 'react';
import { HeaderLogo } from './components/HeaderLogo';
import { HeroAmarok } from './components/HeroAmarok';
import { MainCta } from './components/MainCta';
import { VipCommunity } from './components/VipCommunity';
import { SocialAndContact } from './components/SocialAndContact';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { StickyBottomCta } from './components/StickyBottomCta';
import { initTrafficParams } from './utils/tracking';

export default function App() {
  const [isMainCtaVisible, setIsMainCtaVisible] = useState(true);
  const mainCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Inicializa e armazena parâmetros UTM / Tráfego
    initTrafficParams();

    // 2. IntersectionObserver para controlar exibição do CTA fixo no mobile
    const targetElement = mainCtaRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainCtaVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-start antialiased selection:bg-[#FFC928] selection:text-black">
      {/* Container Principal Mobile-First com limite de 430px para experiência Immersive UI focada */}
      <main className="w-full max-w-[430px] min-h-screen flex flex-col mx-auto relative bg-[#080808] border-x border-[#1a1a1a] shadow-2xl">
        {/* 1. LOGO */}
        <HeaderLogo />

        {/* 2. HERO / PRÊMIO PRINCIPAL (AMAROK) */}
        <HeroAmarok />

        {/* 3. CTA PRINCIPAL */}
        <MainCta ref={mainCtaRef} />

        {/* 4. COMUNIDADE VIP */}
        <VipCommunity />

        {/* 5. REDES E CONTATO */}
        <SocialAndContact />

        {/* 6. BLOCO FINAL DE CONVERSÃO */}
        <FinalCta />

        {/* 7. FOOTER */}
        <Footer />
      </main>

      {/* CTA FIXO NO MOBILE (Aparece apenas quando o botão principal sai da tela) */}
      <StickyBottomCta isVisible={!isMainCtaVisible} />
    </div>
  );
}
