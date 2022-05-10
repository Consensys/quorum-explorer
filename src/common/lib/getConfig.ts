import fs from "fs";

const defaultConfig = require("../../config/config.json");

export async function configReader() {
  if (process.env.QE_CONFIG_PATH) {
    const data = await fs.promises.readFile(
      `${process.env.QE_CONFIG_PATH}`,
      "utf8"
    );
    return data;
  } else {
    return JSON.stringify(defaultConfig);
  }
}
