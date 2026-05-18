import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/Nav';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const hanken = localFont({
  src: [
    {
      path: '../../public/fonts/HankenGrotesk-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HankenGrotesk-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});

const prata = localFont({
  src: '../../public/fonts/Prata-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: 'Global Fashion Code',
  description: 'An exclusive three-day fashion event — connecting talent with opportunity.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${hanken.variable} ${prata.variable}`}>
      <body>
        <Nav />
        <MobileMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
