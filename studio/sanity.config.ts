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
            // 0. SINGLETON PRE NAVBAR (BRANDING)
            S.listItem()
              .title('Navbar (Branding)')
              .id('navbar')
              .child(
                S.document()
                  .schemaType('navbar')
                  .documentId('navbar')
              ),

            S.divider(),

            // 1. SINGLETON PRE UVODNU STRANKU
            S.listItem()
              .title('Úvodná stránka')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            // 2. SINGLETON PRE SEKCIU O MNE (HLAVNÁ PODSTRÁNKA)
            S.listItem()
              .title('O mne (Detail)')
              .id('aboutSection')
              .child(S.document().schemaType('aboutSection').documentId('aboutSection')),

            // 2b. NOVO PRIDANÉ: SINGLETON PRE SKRÁTENÉ O MNE (NA DOMOVE)
            S.listItem()
              .title('O mne (Skrátené na domove)')
              .id('aboutShort')
              .child(S.document().schemaType('aboutShort').documentId('aboutShort')),

            // 3. SINGLETON PRE KONTAKTNÚ SEKCIU
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

            // Ostatné dokumenty (napr. Projekty), ktoré nie sú singletony
            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage', 'siteSettings', 'aboutSection', 'aboutShort', 'contactSection', 'navbar'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})