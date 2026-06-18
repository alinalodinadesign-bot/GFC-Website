'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import GalleryGrid from './GalleryGrid'
import GalleryTabs from './GalleryTabs'

export default function GalleryClient({ events }) {
  const t = useTranslations('gallery')
  const [activeEvent, setActiveEvent] = useState(events[0]?._id ?? null)
  const [activeSubcat, setActiveSubcat] = useState(null)

  const currentEvent = events.find(e => e._id === activeEvent)

  const allMedia = currentEvent
    ? [
        ...(currentEvent.media || []),
        ...(currentEvent.subcategories || []).flatMap(s =>
          activeSubcat === null || activeSubcat === s._id ? s.media || [] : []
        ),
      ]
    : []

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <p className="t-meta" style={{ color: 'var(--fg-3)' }}>
          {t('index')}
        </p>
        <h1>
          {t('title')} <em>{t('titleEm')}</em> {t('titleEnd')}.
        </h1>
      </section>

      {events.length > 0 ? (
        <>
          <GalleryTabs
            events={events}
            activeEvent={activeEvent}
            activeSubcat={activeSubcat}
            onEvent={id => { setActiveEvent(id); setActiveSubcat(null) }}
            onSubcat={setActiveSubcat}
            currentEvent={currentEvent}
          />
          <GalleryGrid media={allMedia} />
        </>
      ) : (
        <p className="gallery-empty">{t('empty')}</p>
      )}
    </main>
  )
}
