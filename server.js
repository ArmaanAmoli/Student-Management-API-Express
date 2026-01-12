import express from 'express';
import { newStudent } from './addStudent.js'
import { printStudent } from './fetchStudentData.js';
import { SearchStudent } from './searchJS.js';
import { DeleteStudent } from './deleteStudent.js';
import { UpdateStudent } from './updateStudent.js';

const app = express();
const port = 8000;


//----------MIDDLEWARE----------//
app.use(express.json());

const validateStudent = (req, res, next) => {
    const { name, marks } = req.body; //Extract name and marks feild from request body.
    if (!name && !marks && name.trim().length === 0) {
        return res.status(400).send("Missing Essential Data (name and marks).")
    }
    next();
}

const validateStudentID = (req, res, next) => {
    const ID = parseInt(req.params.id);
    if (!ID || ID <= 0) {
        return res.status(404).send("Student not found.")
    }
    next();
}

//----------CRUD---------//
app.get('/api', (req, res) => {
    res.status(200).send("Welcome!, student management system API");
})

app.get('/api/student', (req, res, next) => {

    try {
        const reply = printStudent();
        res.set('Content-Type', 'text/plain');
        res.status(200).send(reply);
    } catch (error) {
        next(error); //if we catch an error we will pass it through Error Handeling middleware.
    }

});



app.post('/api/student', validateStudent, (req, res, next) => {//first we will run the validateStudent() middleware to check request data

    try {
        const id = newStudent(String(req.body.name), req.body.marks);
        res.status(201).send(`New Student added successfully the Student ID is ${id}`);
    }
    catch (error) {
        next(error);
    }
})


app.get('/api/student/:id', validateStudentID, (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const student = SearchStudent(id);
        if (student.length === 0) {
            const Error = new Error("ID not found");
            Error.status = 404;
            throw Error;
        }
        else {
            res.status(200).send(student);
        }
    } catch (error) {
        next(error);
    }
})

app.delete('/api/student/:id', validateStudentID, (req, res,next) => {
    try {
        const id = parseInt(req.params.id);
        let student = DeleteStudent(id);
        if (student) {
            res.status(200).send("Successfully deleted!");
        }
        else {
            const Error = new Error("ID not found");
            Error.status = 404;
            throw Error;
        }
    } catch (error) {
        next(error);
    }
})

app.patch('/api/student/:id', validateStudent, validateStudentID, (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const updates = req.body;
        const status = UpdateStudent(id, updates);
        if (status) {
            res.status(200).send("UPDATED");
        }
        else {
            const Error = new Error("ID not found");
            Error.status = 404;
            throw Error;
        }
    }catch (error) {
        next(error);
    }

})

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(`Error Stack: ${err.stack}`);
    const statusCode = err.status || 500; // If error already have a status code if not give it 500(Server Error)
    res.status(statusCode).send("Server Error");
})

//Starting the server
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
})