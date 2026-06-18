import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { sanityConfig } from './config'

const builder = imageUrlBuilder(sanityConfig)

export function urlFor(source) {
  return builder.image(source)
}
