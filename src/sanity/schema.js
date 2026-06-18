const mediaItem = {
  name: 'mediaItem',
  title: 'Photo / Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'mediaType',
      title: 'Type',
      type: 'string',
      options: { list: ['photo', 'video'] },
      initialValue: 'photo',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== 'photo',
    },
    {
      name: 'videoUrl',
      title: 'Video URL (YouTube / Vimeo)',
      type: 'url',
      hidden: ({ document }) => document?.mediaType !== 'video',
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      weak: true,
    },
  ],
  preview: {
    select: { title: 'title', media: 'photo' },
  },
}

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
  ],
  preview: {
    select: { title: 'title', subtitle: 'event.title' },
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
  ],
}

export const schema = { types: [event, subcategory, mediaItem] }
