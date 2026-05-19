import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // / = English, /ru = Russian, no /en prefix
  localeDetection: false,    // НЕ читать Accept-Language — всегда EN по умолчанию
});
