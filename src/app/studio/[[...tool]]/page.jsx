'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { sanityConfig } from '@/sanity/config'
import { schema } from '@/sanity/schema'

const config = defineConfig({
  ...sanityConfig,
  name: 'gfc',
  title: 'GFC Gallery',
  plugins: [structureTool(), visionTool()],
  schema,
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
