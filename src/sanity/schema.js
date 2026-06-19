// Reusable gallery fields — array of images supports BULK upload
// (select many files at once), plus an optional list of video links.
const galleryFields = [
  {
    name: 'gallery',
    title: 'Photos (drag & drop multiple at once)',
    type: 'array',
    of: [{ type: 'image', options: { hotspot: true } }],
    options: { layout: 'grid' },
  },
  {
    name: 'videos',
    title: 'Video links (YouTube / Vimeo)',
    type: 'array',
    of: [{ type: 'url' }],
  },
]

const subcategory = {
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'titleRu', title: 'Title (RU)', type: 'string' },
    {
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
    },
    { name: 'order', title: 'Order', type: 'number' },
    ...galleryFields,
  ],
  preview: {
    select: { title: 'title', subtitle: 'event.title', media: 'gallery.0' },
  },
}

const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'titleRu', title: 'Title (RU)', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'order', title: 'Order', type: 'number' },
    ...galleryFields,
  ],
  preview: {
    select: { title: 'title', media: 'gallery.0' },
  },
}

export const schema = { types: [event, subcategory] }
