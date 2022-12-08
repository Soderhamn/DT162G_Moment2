/*-----------Av: Marcus Andersson, maan2117@student.miun.se------------*/
"use strict";

//Hindra att formulär submittas
let formEl = document.getElementById("form1");

form1.addEventListener("submit", function(ev) {
    ev.preventDefault();
    console.log("Submit hindrad");
});