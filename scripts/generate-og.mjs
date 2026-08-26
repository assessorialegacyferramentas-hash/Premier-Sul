import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const ogDir = path.join(publicDir, 'assets', 'images');
const heroFile = path.join(ogDir, 'amarok', 'amarok-hero-original.jpg');
const logoFile = path.join(ogDir, 'brand', 'logo.png');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  console.log('Generating OG Image...');
  
  // Resize amarok to fit 700x480
  const amarokHero = await sharp(heroFile)
    .resize(720, 460, { fit: 'cover', position: 'center' })
    .toBuffer();

  const logoSmall = await sharp(logoFile)
    .resize({ width: 340, height: 90, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4AF37" />
          <stop offset="50%" stop-color="#FFC928" />
          <stop offset="100%" stop-color="#D4AF37" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="70%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFC928" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#FFC928" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background with subtle gold border -->
      <rect width="${width}" height="${height}" fill="#080808" />
      <circle cx="820" cy="315" r="380" fill="url(#goldGlow)" />
      <rect x="16" y="16" width="${width - 32}" height="${height - 32}" rx="16" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="2" />

      <!-- Left Text Content -->
      <g transform="translate(64, 200)">
        <rect x="0" y="0" width="180" height="32" rx="16" fill="#181818" stroke="#D4AF37" stroke-width="1.5" />
        <text x="90" y="21" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFC928" text-anchor="middle" letter-spacing="2">CAMPANHA OFICIAL</text>

        <text x="0" y="80" font-family="sans-serif" font-size="44" font-weight="900" fill="#FFFFFF">AMAROK V6</text>
        <text x="0" y="130" font-family="sans-serif" font-size="44" font-weight="900" fill="url(#goldGrad)">STAGE 2 (350 CV)</text>

        <text x="0" y="176" font-family="sans-serif" font-size="18" font-weight="500" fill="#A7A7A7">Conheça a campanha oficial e participe</text>

        <g transform="translate(0, 210)">
          <rect x="0" y="0" width="320" height="52" rx="12" fill="url(#goldGrad)" />
          <text x="160" y="33" font-family="sans-serif" font-size="16" font-weight="900" fill="#080808" text-anchor="middle" letter-spacing="1">GARANTIR MINHAS COTAS</text>
        </g>
      </g>
    </svg>
  `);

  await sharp(svgOverlay)
    .composite([
      { input: logoSmall, top: 50, left: 64 },
      { input: amarokHero, top: 85, left: 440 }
    ])
    .webp({ quality: 88 })
    .toFile(path.join(ogDir, 'og-image.webp'));

  await sharp(path.join(ogDir, 'og-image.webp'))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(ogDir, 'og-image.jpg'));

  console.log('OG images created successfully!');
}

createOgImage().catch(console.error);
