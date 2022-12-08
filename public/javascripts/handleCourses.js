/* Kod för frontend-delen av att hantera kurser
Av: Marcus Andersson, maan2117@student.miun.se, HT 2022*/
"use strict";

import {Course} from "./Course.js"; //Importera klassen Course

let course = new Course; //Skapa ny instans av klassen
let formEl = document.getElementById("form1");

let txtKIdEl = document.getElementById("kId"); //Input-fält från formuläret
let txtKNamnEl = document.getElementById("kNamn");
let txtkPeriodEl = document.getElementById("kPeriod");
let lblResp = document.getElementById("lblResponse");

//Läs in element från webbsidan
const courseListEl = document.getElementById("courseList");

//Händelsehanterare
window.addEventListener("load", function() { printAllCourses(); }); //Skriv ut kurstabellen vid sidladdning
//Händelsehanterare för Delete läggs som onclick-attribut på respektive knapp
formEl.addEventListener("submit", () => { //POSTA/ Skapa ny kurs, nytt i moment 3
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if (xhr.status == 200 ) {
            const response = JSON.parse(xhr.responseText);
            lblResp.innerText = response; //Skriv ut svarstexten från APIet på hemsidan
            
            printAllCourses(); //Ladda om listan med kurser efter att ny skapats
        }
    }

    let sendObj = {
        kId: txtKIdEl.value,
        kNamn: txtKNamnEl.value,
        kPeriod: txtkPeriodEl.value
    }

    xhr.open('POST', 'http://127.0.0.1:3000/courses/'); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(sendObj));
});

//Funktioner
async function deleteCourse(id) { //Radera kurs
    await course.deleteCourse(id); //Anropa metoden id i klassen Course och skicka med id på kurs som ska tas bort
    printAllCourses(); //Skriv ut tabellen på nytt efter att en kurs tagits bort
}

async function printAllCourses() { //Skriv ut tabellrader med alla kurser
    let coursesArr = await course.getAllCourses();
    courseListEl.innerHTML = ""; //Nollställ tabellen
    for(let i = 0; i < coursesArr.length; i++) {
        courseListEl.innerHTML += `<tr><td>${coursesArr[i]._id}</td><td>${coursesArr[i].courseCode}</td><td>${coursesArr[i].courseName}</td><td>${coursesArr[i].semester}</td><td><button type="button" id="${coursesArr[i]._id}" class="deleteBtn"><i class="fa fa-trash"></i> Radera kurs</td></tr>`;
    }

    const buttons = document.querySelectorAll('.deleteBtn'); //Välj alla knappar med klassen deleteBtn
    for(let i = 0; i < buttons.length; i++) //Loopa igenom knapparna och lägg till eventlyssnare
    {
        let id = buttons[i].getAttribute("id"); //Hämta id för aktuell knapp (samma som kursid)
        buttons[i].addEventListener("click", () => { deleteCourse(id) }); //Lägg till eventlyssnare
    }  
        
}



