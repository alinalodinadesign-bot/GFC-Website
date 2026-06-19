'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import Arrow from '@/components/Arrow'

function getYouTubeId(url) {
  const m = url?.match(/(?:youtu\.be\/|v=|embed\/)([^&?/]+)/)
  return m ? m[1] : null
}

function getVimeoId(url) {
  const m = url?.match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

function videoEmbedSrc(url) {
  const ytId = getYouTubeId(url)
  const vmId = getVimeoId(url)
  return ytId
    ? `https://www.youtube.com/embed/${ytId}`
    : vmId
    ? `https://player.vimeo.com/video/${vmId}`
    : null
}

function MediaItem({ item, onOpen }) {
  if (item.mediaType === 'video') {
    const src = videoEmbedSrc(item.videoUrl)
    if (!src) return null

    // Thumbnail-style tile that opens the video in the lightbox on click
    return (
      <div
        className="gallery-item gallery-item--video"
        onClick={onOpen}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <iframe
          src={src}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ pointerEvents: 'none' }}
        />
        {/* transparent overlay so the click opens the lightbox instead of the iframe */}
        <span style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
      </div>
    )
  }

  if (!item.photo) return null

  const imgUrl = urlFor(item.photo).width(800).auto('format').url()

  return (
    <div className="gallery-item" onClick={onOpen} style={{ cursor: 'pointer' }}>
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

const navBtn = extra => ({
  background: 'none', border: '1px solid rgba(255,255,255,0.3)',
  color: 'var(--paper)', borderRadius: 999,
  width: 48, height: 48, cursor: 'pointer',
  fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
  ...extra,
})

export default function GalleryGrid({ media }) {
  const [lb, setLb] = useState(null) // { idx } into viewable list

  // Lightbox navigates every photo and playable video, in display order
  const viewable = media.filter(
    m => (m.mediaType === 'photo' && m.photo) ||
         (m.mediaType === 'video' && videoEmbedSrc(m.videoUrl))
  )

  const closeLb = () => setLb(null)
  const prev = () => setLb(l => ({ idx: (l.idx - 1 + viewable.length) % viewable.length }))
  const next = () => setLb(l => ({ idx: (l.idx + 1) % viewable.length }))

  useEffect(() => {
    if (!lb) return
    const fn = e => {
      if (e.key === 'Escape')     closeLb()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lb])

  if (!media.length) return null

  const COLS = 5
  const columns = Array.from({ length: COLS }, () => [])
  media.forEach((item, i) => columns[i % COLS].push(item))

  return (
    <>
      <div className="gallery-grid">
        {columns.map((col, ci) => (
          <div key={ci} className="gallery-col">
            {col.map(item => (
              <MediaItem
                key={item._id}
                item={item}
                onOpen={() => {
                  const vIdx = viewable.findIndex(p => p._id === item._id)
                  if (vIdx >= 0) setLb({ idx: vIdx })
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lb && viewable[lb.idx] && (
        <div onClick={closeLb} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={closeLb} style={{ ...navBtn({ width: 44, height: 44, fontSize: 16 }),
            position: 'absolute', top: 24, right: 24, zIndex: 1 }}>✕</button>

          <div style={{
            position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}>
            {lb.idx + 1} / {viewable.length}
          </div>

          {viewable[lb.idx].mediaType === 'video' ? (
            <div
              onClick={e => e.stopPropagation()}
              style={{ width: 'min(88vw, 1280px)', aspectRatio: '16 / 9', maxHeight: '88vh',
                boxShadow: '0 40px 100px rgba(0,0,0,0.9)' }}
            >
              <iframe
                src={videoEmbedSrc(viewable[lb.idx].videoUrl)}
                title={viewable[lb.idx].title || ''}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          ) : (
            <Image
              src={urlFor(viewable[lb.idx].photo).width(1600).auto('format').url()}
              alt={viewable[lb.idx].title || ''}
              width={0}
              height={0}
              sizes="88vw"
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '88vw', maxHeight: '88vh', width: 'auto', height: 'auto',
                objectFit: 'contain', boxShadow: '0 40px 100px rgba(0,0,0,0.9)' }}
            />
          )}

          {viewable.length > 1 && (
            <button onClick={e => { e.stopPropagation(); prev(); }}
              style={{ ...navBtn(), position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)' }}>
              <span style={{ display: 'flex', transform: 'rotate(180deg)' }}><Arrow size={60} /></span>
            </button>
          )}
          {viewable.length > 1 && (
            <button onClick={e => { e.stopPropagation(); next(); }}
              style={{ ...navBtn(), position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)' }}>
              <Arrow size={60} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
