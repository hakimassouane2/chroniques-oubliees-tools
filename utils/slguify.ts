export default function slugify(stringToSlugify: string): string {
  const map = {
    à: "a",
    á: "a",
    â: "a",
    ä: "a",
    æ: "a",
    å: "a",
    ā: "a",
    ç: "c",
    ć: "c",
    č: "c",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ē: "e",
    ę: "e",
    ė: "e",
    î: "i",
    ï: "i",
    í: "i",
    ī: "i",
    į: "i",
    ô: "o",
    ö: "o",
    ò: "o",
    ó: "o",
    œ: "o",
    ø: "o",
    ō: "o",
    û: "u",
    ü: "u",
    ù: "u",
    ú: "u",
    ū: "u",
    ñ: "n",
    ń: "n",
    š: "s",
    ž: "z",
    ź: "z",
    ż: "z",
    ý: "y",
    ÿ: "y",
  };

  return stringToSlugify
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, (ch: any) => map[ch as keyof typeof map] || ch) // Replace special characters first
    .replace(/[\s\W-]+/g, "-") // Convert spaces, non-word characters and hyphens to -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
