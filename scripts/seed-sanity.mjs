/**
 * Seed Sanity with events, subcategories, and photos from public/gallery/
 * Usage: SANITY_TOKEN=<token> node scripts/seed-sanity.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GALLERY_DIR = path.join(__dirname, '../public/gallery')

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Error: set SANITY_TOKEN env variable')
  process.exit(1)
}

const client = createClient({
  projectId: 'xhb5o8r3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Event structure ───────────────────────────────────────
const EVENTS = [
  {
    title: 'GFC Istanbul 2025',
    titleRu: 'GFC Стамбул 2025',
    slug: 'gfc-istanbul-2025',
    date: '2025-01-01',
    order: 1,
    subcategories: [
      { title: 'I Day', titleRu: 'I День', order: 1 },
      { title: 'II Day', titleRu: 'II День', order: 2 },
      { title: 'III Day', titleRu: 'III День', order: 3 },
    ],
  },
  {
    title: 'GFC Dubai 2025',
    titleRu: 'GFC Дубай 2025',
    slug: 'gfc-dubai-2025',
    date: '2025-06-01',
    order: 2,
    subcategories: [],
  },
  {
    title: 'Fashion Discovery Stage Georgia 2026',
    titleRu: 'Fashion Discovery Stage Грузия 2026',
    slug: 'fds-georgia-2026',
    date: '2026-01-01',
    order: 3,
    subcategories: [],
  },
  {
    title: 'GFC Dubai 2026',
    titleRu: 'GFC Дубай 2026',
    slug: 'gfc-dubai-2026',
    date: '2026-06-01',
    order: 4,
    subcategories: [],
  },
]

// Photos from homepage gallery folders → assign to GFC Istanbul 2025
// folder name → subcategory title (null = directly under event)
const FOLDER_TO_SUBCAT = {
  event:     'I Day',
  runway:    'II Day',
  backstage: 'II Day',
  castings:  'III Day',
  awards:    'III Day',
}

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: 'image/jpeg',
  })
  return asset._id
}

async function main() {
  console.log('Creating events and subcategories…')

  const eventIds = {}
  const subcatIds = {}

  // Create events
  for (const ev of EVENTS) {
    const doc = await client.createOrReplace({
      _type: 'event',
      _id: `event-${ev.slug}`,
      title: ev.title,
      titleRu: ev.titleRu,
      slug: { _type: 'slug', current: ev.slug },
      date: ev.date,
      order: ev.order,
    })
    eventIds[ev.slug] = doc._id
    console.log(`  ✓ Event: ${ev.title}`)

    // Create subcategories
    for (const sub of ev.subcategories) {
      const subSlug = `${ev.slug}-${sub.title.toLowerCase().replace(/\s/g, '-')}`
      const subDoc = await client.createOrReplace({
        _type: 'subcategory',
        _id: `subcat-${subSlug}`,
        title: sub.title,
        titleRu: sub.titleRu,
        order: sub.order,
        event: { _type: 'reference', _ref: doc._id },
      })
      subcatIds[`${ev.slug}:${sub.title}`] = subDoc._id
      console.log(`    ✓ Subcategory: ${sub.title}`)
    }
  }

  // Upload photos from public/gallery/ → assign to GFC Istanbul 2025
  const istanbulSlug = 'gfc-istanbul-2025'
  const istanbulId = eventIds[istanbulSlug]

  console.log('\nUploading photos from public/gallery/…')

  const folders = fs.readdirSync(GALLERY_DIR).filter(f =>
    fs.statSync(path.join(GALLERY_DIR, f)).isDirectory()
  )

  for (const folder of folders) {
    const subcatTitle = FOLDER_TO_SUBCAT[folder]
    const subcatId = subcatTitle ? subcatIds[`${istanbulSlug}:${subcatTitle}`] : null

    const files = fs.readdirSync(path.join(GALLERY_DIR, folder))
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort()

    for (const file of files) {
      const filePath = path.join(GALLERY_DIR, folder, file)
      process.stdout.write(`  Uploading ${folder}/${file}… `)

      try {
        const assetId = await uploadImage(filePath)
        const mediaDoc = {
          _type: 'mediaItem',
          title: `${folder} ${file.replace(/\.\w+$/, '')}`,
          mediaType: 'photo',
          photo: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        }
        if (subcatId) {
          mediaDoc.subcategory = { _type: 'reference', _ref: subcatId }
        }
        await client.create(mediaDoc)
        console.log('✓')
      } catch (e) {
        console.log(`✗ ${e.message}`)
      }
    }
  }

  console.log('\nDone!')
}

main().catch(e => { console.error(e); process.exit(1) })
