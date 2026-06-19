# 00 · Variables

Una **variable** es un nombre que apunta a un valor guardado en memoria.
Es como una caja con etiqueta donde guardas datos para usarlos después.

📂 Archivos del módulo: `00-variables/`

## Declarar una variable

En JavaScript moderno hay tres formas: `var`, `let` y `const`.

```js
var nombre = "Ana";    // forma antigua (evítala)
let edad = 25;          // valor que puede cambiar
const PI = 3.1416;      // valor que NO cambia
```

## `var` (la forma antigua) — `1-var.js`

`var` funciona, pero tiene comportamientos confusos. Hoy casi no se usa.

- Tiene **scope de función** (no respeta los bloques `{ }`).
- Sufre *hoisting*: puedes usarla "antes" de declararla (vale `undefined`).
- Permite re-declararse, lo que provoca errores difíciles de detectar.

```js
function ejemplo() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10  ❗ "se escapa" del if
}
```

## `let` (valores que cambian) — `2-let.js`

`let` es la opción moderna para variables que **van a cambiar**.

- Tiene **scope de bloque**: vive solo dentro de las `{ }` donde se declara.
- No se puede re-declarar en el mismo scope.

```js
let contador = 0;
contador = contador + 1; // ✅ se puede reasignar

if (true) {
  let y = 5;
}
// console.log(y); ❌ Error: y no existe fuera del if
```

## `const` (valores constantes) — `3-const.js`

`const` es para valores que **no se reasignan**. Es la opción por defecto.

```js
const nombre = "Ana";
// nombre = "Luis"; ❌ Error: no se puede reasignar
```

> ⚠️ **Ojo:** `const` impide reasignar, pero NO congela objetos/arrays.
> Su *contenido* sí puede cambiar:
> ```js
> const lista = [1, 2];
> lista.push(3);   // ✅ permitido (la variable sigue apuntando al mismo array)
> // lista = [9];   ❌ esto sí falla
> ```

## 🎯 Regla práctica

1. Usa **`const`** por defecto.
2. Cambia a **`let`** solo si necesitas reasignar el valor.
3. **Nunca uses `var`** en código nuevo.

## ✅ Resumen

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Función | Bloque | Bloque |
| ¿Reasignable? | Sí | Sí | No |
| ¿Re-declarable? | Sí | No | No |
| Recomendado | ❌ | ✅ (si cambia) | ✅ (por defecto) |

---
⬅️ [Inicio](Home) · ➡️ [01 · Tipos de datos](01-Tipos-de-datos)
