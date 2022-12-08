/*Node.JS+Express-baserat API för att returnera/ta bort kurser
UPPDATERAT 2022-12-04
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myCV", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(callback) { //När db-uppkopplingen öppnats
    console.log("Uppkopplad mot MongoDB");

    //Skapa schema
    let courseSchema = mongoose.Schema({
        courseCode: String,
        courseName: String,
        semester: String
    });

    //Skapa model
    let Course = mongoose.model("Course", courseSchema);
    

//Array med kurs-objekt
//let coursesArr = [{"_id":1,"courseId":"DT162G","courseName":"Javascript-baserad webbutveckling","coursePeriod":1},{"_id":2,"courseId":"IK060G","courseName":"Projektledning","coursePeriod":1},{"_id":3,"courseId":"DT071G","courseName":"Programmering i C#.NET","coursePeriod":2},{"_id":4,"courseId":"DT148G","courseName":"Webbutveckling för mobila enheter","coursePeriod":2},{"_id":5,"courseId":"DT102G","courseName":"ASP.NET med C#","coursePeriod":3},{"_id":6,"courseId":"IG021G","courseName":"Affärsplaner och kommersialisering","coursePeriod":3},{"_id":7,"courseId":"DT069G","courseName":"Multimedia för webben","coursePeriod":4},{"_id":8,"courseId":"DT080G","courseName":"Självständigt arbete","coursePeriod":4}];

//GET, returnera alla kurser
router.get('/', (req, res, next) => {
    //console.log(jsonObj);
    let jsonObj; //Jsondata ska lagras här

     Course.find(function(err, courses) { //Plocka ut alla kurser från DB
        if(err) {
            return console.error(err);
        } 
        else {
            //console.log(`Courses är: ${courses}`);
           jsonObj = JSON.stringify(courses);
           //console.log("jsonObj: "  + jsonObj);
           res.contentType("json"); //Sätt content type till JSON
           res.send(jsonObj);
        }
    });

    //let jsonObj = JSON.stringify(coursesArr); // Gör om Array till jsonobjekt

});

//Returnera enskild kurs
router.get('/:id', (req, res, next) => {
    res.contentType("json");
    let id = req.params.id; //Läs ut id från GET-anropet

    let jsonObj = []; //Jsondata ska lagras här

    Course.find({_id: id }, function(err, courses) { //Sök efter kurs med angivet ID
        if(err) {
            res.send(JSON.stringify(`Ingen kurs med id ${id} hittades`)); //Felaktigt id angivet
            return console.error(err);
        } 
        else {
            jsonObj = JSON.stringify(courses);
            res.send(jsonObj);

        }
    });
});

//Radera enskild kurs
router.delete('/', (req, res, next) => { //Felhantering, om inget ID skickats med hamnar man i denna Route som informerar att id måste skickas med
    res.contentType("json");
    res.status(400); //Statuskod Bad Request
    res.send(JSON.stringify(["error", "Id måste anges vid DELETE"]));
});

router.delete('/:id', (req, res, next) => {
    res.contentType("json");
    let id = req.params.id; //Id som skickats med
    let deleted = false;
    
    //Radera en kurs
    Course.deleteOne({_id: id}, (e, r) => {
        if(e) {
            res.send(e); //Skicka felmeddelande
        }
        else {
            deleted
            res.send(r); //Skicka OK svar
        }
    });

   /* if(deleted == false) { //Om kursen inte raderats. Felaktigt id angivet?
        res.send(JSON.stringify(["error", "Kurs med Id: " + id + "hittades inte och kunde därför inte raderas."]));
    }*/
});

//------POST - Skapa kurs
router.post("/", (req, res, next) => {
    let jsonData = req.body; //Jsondata har skickats med i body och görs om till javascriptobjekt
    let kursnamn = jsonData.kNamn;
    let kursid = jsonData.kId;
    let kursperiod = jsonData.kPeriod;

    console.log(`POST, ska skapa ny kurs ${kursnamn} ${kursid} ${kursperiod}`);
    
    // Skapa en ny kurs
    let course1 = new Course({ 
        courseCode: kursid,
        courseName: kursnamn,
        semester: kursperiod
    });	

    //Spara ny kurs
    course1.save(function(err) {  
        if(err) return console.error(err);
    });


    res.contentType('application/json');
    res.send(JSON.stringify(`Ny kurs skapad`));
});

}); //db open

module.exports = router;