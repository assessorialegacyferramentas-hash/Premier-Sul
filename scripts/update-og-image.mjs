import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const ogDir = path.join(publicDir, 'assets', 'images');

async function downloadAndProcessOgImage() {
  const urls = [
    'https://i.imgur.com/0WVvu4G.png',
    'https://i.imgur.com/0WVvu4G.jpeg',
    'https://i.imgur.com/0WVvu4G.jpg'
  ];

  let buffer = null;
  for (const url of urls) {
    try {
      console.log(`Tentando baixar de: ${url}...`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (response.ok) {
        const ab = await response.arrayBuffer();
        buffer = Buffer.from(ab);
        console.log(`Download com sucesso de ${url} (${buffer.length} bytes)`);
        break;
      }
    } catch (e) {
      console.warn(`Falha na url ${url}:`, e);
    }
  }

  if (!buffer) {
    throw new Error('Não foi possível baixar a imagem da URL informada');
  }

  // Metadata da imagem original
  const meta = await sharp(buffer).metadata();
  console.log('Metadados da imagem baixada:', meta.width, 'x', meta.height, meta.format);

  // Salvar versão original
  fs.writeFileSync(path.join(ogDir, 'og-image-custom-raw.' + (meta.format || 'png')), buffer);

  // Gerar OG Image padronizada 1200x630 (proporção ideal para WhatsApp, Facebook, Twitter, Telegram)
  // Preservando com resize contain/cover de alta qualidade
  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(path.join(ogDir, 'og-image.webp'));

  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(ogDir, 'og-image.jpg'));

  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 8 })
    .toFile(path.join(ogDir, 'og-image.png'));

  console.log('Novas versões de OG Image (WebP, JPG, PNG) geradas com sucesso!');
}

downloadAndProcessOgImage().catch(console.error);
