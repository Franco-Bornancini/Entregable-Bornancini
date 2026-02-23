import { navbar } from "../layout/navbar.js";
import { tabla } from "../layout/tablesSalidas.js";
import { db } from "../js/firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


const empleadosGuardados = JSON.parse(localStorage.getItem("empleados") || "[]");
const nombresEmpleados = empleadosGuardados
    .map((empleado) => empleado.name)
    .filter((nombre) => typeof nombre === "string" && nombre.trim().length > 0);


// funciones
const openModal = () => {
    cargarEmpleadosEnSelect(selectVendedor);
    cargarMaterialesEnSelect(inputMaterial);
    modal.classList.add("show");
};

const closeModal = () => {
    modal.classList.remove("show");
};

const cargarEmpleadosEnSelect = (selectElement) => {
    selectElement.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccionar empleado";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    nombresEmpleados.forEach((nombre) => {
        const option = document.createElement("option");
        option.value = nombre;
        option.textContent = nombre;
        selectElement.appendChild(option);
    });
};

const cargarMaterialesEnSelect = (selectElement) => {
    selectElement.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccionar material";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    const materialesGuardados = JSON.parse(localStorage.getItem("materiales"));
    materialesGuardados.forEach((material) => {
        const option = document.createElement("option");
        option.value = material.name;
        option.textContent = material.name;
        selectElement.appendChild(option);
    });
};

const guardarSalida = async (event) => {
    event.preventDefault();
    const material = inputMaterial.value;
    const cantidad = parseInt(inputCantidad.value, 10);
    const vendedor = selectVendedor.value;
    const precio = parseFloat(inputPrecio.value);
    if (!material || !vendedor || Number.isNaN(cantidad) || cantidad <= 0 || Number.isNaN(precio) || precio <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }
    try {
        await addDoc(collection(db, "salidas"), {
            material,
            cantidad,
            vendedor,
            precio,
            fecha: new Date()
        });
        alert("Salida registrada correctamente.");
        closeModal();
    } catch (error) {
        console.error("Error al registrar la salida:", error);
        alert("Hubo un error al registrar la salida. Por favor, intente nuevamente.");
    }
};

const body = document.getElementById("Body");
// Titulo
const h1 = document.createElement("h1");
h1.textContent = "Salidas";
h1.className = "title";

// modal para agregar la salida de un material (por cantidad y quien lo hizo - "vendedor")
const modal = document.createElement("div");
modal.className = "modal";
const modalContent = document.createElement("div");
modalContent.className = "modal-content";
const closeButton = document.createElement("span");
closeButton.className = "close-button";
closeButton.innerHTML = "&times;";
const modalTitle = document.createElement("h2");
modalTitle.textContent = "Nueva salida";
const modalText = document.createElement("p");
modalText.textContent = "Cargar nueva salida.";
modalContent.appendChild(closeButton);
modalContent.appendChild(modalTitle);
modalContent.appendChild(modalText);
modal.appendChild(modalContent);

// formulario para registrar la salida
const form = document.createElement("form");
form.className = "modal-form";


const labelMaterial = document.createElement("label");
labelMaterial.textContent = "Material:";
const inputMaterial = document.createElement("select");
inputMaterial.name = "material";
inputMaterial.required = true;

const labelCantidad = document.createElement("label");
labelCantidad.textContent = "Cantidad:";
const inputCantidad = document.createElement("input");
inputCantidad.type = "number";
inputCantidad.name = "cantidad";
inputCantidad.required = true;

const labelPrecio = document.createElement("label");
labelPrecio.textContent = "Precio:";
const inputPrecio = document.createElement("input");
inputPrecio.type = "number";
inputPrecio.name = "precio";
inputPrecio.required = true;

const labelVendedor = document.createElement("label");
labelVendedor.textContent = "Empleado:";
const selectVendedor = document.createElement("select");
selectVendedor.name = "vendedor";
selectVendedor.required = true;

const btnAdd = document.createElement("button");
btnAdd.type = "submit";
btnAdd.className = "modalSaveButton";
btnAdd.textContent = "Agregar";
btnAdd.addEventListener("click", guardarSalida);

cargarEmpleadosEnSelect(selectVendedor);
cargarMaterialesEnSelect(inputMaterial);


form.appendChild(labelMaterial);
form.appendChild(inputMaterial);
form.appendChild(labelCantidad);
form.appendChild(inputCantidad);
form.appendChild(labelPrecio);
form.appendChild(inputPrecio);
form.appendChild(labelVendedor);
form.appendChild(selectVendedor);
form.appendChild(btnAdd);
modalContent.appendChild(form);



// contenedor principal
const div = document.createElement("div");
div.className = "containerDiv";
const btnAddSalida = document.createElement("button");
btnAddSalida.textContent = "Agregar Salida";
btnAddSalida.className = "addButton";
btnAddSalida.addEventListener("click", openModal);
const divTabla = document.createElement("div");
divTabla.className = "divTabla";

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

body.appendChild(navbar);
body.appendChild(h1);
body.appendChild(btnAddSalida);
body.appendChild(modal);
body.appendChild(div);
div.appendChild(divTabla);
divTabla.appendChild(tabla);



