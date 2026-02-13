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


const crearModalEditarEmpleado = () => {
    const overlay = document.createElement("div");
    overlay.className = "modalOverlay";

    const modal = document.createElement("div");
    modal.className = "materialModal";

    const title = document.createElement("h3");
    title.textContent = "Editar empleado";

    const form = document.createElement("form");
    form.className = "modalForm";

    const labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre";
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.required = true;

    const labelSalario = document.createElement("label");
    labelSalario.textContent = "Salario";
    const inputSalario = document.createElement("input");
    inputSalario.type = "number";
    inputSalario.required = true;
    inputSalario.min = "0";

    const actions = document.createElement("div");
    actions.className = "modalActions";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "modalCancelButton";
    cancelBtn.textContent = "Cancelar";

    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "modalSaveButton";
    saveBtn.textContent = "Guardar";

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);

    form.appendChild(labelNombre);
    form.appendChild(inputNombre);
    form.appendChild(labelSalario);
    form.appendChild(inputSalario);
    form.appendChild(actions);

    modal.appendChild(title);
    modal.appendChild(form);
    overlay.appendChild(modal);

    document.body.appendChild(overlay);

    const closeModal = () => {
        document.body.removeChild(overlay);
    };

    cancelBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    return {
        inputNombre,
        inputSalario,
        form,
        closeModal
    };
};

const abrirModalEditarEmpleado = (empleado) => {
    const { inputNombre, inputSalario, form, closeModal } = crearModalEditarEmpleado();

    inputNombre.value = empleado.name ?? "";
    inputSalario.value = empleado.salary ?? 0;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const salario = parseInt(inputSalario.value, 10);

        if (Number.isNaN(salario)) {
            alert("Salario debe ser un número válido");
            return;
        }

        try {
            await editarEmpleado(empleado.id, {
                name: inputNombre.value.trim(),
                salary: salario
            });

            closeModal();
            alert(`Empleado ${empleado.name} actualizado`);
            location.reload();
        } catch (error) {
            console.error("No se pudo guardar el empleado:", error);
            alert("No se pudo guardar el empleado");
        }
    });
};

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
                    location.reload();
                });

                editBtn.addEventListener("click", () => {
                    abrirModalEditarEmpleado(empleado);
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