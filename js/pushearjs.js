import { db } from "./firebaseconfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const empleados = [
  { "name": "Pedro", "salary": 5000, "key" : 1234 },
  { "name": "Analia", "salary": 6000, "key" : 5678 },
  { "name": "Ana", "salary": 7000, "key" : 9101 },
  { "name": "Franco", "salary": 8000, "key" : 1121 },
  { "name": "Pablo", "salary": 9000, "key" : 3141 },
  { "name": "Santiago", "salary": 10000, "key" : 5161 },
  { "name": "Paola", "salary": 11000, "key" : 7181 }
]

const materiales = [
  { "name": "Madera", "price": 100, "stock": 50 },
  { "name": "Hierro", "price": 200, "stock": 30 },
  { "name": "Plástico", "price": 50, "stock": 100 },
  { "name": "Vidrio", "price": 150, "stock": 40 },
  { "name": "Aluminio", "price": 120, "stock": 60 },
  { "name": "Cobre", "price": 300, "stock": 20 },
  { "name": "Papel", "price": 20, "stock": 200 }
]

const Salidas = [
  { "name": "Madera", "price": 100, "vendedor": "Franco", "cantidad": 5 },
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

const handleAddMateriales = async () => {
  try {
    const addMaterialesCollection = collection(db, "materials");
    
    for (const material of materiales) {
      await addDoc(addMaterialesCollection, material);
      console.log(`Material ${material.name} agregado correctamente.`);
    }
    
    console.log("¡Todos los materiales fueron agregados exitosamente!");
  } catch (error) {
    console.error("Error al agregar materiales: ", error);
  }
};

const handleAddSalidas = async () => {
  try {
    const addSalidasCollection = collection(db, "salidas");
    for (const salida of Salidas) {
      await addDoc(addSalidasCollection, salida);
      console.log(`Salida de ${salida.name} agregada correctamente.`);
    }
    console.log("¡Todas las salidas fueron agregadas exitosamente!");
  } catch (error) {
    console.error("Error al agregar salidas: ", error);
  }
};

// COMENTO LA FUNCION PORQUE SINO ME CARGA SIEMPRE LOS EMPLEADOS EN LA BASE DE DATOS, 
// Y NO QUIERO QUE SE DUPLIQUEN CADA VEZ QUE CARGO LA PAGINA
//handleAddEmpleados();
//handleAddMateriales();
//handleAddSalidas();

