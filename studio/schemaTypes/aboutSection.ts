export default {
  name: 'aboutSection',
  title: 'O mne',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulok',
      type: 'string',
    },
    {
      name: 'aboutImage',
      title: 'Fotka na pozadí',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Text o mne',
      type: 'text', 
    },
  ],
}