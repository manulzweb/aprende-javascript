# 03 · Control de flujo

El **control de flujo** decide qué código se ejecuta y cuántas veces.
Permite que un programa tome decisiones y repita tareas.

📂 Archivos del módulo: `03-control-flujo/`

## `if` / `else if` / `else` — `1-if-else.js`

Ejecuta código según se cumpla o no una condición.

```js
const edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else if (edad >= 13) {
  console.log("Eres adolescente");
} else {
  console.log("Eres niño/a");
}
```

### Operador ternario (un `if/else` corto)

```js
const mensaje = edad >= 18 ? "Adulto" : "Menor";
```

## `switch` — `2-switch.js`

Útil cuando comparas **una variable contra muchos valores fijos**.

```js
const dia = "lunes";

switch (dia) {
  case "lunes":
    console.log("Empieza la semana");
    break; // ❗ sin break, "cae" al siguiente case
  case "sabado":
  case "domingo":
    console.log("Fin de semana");
    break;
  default:
    console.log("Día normal");
}
```

> ⚠️ No olvides el `break` en cada caso, o se ejecutarán los siguientes.

## `for` — `3-for.js`

El bucle clásico: cuando sabes **cuántas veces** repetir.

```js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

Variantes muy útiles para recorrer colecciones:

```js
// for...of -> recorre VALORES (arrays, strings)
for (const fruta of ["🍎", "🍌"]) {
  console.log(fruta);
}

// for...in -> recorre CLAVES (propiedades de un objeto)
for (const clave in { a: 1, b: 2 }) {
  console.log(clave); // "a", "b"
}
```

## `while` y `do...while` — `4-while.js`

Cuando repites **mientras** se cumpla una condición (no sabes cuántas veces).

```js
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}

// do...while ejecuta AL MENOS una vez (comprueba al final)
let intento = 0;
do {
  console.log("intento", intento);
  intento++;
} while (intento < 3);
```

## Romper y saltar: `break` y `continue`

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;     // sale del bucle por completo
  if (i % 2 === 0) continue; // salta a la siguiente vuelta
  console.log(i); // 1, 3
}
```

## ✅ Resumen

- `if/else` para decisiones; ternario `? :` para casos cortos.
- `switch` para muchos valores fijos (recuerda `break`).
- `for` cuando sabes las repeticiones; `for...of`/`for...in` para colecciones.
- `while`/`do...while` cuando dependes de una condición.
- `break` sale del bucle; `continue` salta a la siguiente iteración.

---
⬅️ [02 · Operadores](02-Operadores) · ➡️ [04 · Funciones](04-Funciones)
