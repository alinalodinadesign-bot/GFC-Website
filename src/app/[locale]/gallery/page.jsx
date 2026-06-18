import { getGalleryData } from '@/sanity/client'
import GalleryClient from '@/components/gallery/GalleryClient'

export const revalidate = 60

export default async function GalleryPage() {
  const events = await getGalleryData()
  return <GalleryClient events={events} />
}
