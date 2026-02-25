import type { Rule } from "sanity";

export default {
    name: 'homePage',
    title: 'Úvodná stránka',
    type: 'document',
    groups: [
        { name: 'content', title: 'Obsah' },
        { name: 'media', title: 'Vizuál' },
        { name: 'sections', title: 'Promované kategórie' }, // Nová grupa pre poriadok
    ],
    fields: [
        {
            name: 'title',
            title: 'Hlavný nadpis (Hero)',
            type: 'string',
            group: 'content',
            initialValue: 'David Pilar',
            validation: (rule: Rule) => rule.required().min(3).max(50),
        },
        {
            name: 'welcomeText',
            title: 'Krátky text pod nadpisom',
            type: 'text',
            group: 'content',
            rows: 3,
            description: 'Tento text sa zobrazí pod menom na úvodnej obrazovke.',
        },
        {
            name: 'heroImage',
            title: 'Hlavná fotka na pozadí',
            type: 'image',
            group: 'media',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternatívny text',
                    description: 'Dôležité pre Google a slabozrakých.',
                }
            ],
            validation: (rule: Rule) => rule.required(),
        },
        // --- NOVÁ SEKCIA PRE KATEGÓRIE ---
        {
            name: 'featuredCategories',
            title: 'Promované kategórie',
            description: 'Pridajte kategórie, ktoré sa zobrazia na hlavnej stránke (napr. Svadby, Stužkové).',
            type: 'array',
            group: 'sections',
            of: [
                {
                    type: 'object',
                    name: 'categoryItem',
                    title: 'Kategória',
                    fields: [
                        { 
                            name: 'title', 
                            title: 'Názov kategórie', 
                            type: 'string', 
                            description: 'Napr. Svadby' 
                        },
                        { 
                            name: 'subtitle', 
                            title: 'Podnadpis', 
                            type: 'string', 
                            description: 'Napr. Cinematic Wedding Stories' 
                        },
                        { 
                            name: 'slug', 
                            title: 'URL Slug', 
                            type: 'string', 
                            description: 'Musí súhlasiť s kategóriou v systéme (napr. svadby)' 
                        },
                        {
                            name: 'backgroundImage',
                            title: 'Obrázok na pozadí (voliteľné)',
                            type: 'image',
                            options: { hotspot: true },
                            description: 'Ak nahráte obrázok, zobrazí sa na pozadí sekcie. Ak nie, ostane čistý text.'
                        }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'subtitle',
                            media: 'backgroundImage'
                        }
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroImage',
        },
    },
}