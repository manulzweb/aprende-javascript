// global scope (alcance global): Las variables declaradas con 'let' en el cuerpo principal del script existen en todo el script.
// function scope (alcance de función): Las variables declaradas con 'let' dentro de una función solo existen dentro de esa función.
// block scope (alcance de bloque): Las variables declaradas con 'let' solo existen dentro del bloque donde fueron declaradas.

let nombre = "Manuel" // declarar y asignar de manera global
let edad = 20
let hobbie = "Jugar videojuegos"

console.log("Info 1 (declaracion y asignacion):");
console.log(`${nombre} | ${edad} | ${hobbie}`); // Usamos Template Literals (``)

// Intentar re-declarar la misma variable en el mismo scope da error con let:
// let nombre = "Luis"; // ERROR: SyntaxError: Identifier 'nombre' has already been declared

nombre = "Luis" // re-asignamos el valor
edad = 25
hobbie = "Futbol"

console.log("\nInfo 2 (re-asignacion): ")
console.log(`${nombre} | ${edad} | ${hobbie}`);

// Block Scope (Alcance de bloque) de las variables con 'let'
if (true) {
    // Al usar 'let' aquí adentro, NO estamos re-declarando la de afuera. 
    // Creamos NUEVAS variables locales que existen solo en este bloque { } (Shadowing).
    let nombre = "Carlos" 
    let edad = 30 
    let hobbie = "Vender bolis" 
    console.log("\nInfo 3 (dentro del if):");
    console.log(`${nombre} | ${edad} | ${hobbie}`);
}

console.log("\nInfo 4 (fuera del if):");
console.log(`${nombre} | ${edad} | ${hobbie}`); // Conservan los valores globales (Juan, 25, Futbol)

// Global Scope de las variables con 'let'
nombre = "Pedro" // re-asignamos la variable global
edad = 50 
hobbie = "Cantar" 

console.log("\nInfo 5 (re-asignacion global):");
console.log(`${nombre} | ${edad} | ${hobbie}`);


// Function Scope (Alcance de funcion) de las variables con 'let'
function mostrarInfo() {
    let nombre = "Maria" // Nueva variable local, existe solo dentro de esta función
    let edad = 40 
    let hobbie = "Pintar" 
    console.log("\nInfo 6 (dentro de function):");
    console.log(`${nombre} | ${edad} | ${hobbie}`);
}

mostrarInfo();

console.log("\nInfo 7 (fuera de function):");
console.log(`${nombre} | ${edad} | ${hobbie}`);