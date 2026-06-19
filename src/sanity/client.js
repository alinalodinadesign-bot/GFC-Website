import { createClient } from 'next-sanity'
import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)

export async function getGalleryData() {
  return sanityClient.fetch(`
    *[_type == "event"] | order(order asc) {
      _id, title, titleRu, slug, gallery, videos,
      "subcategories": *[_type == "subcategory" && references(^._id)] | order(order asc) {
        _id, title, titleRu, gallery, videos
      }
    }
  `)
}
