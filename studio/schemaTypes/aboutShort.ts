export default {
  name: 'aboutShort',
  title: 'O mne (Skrátené - Domov)',
  type: 'document',
  fields: [
    {
      name: 'overline',
      title: 'Malý nadpis (Overline)',
      type: 'string',
      initialValue: 'Príbeh za kamerou',
    },
    {
      name: 'title',
      title: 'Hlavný nadpis',
      type: 'text',
      rows: 2,
      description: 'Použi napr. Dávid \n Pillár pre zalomenie riadku.',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'ctaText',
      title: 'Text odkazu',
      type: 'string',
      initialValue: 'Zistiť viac o mne —',
    }
  ]
}