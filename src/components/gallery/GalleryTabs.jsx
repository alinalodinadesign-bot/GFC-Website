'use client'

import { useLocale } from 'next-intl'

export default function GalleryTabs({ events, activeEvent, activeSubcat, onEvent, onSubcat, currentEvent }) {
  const locale = useLocale()

  function label(item) {
    return locale === 'ru' && item.titleRu ? item.titleRu : item.title
  }

  const subcats = currentEvent?.subcategories || []

  return (
    <div className="gallery-tabs-wrap">
      <div className="gallery-tabs">
        {events.map(e => (
          <button
            key={e._id}
            className={`gallery-tab${activeEvent === e._id ? ' active' : ''}`}
            onClick={() => onEvent(e._id)}
          >
            {label(e)}
          </button>
        ))}
      </div>

      {subcats.length > 0 && (
        <div className="gallery-subtabs">
          <button
            className={`gallery-subtab${activeSubcat === null ? ' active' : ''}`}
            onClick={() => onSubcat(null)}
          >
            All
          </button>
          {subcats.map(s => (
            <button
              key={s._id}
              className={`gallery-subtab${activeSubcat === s._id ? ' active' : ''}`}
              onClick={() => onSubcat(s._id)}
            >
              {label(s)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
