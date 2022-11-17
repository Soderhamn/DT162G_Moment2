/*Node.JS+Express-baserat API för att returnera/ta bort kurser
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/

const express = require("express");
const router = express.Router();

//Sträng med kurser
let coursesArr = [{"_id":1,"courseId":"DT162G","courseName":"Javascript-baserad webbutveckling","coursePeriod":1},{"_id":2,"courseId":"IK060G","courseName":"Projektledning","coursePeriod":1},{"_id":3,"courseId":"DT071G","courseName":"Programmering i C#.NET","coursePeriod":2},{"_id":4,"courseId":"DT148G","courseName":"Webbutveckling för mobila enheter","coursePeriod":2},{"_id":5,"courseId":"DT102G","courseName":"ASP.NET med C#","coursePeriod":3},{"_id":6,"courseId":"IG021G","courseName":"Affärsplaner och kommersialisering","coursePeriod":3},{"_id":7,"courseId":"DT069G","courseName":"Multimedia för webben","coursePeriod":4},{"_id":8,"courseId":"DT080G","courseName":"Självständigt arbete","coursePeriod":4}];

//GET, returnera alla kurser
router.get('/', (req, res, next) => {
    //console.log(jsonObj);
    let jsonObj = JSON.stringify(coursesArr); // Gör om Array till jsonobjekt
    res.contentType("json"); //Sätt content type till JSON
    res.send(jsonObj);
});

//Returnera enskild kurs
router.get('/:id', (req, res, next) => {
    res.contentType("json");
    let id = req.params.id; //Läs ut id från GET-anropet
    let exists = false; //"Boolean" för att veta om kursen hittats eller inte
    let courseFound = ""; //Sträng där funnen kurs ska lagras

    for(let i = 0; i < coursesArr.length; i++) { //Loopa igenom kurserna och skriv ut info om kursen med angivet ID
        if(coursesArr[i]._id == id) { //Kontrollerar Id
            courseFound = JSON.stringify([{"_id": id , "courseId": coursesArr[i].courseId, "courseName": coursesArr[i].courseName, "coursePeriod": coursesArr[i].coursePeriod}]);
               exists = true;
            }
    }

    if(exists == true) { //Om kursen hittats (angivet id fanns med i jsonObj)
        res.send(courseFound); //Returnera hittad kurs som json-sträng
    }
    else {
        res.send(`Ingen kurs med id ${id} hittades`); //Felaktigt id angivet
    }
});

//Radera enskild kurs
router.delete('/', (req, res, next) => { //Felhantering, om inget ID skickats med hamnar man i denna Route som informerar att id måste skickas med
    res.contentType("json");
    res.status(400); //Statuskod Bad Request
    res.send(JSON.stringify(["error", "Id måste anges vid DELETE"]));
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id; //Id som skickats med
    let deleted = false;
    for(let i = 0; i < coursesArr.length; i++) { //Loopa igenom kurserna och Radera kursen med angivet ID
        if(coursesArr[i]._id == id) { //Kontrollerar Id
            coursesArr.splice(i, 1); //Radera 1 element med index i ur coursesArr-arrayen
            deleted = true; 
            res.contentType('application/json');
            res.send(`Kurs med id: ${id} raderades`);
        }
    }

    if(deleted == false) { //Om kursen inte raderats. Felaktigt id angivet?
        res.send(JSON.stringify(["error", "Kurs med Id: " + id + "hittades inte och kunde därför inte raderas."]));
    }
});

module.exports = router;