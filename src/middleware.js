import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Всё кроме /studio, /api, /_next, статических файлов
    '/((?!studio|api|_next|_vercel|.*\\..*).*)',
  ],
};
