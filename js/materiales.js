import { navbar } from "../layout/navbar.js";
import { tabla } from "../layout/tablesMateriales.js";

const body = document.getElementById("Body");
// Titulo
const h1 = document.createElement("h1");
h1.textContent = "Materiales";
h1.className = "title";
// contenedor principal
const div = document.createElement("div");
div.className = "containerDiv";
const divTabla = document.createElement("div");
divTabla.className = "divTabla";

body.appendChild(navbar);
body.appendChild(h1);
body.appendChild(div);
div.appendChild(divTabla);
divTabla.appendChild(tabla);



