import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'DavidPilarStudio',

  projectId: 'emnkhutw',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Obsah webu')
          .items([
            // 1. SINGLETON PRE UVODNU STRANKU
            S.listItem()
              .title('Úvodná stránka')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            // 2. SINGLETON PRE SEKCIU O MNE
            S.listItem()
              .title('O mne')
              .id('aboutSection')
              .child(S.document().schemaType('aboutSection').documentId('aboutSection')),

            // 3. SINGLETON PRE KONTAKTNÚ SEKCIU (TOTO SME PRIDALI)
            S.listItem()
              .title('Kontaktná sekcia')
              .id('contactSectionV2')
              .child(
                S.document()
                .schemaType('contactSection')
                .documentId('contactSectionV2')
              ),

            // 4. SINGLETON PRE NASTAVENIE WEBU
            S.listItem()
              .title('Nastavenia webu (Footer)')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings')
              .documentId('siteSettings')),

            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage', 'siteSettings', 'aboutSection', 'contactSection'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})