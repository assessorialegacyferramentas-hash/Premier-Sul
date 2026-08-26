import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const amarokDir = path.join(publicDir, 'assets', 'images', 'amarok');
const brandDir = path.join(publicDir, 'assets', 'images', 'brand');
const ogDir = path.join(publicDir, 'assets', 'images');

fs.mkdirSync(amarokDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

async function downloadBuffer(url) {
  console.log(`Downloading ${url}...`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function processImage(buffer, baseName) {
  const widths = [480, 768, 1080, 1440];
  
  // Save original compressed JPG
  await sharp(buffer)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(amarokDir, `${baseName}-original.jpg`));

  for (const width of widths) {
    // Generate WebP
    const webpPath = path.join(amarokDir, `${baseName}-${width}.webp`);
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);
    const webpStat = fs.statSync(webpPath);
    console.log(`Created ${baseName}-${width}.webp (${Math.round(webpStat.size / 1024)} KB)`);

    // Generate AVIF
    const avifPath = path.join(amarokDir, `${baseName}-${width}.avif`);
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 75, effort: 3 })
      .toFile(avifPath);
    const avifStat = fs.statSync(avifPath);
    console.log(`Created ${baseName}-${width}.avif (${Math.round(avifStat.size / 1024)} KB)`);
  }
}

async function generateBrandAndFavicons(logoBuffer) {
  // Save optimized logo
  await sharp(logoBuffer)
    .png({ compressionLevel: 9 })
    .toFile(path.join(brandDir, 'logo.png'));
  
  await sharp(logoBuffer)
    .webp({ quality: 90 })
    .toFile(path.join(brandDir, 'logo.webp'));

  // Favicons based on brand logo / crown / badge
  // Create circular or square badge with dark luxury background
  const size16 = await sharp(logoBuffer).resize(16, 16, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 0 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), size16);

  const size32 = await sharp(logoBuffer).resize(32, 32, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 0 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), size32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), size32); // Valid PNG-based ICO for modern browsers

  const size180 = await sharp(logoBuffer).resize(180, 180, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 1 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), size180);

  const size192 = await sharp(logoBuffer).resize(192, 192, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 1 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), size192);

  const size512 = await sharp(logoBuffer).resize(512, 512, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 1 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), size512);

  console.log('Favicons generated successfully.');
}

async function generateOgImage(amarokBuffer, logoBuffer) {
  // Generate professional 1200x630 OG image
  // Composition: dark luxury background (#080808) with gold gradient borders/accents, official logo, Amarok showcase, and clear typography
  const width = 1200;
  const height = 630;

  // Resize amarok to fit right/center portion
  const amarokHero = await sharp(amarokBuffer)
    .resize(750, 480, { fit: 'cover' })
    .toBuffer();

  const logoSmall = await sharp(logoBuffer)
    .resize({ width: 340, height: 100, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // SVG overlay for styling, typography, badge
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width}" ${height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D4AF37" />
          <stop offset="50%" stop-color="#FFC928" />
          <stop offset="100%" stop-color="#D4AF37" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#121212" />
          <stop offset="100%" stop-color="#060606" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="70%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFC928" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#FFC928" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background with subtle gold border -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
      <circle cx="800" cy="315" r="400" fill="url(#goldGlow)" />
      <rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="16" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="2" />

      <!-- Left Content Box -->
      <g transform="translate(60, 240)">
        <rect x="0" y="0" width="190" height="34" rx="17" fill="#1C1C1C" stroke="#D4AF37" stroke-width="1.5" />
        <text x="95" y="22" font-family="Montserrat, Arial, sans-serif" font-size="12" font-weight="900" fill="#FFC928" text-anchor="middle" letter-spacing="2">CAMPANHA OFICIAL</text>

        <text x="0" y="80" font-family="Montserrat, Arial, sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" font-style="italic">AMAROK V6</text>
        <text x="0" y="128" font-family="Montserrat, Arial, sans-serif" font-size="44" font-weight="900" fill="url(#goldGrad)" font-style="italic">STAGE 2 (350 CV)</text>

        <text x="0" y="172" font-family="Montserrat, Arial, sans-serif" font-size="18" font-weight="600" fill="#A7A7A7">Grandes prêmios. Grandes oportunidades.</text>

        <!-- CTA Badge -->
        <g transform="translate(0, 210)">
          <rect x="0" y="0" width="340" height="54" rx="12" fill="url(#goldGrad)" />
          <text x="170" y="34" font-family="Montserrat, Arial, sans-serif" font-size="16" font-weight="900" fill="#080808" text-anchor="middle" letter-spacing="1">GARANTIR MINHAS COTAS</text>
        </g>
      </g>
    </svg>
  `);

  const ogComposite = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 8, g: 8, b: 8, alpha: 1 }
    }
  })
    .composite([
      { input: svgOverlay, top: 0, left: 0 },
      { input: logoSmall, top: 50, left: 60 },
      { input: amarokHero, top: 75, left: 420 }
    ])
    .webp({ quality: 88 })
    .toFile(path.join(ogDir, 'og-image.webp'));

  // Also export JPG fallback
  await sharp(path.join(ogDir, 'og-image.webp'))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ogDir, 'og-image.jpg'));

  console.log('OG Image generated successfully in WebP and JPG.');
}

async function main() {
  try {
    const heroBuffer = await downloadBuffer('https://i.imgur.com/i5RGpp4.jpeg');
    const detailBuffer = await downloadBuffer('https://i.imgur.com/LbGPzeu.jpeg');
    const logoBuffer = await downloadBuffer('https://i.imgur.com/JEvRmN6.png');

    console.log('Optimizing Amarok Hero image...');
    await processImage(heroBuffer, 'amarok-hero');

    console.log('Optimizing Amarok Detail image...');
    await processImage(detailBuffer, 'amarok-detail');

    console.log('Generating Brand & Favicons...');
    await generateBrandAndFavicons(logoBuffer);

    console.log('Generating Open Graph Image...');
    await generateOgImage(heroBuffer, logoBuffer);

    console.log('All image optimization complete!');
  } catch (err) {
    console.error('Error during image processing:', err);
    process.exit(1);
  }
}

main();
