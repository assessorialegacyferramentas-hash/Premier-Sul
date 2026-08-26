import React from 'react';
import { CONFIG } from '../config';

export const Footer: React.FC = () => {
  const hasLegalLinks = Boolean(
    CONFIG.REGULAMENTO_URL || CONFIG.TERMOS_URL || CONFIG.PRIVACIDADE_URL
  );

  return (
    <footer
      id="main-footer"
      className="w-full px-4 pt-6 pb-24 sm:pb-8 border-t border-[#1a1a1a] text-center flex flex-col items-center justify-center bg-[#080808]"
    >
      <p id="footer-brand" className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
        {CONFIG.BRAND_NAME}
      </p>

      <p id="footer-copyright" className="text-[8px] text-white/30 uppercase mt-1 tracking-wider">
        &copy; {CONFIG.COPYRIGHT_YEAR} {CONFIG.BRAND_NAME}. Todos os direitos reservados.
      </p>

      {/* Links Jurídicos / Regulamento - Ativados automaticamente se URLs forem configuradas */}
      {hasLegalLinks && (
        <div id="footer-legal-links" className="mt-2.5 flex items-center justify-center gap-4 text-[9px] text-[#777777]">
          {CONFIG.REGULAMENTO_URL && (
            <a
              href={CONFIG.REGULAMENTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFC928] transition-colors"
            >
              Regulamento
            </a>
          )}
          {CONFIG.TERMOS_URL && (
            <a
              href={CONFIG.TERMOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFC928] transition-colors"
            >
              Termos de Uso
            </a>
          )}
          {CONFIG.PRIVACIDADE_URL && (
            <a
              href={CONFIG.PRIVACIDADE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFC928] transition-colors"
            >
              Privacidade
            </a>
          )}
        </div>
      )}
    </footer>
  );
};
