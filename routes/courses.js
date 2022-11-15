/*API för att hämta/visa/ta bort kurser
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/

const express = require("express");
const router = express.Router();
const fs = require("fs"); //För att kunna läsa/skriva till filer, öppna courses.json

//Läs in json-data från extern fil
//let coursesStr = fs.readFile("courses.json", (success) => { console.log("FS Success!"), (err) => { console.log("Error" + err); } });
let coursesStr = '[{"_id":1,"courseId":"DT162G","courseName":"Javascript-baserad webbutveckling","coursePeriod":1},{"_id":2,"courseId":"IK060G","courseName":"Projektledning","coursePeriod":1},{"_id":3,"courseId":"DT071G","courseName":"Programmering i C#.NET","coursePeriod":2},{"_id":4,"courseId":"DT148G","courseName":"Webbutveckling för mobila enheter","coursePeriod":2},{"_id":5,"courseId":"DT102G","courseName":"ASP.NET med C#","coursePeriod":3},{"_id":6,"courseId":"IG021G","courseName":"Affärsplaner och kommersialisering","coursePeriod":3},{"_id":7,"courseId":"DT069G","courseName":"Multimedia för webben","coursePeriod":4},{"_id":8,"courseId":"DT080G","courseName":"Självständigt arbete","coursePeriod":4}]';
console.log(coursesStr);

//GET alla kurser
router.get('/', (req, res, next) => {
    let jsonObj = JSON.stringify(coursesStr); // Gör om Sträng till jsonobjekt
    console.log(jsonObj);
    res.contentType("json"); //Sätt content type till JSON
    res.send(jsonObj);
});

//Enskild kurs
router.get('/:id', (req, res, next) => {
    res.contentType("json");
    let jsonObj = JSON.stringify(coursesStr);
    let id = req.params.id;

    //console.log("JSON OBJECT: " + jsonObj + " Id: " + id);

    for(let course of jsonObj) { //Loopa igenom kurserna och skriv ut info om kursen med angivet ID
        console.log("I for-loop");
        if(course._id == id) { //Kontrollerar Id
            res.send(JSON.stringify(`[{"_id":${id}, "courseId": ${course.courseId}, "courseName": ${course.courseName}, "coursePeriod": ${course.coursePeriod}}]`));

        }
    }
    console.log("Efter for-loop");
});

//Radera kurs
router.delete('/:id', (req, res, next) => {
    res.send("Tar bort enskild kurs");
});

module.exports = router;