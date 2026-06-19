import { getTranslations } from 'next-intl/server'
import Partners from '@/components/home/Partners'

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('partners.title'), description: t('partners.description') };
}

export default function PartnersPage() {
  return (
    <main className="partners-page">
      <Partners variant="rows" />
    </main>
  )
}
