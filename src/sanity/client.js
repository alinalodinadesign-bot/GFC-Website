import { createClient } from 'next-sanity'
import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)

export async function getGalleryData() {
  return sanityClient.fetch(`
    *[_type == "event"] | order(order asc) {
      _id, title, titleRu, slug,
      "subcategories": *[_type == "subcategory" && references(^._id)] | order(order asc) {
        _id, title, titleRu,
        "media": *[_type == "mediaItem" && references(^._id)] | order(_createdAt asc) {
          _id, title, mediaType, photo, videoUrl
        }
      },
      "media": *[_type == "mediaItem" && subcategory == null && references(^._id)] | order(_createdAt asc) {
        _id, title, mediaType, photo, videoUrl
      }
    }
  `)
}
