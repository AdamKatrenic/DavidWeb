'use client'

import { NextStudio } from 'next-sanity/studio'
import { type Config } from 'sanity'
import config from '../../../studio/sanity.config'

export default function AdminPage() {
  return (
    <>
      <style jsx global>{`
        nav, 
        header, 
        footer, 
        .your-navbar-class, 
        .your-footer-class { 
          display: none !important; 
        }
        
        /* Toto zabezpečí, aby Sanity Studio využilo celú výšku obrazovky */
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <div className="min-h-screen">
        <NextStudio config={config as unknown as Config} />
      </div>
    </>
  )
}