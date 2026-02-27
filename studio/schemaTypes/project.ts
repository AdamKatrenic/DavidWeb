import { Rule } from "sanity";
import { PlayIcon, ImageIcon } from '@sanity/icons' // Ak máš nainštalované icons, ak nie, nevadí

export default {
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Názov projektu',
      type: 'string',
      validation: (rule: Rule) =>
        rule.required().error('Musíš zadať názov, inak to nefunguje'),
    },
    {
      name: 'slug',
      title: 'Slug (Adresa v prehliadači)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'category',
      title: 'Kategória',
      type: 'string',
      options: {
        list: [
          { title: 'Svadba', value: 'wedding' },
          { title: 'Stužkové', value: 'prom' }, 
          { title: 'Videoklipy', value: 'music-video' },
          { title: 'Dokumenty', value: 'documentary' },
          { title: 'Ostatné', value: 'other' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Hlavná fotka (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
      description: 'Táto fotka sa zobrazí v prehľade projektov.',
    },
    {
      name: 'gallery',
      title: 'Obsah projektu (Galéria a Videá)',
      type: 'array',
      description: 'Tu môžete pridávať fotky alebo YouTube videá v ľubovoľnom poradí.',
      of: [
        { 
          type: 'image', 
          title: 'Fotografia',
          icon: ImageIcon,
          options: { hotspot: true } 
        },
        {
          type: 'object',
          name: 'youtubeVideo',
          title: 'YouTube Video',
          icon: PlayIcon,
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL odkaz',
              description: 'Príklad: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Krátky popis pod video (voliteľné)'
            }
          ],
          preview: {
            select: {
              url: 'url',
            },
            prepare({ url }: { url: string }) {
              return {
                title: 'YouTube Video',
                subtitle: url || 'Chýba odkaz',
              }
            },
          },
        },
      ],
    },
    {
      name: 'description',
      title: 'Popis projektu',
      type: 'text',
    },
  ],
}