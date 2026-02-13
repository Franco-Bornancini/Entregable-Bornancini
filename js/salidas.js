import { navbar } from "../layout/navbar.js";
import { tabla } from "../layout/tablesSalidas.js";
import { db } from "../js/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// funciones
const addSalidas = () => {
    const salidasCollection = collection(db, "salidas");
    const salidasSnapshot = getDocs(salidasCollection);

    alert("Función para agregar una nueva salida");
}



const body = document.getElementById("Body");
// Titulo
const h1 = document.createElement("h1");
h1.textContent = "Salidas";
h1.className = "title";

const modal = document.createElement("div");
modal.className = "modal";
const modalContent = document.createElement("div");
modalContent.className = "modal-content";
const closeButton = document.createElement("span");
closeButton.className = "close-button";
closeButton.innerHTML = "&times;";
modalContent.appendChild(closeButton);
modal.appendChild(modalContent);

// contenedor principal
const div = document.createElement("div");
div.className = "containerDiv";
const btnAddSalida = document.createElement("button");
btnAddSalida.textContent = "Agregar Salida";
btnAddSalida.className = "addButton";
btnAddSalida.addEventListener("click", addSalidas);
const divTabla = document.createElement("div");
divTabla.className = "divTabla";

body.appendChild(navbar);
body.appendChild(h1);
body.appendChild(div);
div.appendChild(btnAddSalida);
div.appendChild(divTabla);
divTabla.appendChild(tabla);



