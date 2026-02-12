import { db } from "../js/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";



const empleadosCollection = collection(db, "employees");
const empleadosSnapshot = await getDocs(empleadosCollection);
const empleadosList = empleadosSnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
}));

const eliminarEmpleado = async (empleadoId) => {
    try {
        const docRef = doc(db, "employees", empleadoId);
        await deleteDoc(docRef);
        console.log("Empleado eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
    }
}

const editarEmpleado = async (empleadoId, nuevosDatos) => {
    try {
        const docRef = doc(db, "employees", empleadoId);
        await updateDoc(docRef, nuevosDatos);
        console.log("Empleado actualizado correctamente");
    } catch (error) {
        console.error("Error al editar empleado:", error);
    }
}

const handleTraerEmpleados = async () => {
    try {
        console.log("Lista de empleados:", empleadosList);
        if(empleadosList.length > 0) {
            empleadosList.forEach(empleado => {
                const row = tabla.insertRow();
                const cell1 = row.insertCell();
                cell1.textContent = empleado.name;
                const cell2 = row.insertCell();
                cell2.textContent = empleado.salary;
                const cell3 = row.insertCell();
                
                // Crear botones para cada fila
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Eliminar";
                deleteBtn.className = "deleteButton";
                
                const editBtn = document.createElement("button");
                editBtn.textContent = "Editar";
                editBtn.className = "editButton";
                
                deleteBtn.addEventListener("click", async () => {
                    await eliminarEmpleado(empleado.id);
                    alert(`Empleado ${empleado.name} eliminado`);
                    // Recargar la página para ver los cambios
                    location.reload();
                });

                editBtn.addEventListener("click", () => {
                    const nuevoSalario = prompt(`Editar salario de ${empleado.name}:`, empleado.salary);
                    if (nuevoSalario !== null) {
                        editarEmpleado(empleado.id, { salary: parseInt(nuevoSalario) });
                        alert(`Salario de ${empleado.name} actualizado`);
                        location.reload();
                    }
                });
                
                cell3.appendChild(deleteBtn);
                cell3.appendChild(editBtn);
            });
        } else {
            alert("No hay empleados en la base de datos");
        }
    } catch (error) {
        console.error("Error al traer empleados: ", error);
    }
};

const tabla = document.createElement("table");
tabla.className = "tablaEmpleados";
tabla.border = "1";
const header = tabla.insertRow();
header.className = "headerTabla";
const th1 = document.createElement("th");
th1.textContent = "Empleado";
const th2 = document.createElement("th");
th2.textContent = "Salario";
const th3 = document.createElement("th");
th3.textContent = "Acciones";
header.appendChild(th1);
header.appendChild(th2);
header.appendChild(th3);

handleTraerEmpleados();

export { tabla };