import express, { Request, Response } from 'express';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;
const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID || '28699639839619491';
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN || '';

async function startServer() {
  const app = express();

  // Compressão Brotli / Gzip para alto desempenho em tráfego de rede
  app.use(
    compression({
      level: 6,
      threshold: 1024,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
      }
    })
  );

  // Parse JSON bodies
  app.use(express.json());

  // Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  /**
   * Meta Conversions API (CAPI) Endpoint Seguro
   * Recebe eventos de conversão e envia server-side para a Meta com token protegido
   */
  app.post('/api/meta-events', async (req: Request, res: Response) => {
    try {
      const { event_name, custom_event, event_time, event_source_url, user_data, custom_data } = req.body;

      if (!event_name) {
        return res.status(400).json({ error: 'event_name is required' });
      }

      // Se o token CAPI estiver configurado no servidor, despacha para a Graph API da Meta
      if (META_CAPI_TOKEN) {
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || user_data?.client_user_agent || '';

        const payload = {
          data: [
            {
              event_name: custom_event || event_name,
              event_time: event_time || Math.floor(Date.now() / 1000),
              event_source_url: event_source_url || 'https://premierpremios.com/amarok-v6-stege-2-360-cv',
              action_source: 'website',
              user_data: {
                client_ip_address: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : undefined,
                client_user_agent: userAgent,
                fbc: user_data?.fbc
              },
              custom_data: custom_data || {}
            }
          ]
        };

        const metaResponse = await fetch(
          `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_TOKEN)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        );

        const result = await metaResponse.json();
        return res.json({ success: true, server_capi: true, result });
      }

      // Se não há token configurado no ambiente, registra recebimento seguro
      return res.json({
        success: true,
        server_capi: false,
        message: 'Event received. Configure META_CAPI_TOKEN for server-side Meta Conversions API dispatch.'
      });
    } catch (err: any) {
      console.warn('[CAPI Server Error]', err?.message || err);
      return res.status(500).json({ success: false, error: 'Internal CAPI dispatch error' });
    }
  });

  // Static Assets with Cache-Control Headers in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Servir assets com cache longo para arquivos imutáveis e 1 dia para imagens estáticas
    app.use(
      express.static(distPath, {
        maxAge: '1d',
        setHeaders: (res, filePath) => {
          if (filePath.match(/\.(js|css|woff2|avif|webp)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (filePath.match(/\.(ico|png|jpg|jpeg|svg)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
          }
        }
      })
    );

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Premier Prêmios Sul Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
