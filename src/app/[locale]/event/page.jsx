import { getTranslations } from 'next-intl/server'
import Event from '@/components/home/Event'
import ApplyCta from '@/components/home/ApplyCta'

export const revalidate = 60

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('event.title'), description: t('event.description') };
}

export default function EventPage() {
  return (
    <main className="event-page">
      <Event />
      <ApplyCta />
    </main>
  )
}
