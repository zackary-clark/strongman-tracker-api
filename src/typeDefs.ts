import { readdirSync, readFileSync } from "fs";

const schemaDir = "src/schema";
const fileNames = readdirSync(schemaDir);

export const typeDefs = fileNames.map((fileName) => readFileSync(schemaDir + "/" + fileName).toString("utf-8"));
