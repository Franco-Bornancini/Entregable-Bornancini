
const navbar = document.createElement("nav");
navbar.className = "navbar";
const ul = document.createElement("ul");
ul.className = "nav-links";

// Inicio
const li1 = document.createElement("li");
const a1 = document.createElement("a");
a1.href = "./index.html";
a1.textContent = "Inicio";
li1.appendChild(a1);
ul.appendChild(li1);
navbar.appendChild(ul);
// Empleados
const li2 = document.createElement("li");
const a2 = document.createElement("a");
a2.href = "./empleados.html";
a2.textContent = "Empleados";
li2.appendChild(a2);
ul.appendChild(li2);

export { navbar };