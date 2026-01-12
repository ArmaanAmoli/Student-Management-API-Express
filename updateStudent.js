import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filePath = fileURLToPath(import.meta.url);
const __dirPath = path.dirname(__filePath);
const jsonPath = path.join(__dirPath,"students.json");

export function UpdateStudent(ID,updates){
    let DataArray = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));
    for(let i=0; i<DataArray.length ; i++){
        if(DataArray[i].id===ID){

            Object.keys(updates).forEach(key=>{
                if(key === "id"){
                    return;
                }
                if(DataArray[i][key] !== undefined){
                    DataArray[i][key] = updates[key];
                }
            });
            fs.writeFileSync(jsonPath, JSON.stringify(DataArray) ,'utf-8');
            return true;
        }
    }
    return false;
}