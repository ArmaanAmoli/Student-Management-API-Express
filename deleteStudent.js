import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filePath = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__filePath);
const jsonPath = path.join(__dirPath,"students.json");

export function DeleteStudent(id){

    const fileContent = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

    for(let i=0 ; i<fileContent.length ; i++){
        if(fileContent[i].id===id){
            fileContent.splice(i,1);
            let newFileContent = fileContent;
            fs.writeFileSync(jsonPath,JSON.stringify(newFileContent),'utf-8');
            return true;
        }
    }
    return false;
}