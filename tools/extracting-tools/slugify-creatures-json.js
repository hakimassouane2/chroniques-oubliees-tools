const fs = require("fs");

// Load JSON from a local file
function loadJsonFromFile(filename) {
  return JSON.parse(fs.readFileSync(filename, "utf8"));
}

function slugify(string) {
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

  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, (ch) => map[ch] || ch) // Replace special characters first
    .replace(/[\s\W-]+/g, "-") // Convert spaces, non-word characters and hyphens to -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function transformObject(obj) {
  if (obj.name && obj.name.length > 0 && !obj.name[0].label) {
    obj.name[0].label = obj.name[0].value;
    obj.name[0].value = slugify(obj.name[0].value);
  }
  return obj;
}

// Main Execution
const inputFilePath = "creatures.json";
const outputFilePath = "creatures-slugified.json";
const jsonDataArray = loadJsonFromFile(inputFilePath);

// Transform each object in the array
const transformedArray = jsonDataArray.map((obj) => transformObject(obj));
fs.writeFileSync(outputFilePath, JSON.stringify(transformedArray, null, 4));

console.log(
  "JSON array has been transformed and saved to creatures-slugified.json!"
);
