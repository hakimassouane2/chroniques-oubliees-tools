const fs = require("fs");
const axios = require("axios");
const path = require("path");

const baseUrl = "https://www.co-drs.org/fr/co/creature/";
const maxCreatures = 1000;

async function fetchAndSaveCreatureData(creatureNumber) {
  try {
    const url = `${baseUrl}${creatureNumber}/json`;
    const response = await axios.get(url);
    const creatureData = response.data;

    const creatureName = creatureData.name[0].value;
    const fileName = `${creatureName}.json`;
    const filePath = path.join(__dirname, "bestiary", fileName);

    await fs.promises.mkdir(path.join(__dirname, "bestiary"), {
      recursive: true,
    });
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(creatureData, null, 2)
    );
    console.log(`Saved ${creatureName} to ${filePath}`);
  } catch (error) {
    console.error(
      `Error fetching or saving creature data for ${creatureNumber}:`,
      error.message
    );
  }
}

async function fetchAllCreatures() {
  for (
    let creatureNumber = 1;
    creatureNumber <= maxCreatures;
    creatureNumber++
  ) {
    await fetchAndSaveCreatureData(creatureNumber);
  }
}

fetchAllCreatures();
