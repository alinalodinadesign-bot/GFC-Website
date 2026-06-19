import { getTranslations } from 'next-intl/server';
import ContactList from '@/components/ContactList';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <main className="contact-page">
      <div className="contact-inner">
        <div className="contact-layout">

          {/* Left — heading + description + list */}
          <div className="contact-left">
            <h1 className="t-display-lg" style={{ marginBottom: 32 }}>
              {t('titleLine1')}<br /><em style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{t('titleEm')}</em>.
            </h1>
            <p className="t-body-lg" style={{ maxWidth: '48ch', color: 'var(--fg-2)', marginBottom: 48 }}>
              {t('description')}
            </p>
            <ContactList />
          </div>

          {/* Right — photo */}
          <div className="contact-photo">
            <img
              src="/images/contact/photo.webp"
              alt="GFC — From the floor"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
