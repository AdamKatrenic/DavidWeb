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
            // 1. Singleton pre Úvodnú stránku
            S.listItem()
              .title('Úvodná stránka')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage') // Pevné ID zabezpečí, že dokument je len jeden
              ),
            
            S.divider(), // Vizuálna čiara na oddelenie

            // 2. Ostatné typy (Projekty atď.)
            // Odfiltrujeme homePage, aby sa nezobrazovala v zozname dvakrát
            ...S.documentTypeListItems().filter(
              (listItem) => !['homePage'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})