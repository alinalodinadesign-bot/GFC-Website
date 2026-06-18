import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Nav from '@/components/Nav'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

export default async function GalleryLayout({ children }) {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Nav mode="ink" />
      <MobileMenu />
      {children}
      <Footer />
    </NextIntlClientProvider>
  )
}
