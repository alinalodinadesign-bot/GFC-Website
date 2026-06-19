import { getTranslations } from 'next-intl/server'
import ApplyCta from '@/components/home/ApplyCta'

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('apply.title'), description: t('apply.description') };
}

export default function ApplyPage() {
  return (
    <main className="apply-cta-page">
      <ApplyCta />
    </main>
  )
}
