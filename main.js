
// IMPORTO EL JSON DE EMPLEADOS
const employees = fetch('employes.json')
    .then(response => response.json())
    .then(data => { 
        console.log('Datos cargados:', data);
        return data; })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        return [];
    }); 

console.log(employees);

const body = document.getElementById("Body");
const div = document.createElement("div");
const boton = document.createElement("button");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Ingrese el nombre del empleado";
boton.textContent = "Buscar Empleado";

body.appendChild(div);
body.appendChild(boton);
body.appendChild(input);

const tabla = document.createElement("table");
tabla.border = "1";
const header = tabla.insertRow();
const th1 = document.createElement("th");
th1.textContent = "Empleado";
const th2 = document.createElement("th");
th2.textContent = "Salario";
header.appendChild(th1);
header.appendChild(th2);
body.appendChild(tabla);

boton.addEventListener("click", () => {
    const name = input.value;
    employees.then(data => {
        const employee = data.find(emp => emp.name.toLowerCase() === name.toLocaleLowerCase());
        if (employee) {
            const row = tabla.insertRow();
            const cell1 = row.insertCell();
            cell1.textContent = employee.name;
            const cell2 = row.insertCell();
            cell2.textContent = employee.salary;
        } else {
            alert("Empleado no encontrado");
        }
    });
});


div.innerHTML = "<h1>Empleados y salarios</h1>";



// employees.then(data => {
//     data.forEach(emp => {
//         const row = tabla.insertRow();
//         const cell1 = row.insertCell();
//         cell1.textContent = emp.name;
//         const cell2 = row.insertCell();
//         cell2.textContent = emp.salary;
//     });
// });
