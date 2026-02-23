export default {
  name: 'siteSettings',
  title: 'Nastavenia webu',
  type: 'document',
  fields: [
    {
      name: 'copyright',
      title: 'Copyright text',
      type: 'string',
      initialValue: 'David Pilar Photography',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Kontaktný e-mail',
      type: 'string',
    },
  ],
}