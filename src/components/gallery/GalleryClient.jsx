'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import GalleryGrid from './GalleryGrid'
import GalleryTabs from './GalleryTabs'

// Flatten a document's photo array + video links into a single media list
function toMedia(doc) {
  const photos = (doc.gallery || []).map((img, i) => ({
    _id: img._key || `${doc._id}-p${i}`,
    mediaType: 'photo',
    photo: img,
  }))
  const vids = (doc.videos || []).map((url, i) => ({
    _id: `${doc._id}-v${i}`,
    mediaType: 'video',
    videoUrl: url,
  }))
  return [...photos, ...vids]
}

export default function GalleryClient({ events }) {
  const t = useTranslations('gallery')
  const [activeEvent, setActiveEvent] = useState(events[0]?._id ?? null)
  const [activeSubcat, setActiveSubcat] = useState(null)

  const currentEvent = events.find(e => e._id === activeEvent)

  const allMedia = currentEvent
    ? [
        ...toMedia(currentEvent),
        ...(currentEvent.subcategories || []).flatMap(s =>
          activeSubcat === null || activeSubcat === s._id ? toMedia(s) : []
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
