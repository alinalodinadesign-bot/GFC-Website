import { getTranslations } from 'next-intl/server'
import { getGalleryData } from '@/sanity/client'
import GalleryClient from '@/components/gallery/GalleryClient'

export const revalidate = 60

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return { title: t('gallery.title'), description: t('gallery.description') };
}

export default async function GalleryPage() {
  const events = await getGalleryData()
  return <GalleryClient events={events} />
}
