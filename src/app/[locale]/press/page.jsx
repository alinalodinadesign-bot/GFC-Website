import { getTranslations } from 'next-intl/server';
import PressClient from './PressClient';

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('press.title'), description: t('press.description') };
}

export default async function PressPage() {
  const t = await getTranslations('press');
  return (
    <main className="press-page">
      <div className="press-inner">
        <div className="press-header">
          <span className="t-meta" style={{ color: 'var(--fg-3)' }}>{t('eyebrow')}</span>
          <h1 className="t-display-lg" style={{ marginTop: 16 }}>
            {t('titleLine1')}{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t('titleEm')}</em>.
          </h1>
        </div>
        <PressClient readMore={t('readMore')} />
      </div>
    </main>
  );
}
