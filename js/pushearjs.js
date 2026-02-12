import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const empleados = [
  { "name": "Pedro", "salary": 5000 },
  { "name": "Analia", "salary": 6000 },
  { "name": "Ana", "salary": 7000 },
  { "name": "Franco", "salary": 8000 },
  { "name": "Pablo", "salary": 9000 },
  { "name": "Santiago", "salary": 10000 },
  { "name": "Paola", "salary": 11000 }
]

const handleAddEmpleados = async () => {
  try {
    const addEmpleadosCollection = collection(db, "employees");
    
    for (const empleado of empleados) {
      await addDoc(addEmpleadosCollection, empleado);
      console.log(`Empleado ${empleado.name} agregado correctamente.`);
    }
    
    console.log("¡Todos los empleados fueron agregados exitosamente!");
  } catch (error) {
    console.error("Error al agregar empleados: ", error);
  }
};

// COMENTO LA FUNCION PORQUE SINO ME CARGA SIEMPRE LOS EMPLEADOS EN LA BASE DE DATOS, 
// Y NO QUIERO QUE SE DUPLIQUEN CADA VEZ QUE CARGO LA PAGINA
// handleAddEmpleados();

