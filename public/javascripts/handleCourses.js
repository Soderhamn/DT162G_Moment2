/* Kod för frontend-delen av att hantera kurser
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/
"use strict";

import {Course} from "./Course.js"; //Importera klassen Course

let course = new Course; //Skapa ny instans av klassen

//Läs in element från webbsidan
const courseListEl = document.getElementById("courseList");

//Händelsehanterare
window.addEventListener("load", function() { printAllCourses(); }); //Skriv ut kurstabellen vid sidladdning
//Händelsehanterare för Delete läggs som onclick-attribut på respektive knapp

//Funktioner
async function deleteCourse(id) { //Radera kurs
    course.deleteCourse(id); //Anropa metoden id i klassen Course och skicka med id på kurs som ska tas bort
    //printAllCourses(); //Skriv ut tabellen på nytt efter att en kurs tagits bort
}

async function printAllCourses() { //Skriv ut tabellrader med alla kurser
    let coursesArr = await course.getAllCourses();
    courseListEl.innerHTML = ""; //Nollställ tabellen
    for(let i = 0; i < coursesArr.length; i++) {
        courseListEl.innerHTML += `<tr><td>${coursesArr[i]._id}</td><td>${coursesArr[i].courseId}</td><td>${coursesArr[i].courseName}</td><td>${coursesArr[i].coursePeriod}</td><td><button type="button" id="${coursesArr[i]._id}" class="deleteBtn"><i class="fa fa-trash"></i> Radera kurs</td></tr>`;
    }

    const buttons = document.querySelectorAll('.deleteBtn'); //Välj alla knappar med klassen deleteBtn
    for(let i = 0; i < buttons.length; i++) //Loopa igenom knapparna och lägg till eventlyssnare
    {
        let id = buttons[i].getAttribute("id"); //Hämta id för aktuell knapp (samma som kursid)
        buttons[i].addEventListener("click", async () => { await deleteCourse(id) }); //Lägg till eventlyssnare
    }  
        
}



