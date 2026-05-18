import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import localFont from 'next/font/local';
import '../globals.css';
import Nav from '@/components/Nav';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const hanken = localFont({
  src: [
    { path: '../../../public/fonts/HankenGrotesk-VariableFont_wght.ttf', weight: '100 900', style: 'normal' },
    { path: '../../../public/fonts/HankenGrotesk-Italic-VariableFont_wght.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const prata = localFont({
  src: '../../../public/fonts/Prata-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

const gardena = localFont({
  src: '../../../public/fonts/gardena-holmes-gardena-holmes-script-400.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  title: 'Global Fashion Code',
  // Hero image preloaded via <link rel="preload"> below
  description: 'An exclusive three-day fashion event — connecting talent with opportunity.',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${hanken.variable} ${prata.variable} ${gardena.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero/bg.webp" type="image/webp" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <MobileMenu />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
