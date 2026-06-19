import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('legal.title'), description: t('legal.description') };
}

export default function LegalLayout({ children }) {
  return children;
}
