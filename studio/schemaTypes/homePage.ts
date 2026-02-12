export default {
    name: 'homePage',
    title: 'Úvodná stránka',
    type: 'document',
    // Pridáme skupiny, aby David videl Content a Media oddelene
    groups: [
        { name: 'content', title: 'Obsah' },
        { name: 'media', title: 'Vizuál' },
    ],
    fields: [
        {
            name: 'title',
            title: 'Hlavný nadpis (Hero)',
            type: 'string',
            group: 'content',
            initialValue: 'David Pilar',
            validation: (Rule: any) => Rule.required().min(3).max(50),
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
            // Pridáme políčko pre Alt text priamo k obrázku
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternatívny text',
                    description: 'Dôležité pre Google a slabozrakých (napr. Portrét fotografa v štúdiu).',
                }
            ],
            validation: (Rule: any) => Rule.required(),
        },
    ],
    // Toto zabezpečí, že v zozname (ak by sa tam náhodou ukázal) uvidíme správny názov
    preview: {
        select: {
            title: 'title',
            media: 'heroImage',
        },
    },
}