'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/image'

function getYouTubeId(url) {
  const m = url?.match(/(?:youtu\.be\/|v=|embed\/)([^&?/]+)/)
  return m ? m[1] : null
}

function getVimeoId(url) {
  const m = url?.match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

function MediaItem({ item }) {
  if (item.mediaType === 'video') {
    const ytId = getYouTubeId(item.videoUrl)
    const vmId = getVimeoId(item.videoUrl)
    const src = ytId
      ? `https://www.youtube.com/embed/${ytId}`
      : vmId
      ? `https://player.vimeo.com/video/${vmId}`
      : null

    if (!src) return null

    return (
      <div className="gallery-item gallery-item--video">
        <iframe
          src={src}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  if (!item.photo) return null

  const imgUrl = urlFor(item.photo).width(800).auto('format').url()

  return (
    <div className="gallery-item">
      <Image
        src={imgUrl}
        alt={item.title || ''}
        width={800}
        height={0}
        sizes="(max-width: 960px) 50vw, 20vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

export default function GalleryGrid({ media }) {
  if (!media.length) return null

  const COLS = 5
  const columns = Array.from({ length: COLS }, () => [])
  media.forEach((item, i) => columns[i % COLS].push(item))

  return (
    <div className="gallery-grid">
      {columns.map((col, ci) => (
        <div key={ci} className="gallery-col">
          {col.map(item => (
            <MediaItem key={item._id} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}
