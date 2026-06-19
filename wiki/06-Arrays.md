# 06 · Arrays

Un **array** es una lista ordenada de valores. Sirve para guardar
colecciones: una lista de tareas, los usuarios de una app, etc. Sus
métodos son de lo más usado en el día a día de JavaScript.

📂 Archivos del módulo: `06-arrays/`

## Creación — `1-creacion.js`

```js
const frutas = ["🍎", "🍌", "🍊"]; // literal (lo normal)
const vacio = [];
const numeros = Array.of(1, 2, 3);
const repetido = Array(3).fill(0);  // [0, 0, 0]

frutas.length;   // 3 (cantidad de elementos)
frutas[0];        // "🍎" (los índices empiezan en 0)
frutas[frutas.length - 1]; // último elemento
frutas.at(-1);    // "🍊" (forma moderna de leer desde el final)
```

## Métodos básicos — `2-metodos-basicos.js`

### Que MODIFICAN el array original (mutables) ⚠️

```js
const a = [1, 2, 3];
a.push(4);     // añade al final     -> [1,2,3,4]
a.pop();        // quita del final    -> [1,2,3]
a.unshift(0);   // añade al inicio    -> [0,1,2,3]
a.shift();      // quita del inicio   -> [1,2,3]
a.splice(1, 1); // quita en posición  -> [1,3]
```

### Que NO modifican (devuelven uno nuevo) ✅

```js
const b = [1, 2, 3];
b.slice(0, 2);       // [1, 2]  (copia un trozo)
b.concat([4, 5]);    // [1,2,3,4,5]
[...b, 4];            // [1,2,3,4]  (spread, muy usado)
b.includes(2);       // true
b.indexOf(3);        // 2
b.join(" - ");       // "1 - 2 - 3"
```

## Iteración y transformación — `3-iteracion.js`

Estos métodos de **orden superior** (reciben una función) son la forma
moderna de trabajar con arrays. Casi nunca necesitarás un `for` clásico.

```js
const nums = [1, 2, 3, 4, 5];

// forEach: ejecuta algo por cada elemento (no devuelve nada)
nums.forEach(n => console.log(n));

// map: transforma cada elemento -> nuevo array del mismo tamaño
nums.map(n => n * 2);            // [2, 4, 6, 8, 10]

// filter: deja solo los que cumplen la condición
nums.filter(n => n % 2 === 0);   // [2, 4]

// reduce: combina todo en un solo valor (suma, máximo, objeto...)
nums.reduce((total, n) => total + n, 0); // 15

// find / findIndex: el primero que cumple
nums.find(n => n > 3);           // 4

// some / every: ¿alguno? / ¿todos?
nums.some(n => n > 4);           // true
nums.every(n => n > 0);          // true

// sort: ordena (¡cuidado, MUTA y ordena como texto por defecto!)
[3, 1, 10, 2].sort((a, b) => a - b); // [1, 2, 3, 10]
```

### Encadenar métodos (muy potente)

```js
const productos = [
  { nombre: "Pan", precio: 1 },
  { nombre: "Leche", precio: 2 },
  { nombre: "Café", precio: 5 },
];

const total = productos
  .filter(p => p.precio >= 2)   // Leche y Café
  .map(p => p.precio)            // [2, 5]
  .reduce((t, p) => t + p, 0);   // 7
```

## ⚠️ Mutable vs inmutable

Modificar arrays sin querer es una fuente clásica de bugs. Prefiere los
métodos **inmutables**:

```js
// ❌ muta el original
lista.push(nuevo);
lista.sort();

// ✅ crea uno nuevo (no toca el original)
const nueva = [...lista, nuevo];
const ordenada = [...lista].sort((a, b) => a - b);
const sinPrimero = lista.slice(1);
```

> 💡 Métodos modernos inmutables: `toSorted()`, `toReversed()`,
> `toSpliced()`, `with()` hacen lo mismo que sus versiones mutables pero
> devolviendo un array nuevo.

## ✅ Resumen

- Lista ordenada, índices desde 0; `.length` y `.at(-1)`.
- Mutables (`push`, `pop`, `splice`, `sort`) cambian el original.
- Inmutables (`slice`, `concat`, spread) devuelven uno nuevo.
- **`map`, `filter`, `reduce`** son los métodos estrella; se encadenan.
- Prefiere lo inmutable para evitar efectos secundarios.

---
⬅️ [05 · Objetos](05-Objetos) · ➡️ [07 · Asincronía](07-Asincronia)
