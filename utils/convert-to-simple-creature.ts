const fs = require("fs");

// Function to read JSON file
function readJsonFile(filePath: string): any {
  try {
    // Read the content of the JSON file
    const jsonData = fs.readFileSync(filePath, "utf8");

    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);

    return parsedData;
  } catch (error: any) {
    console.error("Error reading or parsing the JSON file:", error.message);
    return null;
  }
}

// Example usage
const filePath = "./utils/balor.json";
const jsonData = readJsonFile(filePath);

if (jsonData) {
  // You can now use the parsed JSON data as needed
  const monster = jsonData[0];
  const newMonster: any = {};
  // loop through the monster object and print all the keys and values
  for (const key in monster) {
    if (key === "name") {
      newMonster["name"] = monster.name[0];
    }
    if (key === "appearance") {
      newMonster["appearance"] = monster.appearance[0].value;
    }
    if (key === "description") {
      newMonster["description"] = monster.description[0].value;
    }
    if (key === "creature_family") {
      newMonster["creature_family"] = monster.creature_family[0].label;
    }
    if (key === "environment") {
      newMonster["environment"] = monster.environment[0].value;
    }
    if (key === "archetype") {
      newMonster["archetype"] = monster.archetype[0].value;
    }
    if (key === "boss_type") {
      newMonster["boss_type"] = monster.boss_type[0].value;
    }
    if (key === "boss_rank") {
      newMonster["boss_rank"] = parseInt(monster.boss_rank[0].value);
    }
    if (key === "level") {
      newMonster["level"] = parseInt(monster.level[0].value);
    }
    if (key === "category") {
      newMonster["category"] = monster.category[0].value;
    }
    if (key === "size") {
      newMonster["size"] = monster.size[0].value;
    }
    if (key === "str_mod") {
      newMonster["str_mod"] = parseInt(monster.str_mod[0].value);
    }
    if (key === "dex_mod") {
      newMonster["dex_mod"] = parseInt(monster.dex_mod[0].value);
    }
    if (key === "con_mod") {
      newMonster["con_mod"] = parseInt(monster.con_mod[0].value);
    }
    if (key === "int_mod") {
      newMonster["int_mod"] = parseInt(monster.int_mod[0].value);
    }
    if (key === "wis_mod") {
      newMonster["wis_mod"] = parseInt(monster.wis_mod[0].value);
    }
    if (key === "cha_mod") {
      newMonster["cha_mod"] = parseInt(monster.cha_mod[0].value);
    }
    if (key === "str_comment") {
      newMonster["str_comment"] = monster.str_comment[0].value;
    }
    if (key === "dex_comment") {
      newMonster["dex_comment"] = monster.dex_comment[0].value;
    }
    if (key === "con_comment") {
      newMonster["con_comment"] = monster.con_comment[0].value;
    }
    if (key === "int_comment") {
      newMonster["int_comment"] = monster.int_comment[0].value;
    }
    if (key === "wis_comment") {
      newMonster["wis_comment"] = monster.wis_comment[0].value;
    }
    if (key === "cha_comment") {
      newMonster["cha_comment"] = monster.cha_comment[0].value;
    }
  }
  console.log(newMonster);
} else {
  console.log("Failed to read or parse the JSON file.");
}
