const { response } = require("express");

document.addEventListener("DOMContentLoaded", function() {
const estudanteTable = document.querySelector("#estudante-table tbody");
function loadEstudanes() {
fetch("/api/estudantes")
.then(response => response.json())
.then(estudantes => {
 estudanteTable.innerHTML ="";
 estudantes.forEach(estudantes => {
const row = document.createElement("tr");
row.innerHTML = `
<td> ${estudantes.id} </td>
 <td><input type="text" value="${estudantes.nome}" data-id="${estudantes.id}" class="update-nome"></td>
 <td><input type="number" value="${estudantes.idade}" data-id="${estudantes.id}" class="update-idade"></td>
 <td><input type="number" value="${estudantes.primeiraNota}" data-id="${estudantes.id}" class="update-nota1"></td>
 <td><input type="number" value="${estudantes.segundaNota}" data-id="${estudantes.id}" class="update-nota2"></td>

 <td><input type="text" value="${estudantes.nomeProf}" data-id="${estudantes.id}" class="update-nomeProf"></td>
 <td><input type="text" value="${estudantes.numeroSala}" data-id="${estudantes.id}" class="update-numSala"></td>
<td>  <button data-id="${estudantes.id}" class="delete-btn">Excluir</button> </td>
`;
estudanteTable.appendChild(row);    
});   

});   
    
}
loadEstudanes();

document.getElementById("add-aluno-form").addEventListener("submit", function(e) {
e.preventDefault();

const nome = document.getElementById("nome").value;
const idade = document.getElementById("idade").value;
const primeiraNota = document.getElementById("primeiraNota").value;
const segundaNota = document.getElementById("segundaNota").value;
const nomeProf = document.getElementById("nomeProf").value;
const numeroSala = document.getElementById("numeroSala").value;

fetch("/api/estudantes", {
method: "post",
headers: { "Content-Type": "application/json"},
body: JSON.stringify({nome,idade, primeiraNota, segundaNota, nomeProf, numeroSala})
}).then(() => {
loadEstudanes();
});
});

estudanteTable.addEventListener("change", function(e) {
const target =e.target;
if(target.classList.contains("update-nome") || target.classList.contains("update-idade") || target.classList.contains("update-nota1") || target.classList.contains("update-nota2") || target.classList.contains("update-nomeProf") || target.classList.contains("update-numSala")){
const id = target.getAttribute("data-id");
const nome = document.querySelector(`.update-nome[data-id="${id}"]`).value;
const idade = document.querySelector(`.update-idade[data-id="${id}"]`).value;
const prmeiraNota = document.querySelector(`.update-nota1[data-id="${id}"]`).value;
const segundaNota = document.querySelector(`.update-nota2[data-id="${id}"]`).value;
const nomeProf = document.querySelector(`.update-nomeProf[data-id="${id}"]`).value;
const numeroSala = document.querySelector(`.update-numSala[data-id="${id}"]`).value;


fetch("/api/estudantes${id}", {
    method: "put",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({nome,idade, primeiraNota, segundaNota, nomeProf, numeroSala})
    }).then(() => {
    loadEstudanes();

});
}
});
estudanteTable.addEventListener("click", function(e) {
if(e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    fetch(`/api/estudantes/${id}`, {

method: "DELETE"
}).then(() => {
loadEstudanes();


})



}



})



});