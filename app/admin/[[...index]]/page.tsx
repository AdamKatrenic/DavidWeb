'use client'

import { NextStudio } from 'next-sanity/studio'
import { type Config } from 'sanity'
import config from '../../../studio/sanity.config'

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <NextStudio config={config as unknown as Config} />
    </div>
  )
}