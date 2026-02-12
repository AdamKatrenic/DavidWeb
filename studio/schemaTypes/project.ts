//look for inferring interface/type from schema
 
export default {
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Názov projektu',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Musíš zadať názov, inak to nefunguje'),
    },
    {
      name: 'slug',
      title: 'Slug (Adresa v prehliadači)',
      type: 'slug',
      options: {
        source: 'title', // Automaticky vygeneruje slug z názvu
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategória',
      type: 'string',
      options: {
        list: [
          { title: 'Svadba', value: 'wedding' },
          { title: 'Stužkové', value: 'concert' },
          { title: 'Videoklipy', value: 'portrait' },
          { title: 'Dokumenty', value: 'landscape' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Hlavná fotka',
      type: 'image',
      options: {
        hotspot: true, // Umožňuje orezávať fotku priamo v prehliadači
      },
    },
    {
      name: 'gallery',
      title: 'Galéria fotiek',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Popis projektu',
      type: 'text',
    },
  ],
}