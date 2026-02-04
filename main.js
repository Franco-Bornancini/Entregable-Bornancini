
// Variable para almacenar los empleados
let employees = [];

// Importo los empleados del archivo JSON
fetch('employes.json')
    .then(response => response.json())
    .then(data => { 
        console.log('Datos cargados:', data);
        employees = data;
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        employees = [];
    }); 

// Creo los elementos del dom
const body = document.getElementById("Body");
const div = document.getElementById("containerDiv");
const divTabla = document.createElement("div");
const botonBuscar = document.createElement("button");
const botonAgregar = document.createElement("button");
const input = document.createElement("input");
const inputName = document.createElement("input");
const inputSalary = document.createElement("input");
input.type = "text";
input.placeholder = "Ingrese el nombre del empleado";
inputName.type = "text";
inputName.placeholder = "Nombre del empleado";
inputSalary.type = "number";
inputSalary.placeholder = "Salario del empleado";
botonBuscar.textContent = "Buscar Empleado";
botonAgregar.textContent = "Agregar Empleado";

// agrego los elementos al div
div.appendChild(input);
div.appendChild(botonBuscar);
div.appendChild(inputName);
div.appendChild(inputSalary);
div.appendChild(botonAgregar);


const tabla = document.createElement("table");
tabla.border = "1";
const header = tabla.insertRow();
const th1 = document.createElement("th");
th1.textContent = "Empleado";
const th2 = document.createElement("th");
th2.textContent = "Salario";
header.appendChild(th1);
header.appendChild(th2);
divTabla.appendChild(tabla);


// funciones
const buscarEmpleado = (name) => {
    const employe = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
    if(employe) {
        const row = tabla.insertRow();
        const cell1 = row.insertCell();
        cell1.textContent = employe.name;
        const cell2 = row.insertCell();
        cell2.textContent = employe.salary;
    } else {
        alert("Empleado no encontrado");
    }
}

const agregarEmpleado = (employe) => {
    const exists = employees.filter(emp => emp.name === employe.name).length > 0;
    if(!exists) {
        employees.push(employe);
        console.log("Empleado agregado:", employe);
    } else {
        console.log("El empleado ya existe");
    }
}


// agrego evento a los botones
botonBuscar.addEventListener("click", () => {
    const name = input.value;
    buscarEmpleado(name);
});

botonAgregar.addEventListener("click", () => {
    const newEmploye = {
        name: inputName.value,
        salary: parseFloat(inputSalary.value)
    };
    agregarEmpleado(newEmploye);
});

body.appendChild(divTabla);
