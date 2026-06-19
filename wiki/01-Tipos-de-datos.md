# 01 · Tipos de datos

Todo valor en JavaScript tiene un **tipo**. Se dividen en dos grandes
grupos: **primitivos** y **por referencia** (objetos). Entender la
diferencia es clave para evitar errores muy comunes.

📂 Archivos del módulo: `01-tipos-de-datos/`

## Tipos primitivos — `1-primitivos.js`

Son valores simples e **inmutables**. Hay 7:

```js
let texto    = "Hola";        // string
let numero   = 42;            // number (enteros y decimales)
let grande   = 9007199254740991n; // bigint
let activo   = true;          // boolean
let nada     = null;          // null (ausencia intencional de valor)
let indefinido;               // undefined (sin asignar)
let id       = Symbol("id");  // symbol (identificador único)
```

Puedes consultar el tipo con `typeof`:

```js
typeof "Hola";  // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
typeof undefined;// "undefined"
typeof null;     // "object"  ❗ (un bug histórico de JS, recuérdalo)
```

## Tipos por referencia — `2-referencia.js`

Son los **objetos**: `object`, `array`, `function`, etc. No guardan el
valor directamente, sino una **referencia** (una "dirección") al lugar
en memoria donde vive.

```js
const persona = { nombre: "Ana" }; // objeto
const numeros = [1, 2, 3];          // array (también es un objeto)
```

## ⚠️ La diferencia que causa más bugs

**Primitivos se copian por VALOR. Objetos se copian por REFERENCIA.**

```js
// Primitivo: se copia el valor. Son independientes.
let a = 10;
let b = a;
b = 99;
console.log(a); // 10 ✅ (a no cambió)

// Objeto: se copia la referencia. ¡Apuntan al MISMO objeto!
let obj1 = { valor: 10 };
let obj2 = obj1;
obj2.valor = 99;
console.log(obj1.valor); // 99 ❗ (cambió obj1 también)
```

Por eso comparar objetos por igualdad NO compara su contenido:

```js
{ x: 1 } === { x: 1 }; // false ❗ (son dos objetos distintos en memoria)
```

## Cómo copiar un objeto de verdad

```js
const original = { a: 1, b: 2 };

const copia = { ...original };        // copia superficial (spread)
const copia2 = Object.assign({}, original);
const copiaProfunda = structuredClone(original); // copia profunda (moderno)
```

## Conversión de tipos (coerción)

JavaScript convierte tipos automáticamente, a veces de forma sorprendente:

```js
"5" + 1;   // "51"  (el + concatena si hay un string)
"5" - 1;   // 4     (el - fuerza a número)
Number("5"); // 5   (conversión explícita, recomendada)
String(5);   // "5"
Boolean(0);  // false
```

## ✅ Resumen

- **Primitivos** (`string`, `number`, `boolean`, `null`, `undefined`,
  `bigint`, `symbol`): se copian por **valor**, son inmutables.
- **Referencia** (objetos, arrays, funciones): se copian por
  **referencia**, dos variables pueden apuntar al mismo dato.
- Usa `typeof` para inspeccionar, y `structuredClone`/spread para copiar.

---
⬅️ [00 · Variables](00-Variables) · ➡️ [02 · Operadores](02-Operadores)
