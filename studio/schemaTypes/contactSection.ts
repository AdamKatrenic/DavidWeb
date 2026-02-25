export default {
  name: "contactSection",
  title: "Kontaktná sekcia",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nadpis nad formulárom",
      type: "string",
      initialValue: "Poďme spolu niečo vytvoriť",
    },
    {
      name: "text",
      title: "Text pod nadpisom",
      type: "text",
      initialValue:
          "Máte nápad na fotenie alebo otázky ohľadom spolupráce? Napíšte mi prosím",
    },
    {
      name: "submitButtonText",
      title: "Text na tlačidle",
      type: "string",
      initialValue: "Odoslať dopyt",
    },

    // ✅ NOVÉ: obsadené dátumy (zadávaš v Sanity)
    {
      name: "blockedDates",
      title: "Obsadené termíny",
      description: "Tieto dni budú v kalendári sivé a neklikateľné.",
      type: "array",
      of: [{ type: "date", options: { dateFormat: "YYYY-MM-DD" } }],
    },
  ],
};