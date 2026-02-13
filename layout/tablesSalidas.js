import { db } from "../js/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";



const salidasCollection = collection(db, "salidas");
const salidasSnapshot = await getDocs(salidasCollection);
const salidasList = salidasSnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
}));

const handleTraerSalidas = async () => {
    try {
        console.log("Lista de salidas:", salidasList);
        if(salidasList.length > 0) {
            salidasList.forEach(salida => {
                const row = tabla.insertRow();
                const cell1 = row.insertCell();
                cell1.textContent = salida.name;
                const cell2 = row.insertCell();
                cell2.textContent = salida.price;
                const cell3 = row.insertCell();
                cell3.textContent = salida.cantidad;
                const cell4 = row.insertCell();
                cell4.textContent = salida.vendedor;
            });
        } else {
            alert("No hay materiales en la base de datos");
        }
    } catch (error) {
        console.error("Error al traer materiales: ", error);
    }
};

const tabla = document.createElement("table");
tabla.className = "tablaMateriales";
tabla.border = "1";
const header = tabla.insertRow();
header.className = "headerTabla";
const th1 = document.createElement("th");
th1.textContent = "Material";
const th2 = document.createElement("th");
th2.textContent = "Precio";
const th3 = document.createElement("th");
th3.textContent = "Cantidad";
const th4 = document.createElement("th");
th4.textContent = "Vendedor";
header.appendChild(th1);
header.appendChild(th2);
header.appendChild(th3);
header.appendChild(th4);

handleTraerSalidas();

export { tabla };