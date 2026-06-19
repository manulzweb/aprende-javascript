# 04 · Funciones

Una **función** es un bloque de código reutilizable que realiza una
tarea. Recibe datos (parámetros), hace algo y normalmente devuelve un
resultado. Son el corazón de cualquier programa en JavaScript.

📂 Archivos del módulo: `04-funciones/`

## Declaración de función — `1-declaracion.js`

La forma clásica. Tiene *hoisting*: puedes llamarla antes de definirla.

```js
function sumar(a, b) {
  return a + b;
}

sumar(2, 3); // 5
```

- `a` y `b` son **parámetros** (lo que la función espera recibir).
- `2, 3` son **argumentos** (los valores reales que le pasas).
- `return` devuelve un valor y termina la función.

## Expresión de función — `2-expresion.js`

Una función guardada en una variable. NO tiene hoisting (debes
definirla antes de usarla).

```js
const multiplicar = function (a, b) {
  return a * b;
};

multiplicar(2, 3); // 6
```

## Arrow functions (=>) — `3-arrow-functions.js`

Sintaxis moderna y corta. Muy usadas, sobre todo con métodos de arrays.

```js
const sumar = (a, b) => a + b;        // return implícito
const cuadrado = x => x * x;           // un solo parámetro: sin paréntesis
const saludar = () => "Hola";          // sin parámetros

// Con cuerpo de varias líneas necesitas { } y return explícito
const dividir = (a, b) => {
  if (b === 0) return "No se puede dividir entre 0";
  return a / b;
};
```

> ⚠️ **Diferencia clave:** las arrow functions NO tienen su propio
> `this`; heredan el del contexto donde se definieron. Por eso son
> ideales para callbacks, pero NO para métodos de objeto que necesiten
> `this`.

## Parámetros: valores por defecto y rest

```js
// Valor por defecto
function saludar(nombre = "amigo") {
  return `Hola, ${nombre}`;
}
saludar();        // "Hola, amigo"
saludar("Ana");   // "Hola, Ana"

// Rest: agrupa argumentos sobrantes en un array
function sumarTodos(...numeros) {
  return numeros.reduce((total, n) => total + n, 0);
}
sumarTodos(1, 2, 3, 4); // 10
```

## Closures (clausuras) 🔑

Un **closure** ocurre cuando una función "recuerda" las variables del
lugar donde fue creada, aunque ese lugar ya haya terminado de ejecutarse.
Es un concepto fundamental de JavaScript.

```js
function crearContador() {
  let cuenta = 0; // variable "privada"
  return function () {
    cuenta++;
    return cuenta;
  };
}

const contador = crearContador();
contador(); // 1
contador(); // 2  ❗ recuerda el valor anterior
```

Los closures permiten tener **estado privado** y son la base de muchos
patrones (módulos, memorización, manejadores de eventos).

## Funciones de orden superior

Funciones que reciben o devuelven otras funciones. Es lo que hace
posible `map`, `filter`, etc.

```js
function aplicar(fn, valor) {
  return fn(valor);
}
aplicar(x => x * 2, 5); // 10
```

## ✅ Resumen

- 3 formas de crear funciones: declaración, expresión y arrow.
- `return` devuelve el resultado; sin él, la función devuelve `undefined`.
- Parámetros por defecto y `...rest` para flexibilidad.
- **Closures**: funciones que recuerdan su entorno → estado privado.
- Las funciones son "ciudadanos de primera clase": se pasan como datos.

---
⬅️ [03 · Control de flujo](03-Control-de-flujo) · ➡️ [05 · Objetos](05-Objetos)
