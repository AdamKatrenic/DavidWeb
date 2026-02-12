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
            // SINGLETON PRE UVODNU STRANKU
            S.listItem()
              .title('Úvodná stránka')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            // SINGLETON PRE NASTAVENIE WEBU
            S.listItem()
              .title('Nastavenia webu (Footer)')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage', 'siteSettings'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})