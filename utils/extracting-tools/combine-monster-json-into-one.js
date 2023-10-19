const fs = require("fs");
const path = require("path");

const inputFolderPath = "./public/creatures/json"; // Replace with the path to your input folder
const outputFilePath = "./creatures.json"; // Replace with the path where you want to save the combined JSON file

function readJsonFilesFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  const jsonFiles = files.filter((file) => path.extname(file) === ".json");

  const data = jsonFiles.map((file) => {
    const filePath = path.join(folderPath, file);
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  });

  return data;
}

function combineToJsonFile(data, outputPath) {
  const combinedData = JSON.stringify(data, null, 2);

  fs.writeFileSync(outputPath, combinedData, "utf-8");
}

try {
  const jsonData = readJsonFilesFromFolder(inputFolderPath);
  combineToJsonFile(jsonData, outputFilePath);
  console.log("JSON files combined successfully!");
} catch (error) {
  console.error("An error occurred:", error);
}
