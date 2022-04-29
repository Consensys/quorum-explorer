import fs from "fs";

export async function configReader() {
  //@ts-ignore
  const data = await fs.promises.readFile(
    `${process.env.QE_CONFIG_PATH}`,
    "utf8"
  );
  // fs.readFile(`${process.env.QE_CONFIG_PATH}`, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   return data;
  // });
  return data;
}
