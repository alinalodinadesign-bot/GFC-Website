import Event from '@/components/home/Event'
import ApplyCta from '@/components/home/ApplyCta'

export const revalidate = 60

export default function EventPage() {
  return (
    <main className="event-page">
      <Event />
      <ApplyCta />
    </main>
  )
}
