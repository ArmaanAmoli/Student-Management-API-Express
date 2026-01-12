import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filePath = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__filePath);
const jsonPath = path.join(__dirPath,"students.json");

export function SearchStudent(id){

    const fileContent = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

    for(let i=0 ; i<fileContent.length ; i++){
        if(fileContent[i].id===id){
            return JSON.stringify(fileContent[i]);
        }
    }
    return "";
}