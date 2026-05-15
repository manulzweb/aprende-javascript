// Con var
var nombre // declaración (undefined)
nombre = "Pedro" // asignación 
nombre = "Maria" // reasignación 
var nombre = "Cesar" // redeclaración y reasignación 

// Con let
let nombre // declaración (undefined) 
nombre = "Pedro" // asignación 
nombre = "Maria" // reasignación 
let nombre = "Cesar" // SyntaxError: Identifier 'nombre' has already been declared. 

// Con const 
const nombre // SyntaxError: Missing initializer in const declaration. 
const nombre = "Pedro" // declaración y asignación 
nombre = "Maria" // TypeError: Assignment to constant variable.
const nombre = "Cesar" // SyntaxError: Identifier 'nombre' has already been declared.