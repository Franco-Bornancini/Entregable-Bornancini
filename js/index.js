// import { tabla } from "../layout/tables.js";
import { navbar } from "../layout/navbar.js";

// Creo los elementos del dom
const body = document.getElementById("Body");
const div = document.createElement("div");
div.className = "containerDiv";
const divTabla = document.createElement("div");
divTabla.className = "divTabla";
// const botonBuscar = document.createElement("button");
// const botonAgregar = document.createElement("button");
// const input = document.createElement("input");
// const inputName = document.createElement("input");
// const inputSalary = document.createElement("input");
// input.type = "text";
// input.placeholder = "Ingrese el nombre del empleado";
// inputName.type = "text";
// inputName.placeholder = "Nombre del empleado";
// inputSalary.type = "number";
// inputSalary.placeholder = "Salario del empleado";
// botonBuscar.textContent = "Buscar Empleado";
// botonAgregar.textContent = "Agregar Empleado";

// agrego los elementos al div
// div.appendChild(input);
// div.appendChild(botonBuscar);
// div.appendChild(inputName);
// div.appendChild(inputSalary);
// div.appendChild(botonAgregar);

body.appendChild(navbar);
body.appendChild(div);
div.appendChild(divTabla);
// divTabla.appendChild(tabla);


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


