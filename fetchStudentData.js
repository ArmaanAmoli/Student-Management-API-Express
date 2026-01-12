
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __currentFilePath = fileURLToPath(import.meta.url);
const __currentDirectory = path.dirname(__currentFilePath);
const jsonPath = path.join(__currentDirectory , "students.json");

export function printStudent(){
    const student = fs.readFileSync(jsonPath , 'utf-8');
    return student;
}

