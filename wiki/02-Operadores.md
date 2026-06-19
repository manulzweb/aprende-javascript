# 02 · Operadores

Los **operadores** son símbolos que realizan operaciones sobre valores
(operandos): sumar, comparar, asignar, combinar condiciones, etc.

📂 Archivos del módulo: `02-operadores/`

## Aritméticos — `1-aritmeticos.js`

```js
5 + 2   // 7   suma
5 - 2   // 3   resta
5 * 2   // 10  multiplicación
5 / 2   // 2.5 división
5 % 2   // 1   módulo (resto de la división)
5 ** 2  // 25  potencia

let n = 5;
n++;    // incremento (n pasa a 6)
n--;    // decremento (n pasa a 5)
```

> 💡 El módulo `%` es muy útil: `n % 2 === 0` indica que `n` es par.

## Asignación — `2-asignacion.js`

Asignan (y a la vez operan) sobre una variable.

```js
let x = 10;
x += 5;  // x = x + 5  -> 15
x -= 3;  // x = x - 3  -> 12
x *= 2;  // x = x * 2  -> 24
x /= 4;  // x = x / 4  -> 6
x **= 2; // x = x ** 2 -> 36

// Asignaciones lógicas (modernas)
let a = null;
a ??= "valor por defecto"; // asigna solo si a es null/undefined
```

## Comparación — `3-comparacion.js`

Devuelven un booleano (`true` / `false`).

```js
5 == "5"   // true  ❗ compara solo el valor (con coerción)
5 === "5"  // false ✅ compara valor Y tipo (estricto)
5 != "5"   // false
5 !== "5"  // true

5 > 3      // true
5 >= 5     // true
3 < 5      // true
```

> ⚠️ **Regla de oro:** usa SIEMPRE `===` y `!==` (estrictos).
> El `==` hace conversiones automáticas que provocan bugs raros:
> ```js
> 0 == "";      // true  😵
> null == undefined; // true
> [] == false;  // true  😵
> ```

## Lógicos — `4-logicos.js`

Combinan condiciones booleanas.

```js
true && false  // false  AND  (verdadero si AMBOS lo son)
true || false  // true   OR   (verdadero si AL MENOS uno lo es)
!true          // false  NOT  (niega)
```

### Trucos muy usados

```js
// Valor por defecto con || (cuidado: 0 y "" cuentan como "falsos")
const nombre = entrada || "Anónimo";

// ?? solo cae al default si es null/undefined (más seguro)
const cantidad = valor ?? 0;

// Encadenamiento opcional ?. evita errores si algo es null/undefined
const ciudad = usuario?.direccion?.ciudad; // undefined en vez de error
```

## Valores "truthy" y "falsy"

En contextos booleanos, estos valores se consideran **falsy** (falsos):

```
false, 0, "", null, undefined, NaN
```

**Todo lo demás es truthy** (incluidos `"0"`, `[]` y `{}`).

## ✅ Resumen

- Aritméticos para calcular; recuerda `%` y `**`.
- Asignación combinada (`+=`, `??=`) para escribir menos.
- **Compara siempre con `===`**, nunca con `==`.
- Lógicos `&&`, `||`, `!`; y los modernos `??` y `?.`.

---
⬅️ [01 · Tipos de datos](01-Tipos-de-datos) · ➡️ [03 · Control de flujo](03-Control-de-flujo)
