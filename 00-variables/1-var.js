// global scope: Las variables declaradas con 'var' existen en todo el script.
// function scope: Las variables declaradas con 'var' dentro de una función solo existen allí.
// SIN block scope: 'var' IGNORA los bloques {} (como if o for), las variables "escapan".

var a; // declaramos (inicia como undefined)
console.log(`Tipo de 'a' inicial: ${typeof (a)}`);

var b = "b"; // declaramos y asignamos. Recordemos que el signo = es para asignación
b = "bb"; // reasignacion
var a = "a"; // REDECLARAMOS y asignamos ('let' no permite esto, pero 'var' sí)

console.log(`Tipo de 'a' despues: ${typeof (a)}`);

console.log("\n--- Comportamiento del Scope con var ---");

// 1. SIN Block Scope (Ignora los bloques { })
var heroe = "Batman";
if (true) {
    var heroe = "Superman";
    console.log(`Dentro del if el heroe es: ${heroe}`);
}
console.log(`Fuera del if el heroe es: ${heroe}`);

// 2. Function Scope
function mostrarScope() {
    var villano = "Joker";
    console.log(`Dentro de la función el villano es: ${villano}`);
}
mostrarScope();
// console.log(villano); // ERROR: villano is not defined. (var sí respeta las funciones)

// 3. Hoisting (Elevación)
console.log("\n--- Hoisting ---");
// Puedes intentar imprimir una variable antes de declararla.
// Con 'let' esto daría un error (Temporal Dead Zone).
// Con 'var', JavaScript lo lee pero dice que es 'undefined'.
console.log(`Valor de 'numero' antes de declararlo: ${numero}`);
var numero = 21;
console.log(`Valor de 'numero' despues de declararlo: ${numero}`);
