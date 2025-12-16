
const employees = [
    { name: "Alice", salary: 5000 },
    { name: "Bob", salary: 6000 },
    { name: "Charlie", salary: 7000 },
    { name: "Diana", salary: 8000 },
];

let op = 1

while (op != 0) {
    const name = prompt("Ingrese el nombre a buscar:");

    const employee = employees.find(emp => emp.name.toLowerCase() === name.toLocaleLowerCase());

    if (employee) {
        alert(`El salario de ${employee.name} es ${employee.salary}`);
    } else {
        alert("Empleado no encontrado");
    }
}