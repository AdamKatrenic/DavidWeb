import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar (Branding)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hlavný názov (Meno)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnadpis (Text pod menom)',
      type: 'string',
    }),
  ],
})