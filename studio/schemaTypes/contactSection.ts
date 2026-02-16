export default {
  name: 'contactSection',
  title: 'Kontaktná sekcia',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nadpis nad formulárom',
      type: 'string',
      initialValue: 'Poďme spolu niečo vytvoriť',
    },
    {
      name: 'text',
      title: 'Text pod nadpisom',
      type: 'text',
      initialValue: 'Máte nápad na fotenie alebo otázky ohľadom spolupráce? Napíšte mi.',
    },
    {
      name: 'submitButtonText',
      title: 'Text na tlačidle',
      type: 'string',
      initialValue: 'Odoslať dopyt',
    },
  ],
}