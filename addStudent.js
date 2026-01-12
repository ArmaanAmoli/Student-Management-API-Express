import path from "path";
import fs from "fs";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";

const __CurrentFilePath = fileURLToPath(import.meta.url);
const __CurrentDirectory = path.dirname(__CurrentFilePath);
const jsonPath = path.join(__CurrentDirectory , "students.json");

export function newStudent(name , marks){
    const StudentsJSON = fs.readFileSync(jsonPath , 'utf-8');
    let Students = JSON.parse(StudentsJSON);
    let id = 1;
    if(Students.length != 0){
        id = Students[Students.length -1].id + 1;
    }
    Students.push({"name":name , "marks":marks , "id":id});
    fs.writeFileSync(jsonPath , JSON.stringify(Students) ,'utf-8' );
    return id
}