import { db } from "../js/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";



const materialesCollection = collection(db, "materials");
const materialesSnapshot = await getDocs(materialesCollection);
const materialesList = materialesSnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
}));

const eliminarMaterial = async (materialId) => {
    try {
        const docRef = doc(db, "materials", materialId);
        await deleteDoc(docRef);
        console.log("Material eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar material:", error);
    }
}

const editarMaterial = async (materialId, nuevosDatos) => {
    try {
        const docRef = doc(db, "materials", materialId);
        await updateDoc(docRef, nuevosDatos);
        console.log("Material actualizado correctamente");
    } catch (error) {
        console.error("Error al editar material:", error);
    }
}

const crearModalEditarMaterial = () => {
    const overlay = document.createElement("div");
    overlay.className = "modalOverlay";

    const modal = document.createElement("div");
    modal.className = "materialModal";

    const title = document.createElement("h3");
    title.textContent = "Editar material";

    const form = document.createElement("form");
    form.className = "modalForm";

    const labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre";
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.required = true;

    const labelPrecio = document.createElement("label");
    labelPrecio.textContent = "Precio";
    const inputPrecio = document.createElement("input");
    inputPrecio.type = "number";
    inputPrecio.required = true;
    inputPrecio.min = "0";

    const labelStock = document.createElement("label");
    labelStock.textContent = "Stock";
    const inputStock = document.createElement("input");
    inputStock.type = "number";
    inputStock.required = true;
    inputStock.min = "0";

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
    form.appendChild(labelPrecio);
    form.appendChild(inputPrecio);
    form.appendChild(labelStock);
    form.appendChild(inputStock);
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
        inputPrecio,
        inputStock,
        form,
        closeModal
    };
};

const abrirModalEditarMaterial = (material) => {
    const { inputNombre, inputPrecio, inputStock, form, closeModal } = crearModalEditarMaterial();

    inputNombre.value = material.name ?? "";
    inputPrecio.value = material.price ?? 0;
    inputStock.value = material.stock ?? 0;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const precio = parseInt(inputPrecio.value, 10);
        const stock = parseInt(inputStock.value, 10);

        if (Number.isNaN(precio) || Number.isNaN(stock)) {
            alert("Precio y stock deben ser números válidos");
            return;
        }

        await editarMaterial(material.id, {
            name: inputNombre.value.trim(),
            price: precio,
            stock
        });

        closeModal();
        alert(`Material ${material.name} actualizado`);
        location.reload();
    });
};

const handleTraerMateriales = async () => {
    try {
        console.log("Lista de materiales:", materialesList);
        if(materialesList.length > 0) {
            materialesList.forEach(material => {
                const row = tabla.insertRow();
                const cell1 = row.insertCell();
                cell1.textContent = material.name;
                const cell2 = row.insertCell();
                cell2.textContent = material.price;
                const cell3 = row.insertCell();
                cell3.textContent = material.stock;
                const cell4 = row.insertCell();

                
                // Crear botones para cada fila
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Eliminar";
                deleteBtn.className = "deleteButton";
                
                const editBtn = document.createElement("button");
                editBtn.textContent = "Editar";
                editBtn.className = "editButton";
                
                deleteBtn.addEventListener("click", async () => {
                    await eliminarMaterial(material.id);
                    alert(`Material ${material.name} eliminado`);
                    location.reload();
                });

                editBtn.addEventListener("click", () => {
                    abrirModalEditarMaterial(material);
                });
                
                cell4.appendChild(deleteBtn);
                cell4.appendChild(editBtn);
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
th3.textContent = "Stock";
const th4 = document.createElement("th");
th4.textContent = "Acciones";
header.appendChild(th1);
header.appendChild(th2);
header.appendChild(th3);
header.appendChild(th4);

handleTraerMateriales();

export { tabla };