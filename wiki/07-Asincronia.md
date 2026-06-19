# 07 · Asincronía

JavaScript es **monohilo**: solo hace una cosa a la vez. La asincronía
permite que tareas que tardan (pedir datos a un servidor, leer un
archivo, un temporizador) **no bloqueen** el resto del programa. En
lugar de "esperar parado", JavaScript sigue y reacciona cuando la tarea
termina.

📂 Archivos del módulo: `07-asincronia/`

## Síncrono vs asíncrono

```js
console.log("1");
setTimeout(() => console.log("2"), 0); // se aplaza
console.log("3");
// Imprime: 1, 3, 2  ❗ el setTimeout no bloquea
```

El truco está en el **Event Loop**: las tareas asíncronas se apartan y
se ejecutan cuando el hilo principal queda libre.

## 1. Callbacks — `1-callbacks.js`

La forma más antigua: pasas una función que se ejecutará "cuando esté
listo".

```js
function pedirDatos(callback) {
  setTimeout(() => {
    callback("datos recibidos");
  }, 1000);
}

pedirDatos((resultado) => {
  console.log(resultado);
});
```

### El "Callback Hell" 😱

Cuando encadenas muchas operaciones, los callbacks se anidan y el código
se vuelve ilegible:

```js
login(usuario, (sesion) => {
  obtenerPerfil(sesion, (perfil) => {
    obtenerAmigos(perfil, (amigos) => {
      // ...cada vez más a la derecha 😵
    });
  });
});
```

Las promesas nacieron para resolver esto.

## 2. Promesas — `2-promesas.js`

Una **Promesa** es un objeto que representa un valor que estará
disponible **en el futuro**. Tiene 3 estados: *pending* (pendiente),
*fulfilled* (resuelta) o *rejected* (rechazada).

```js
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  if (exito) {
    resolve("✅ todo bien");
  } else {
    reject("❌ algo falló");
  }
});

promesa
  .then(resultado => console.log(resultado))  // si resolve
  .catch(error => console.log(error))         // si reject
  .finally(() => console.log("termina siempre"));
```

### Encadenar (adiós al callback hell)

```js
login(usuario)
  .then(sesion => obtenerPerfil(sesion))
  .then(perfil => obtenerAmigos(perfil))
  .then(amigos => console.log(amigos))
  .catch(error => console.log("Error:", error)); // un solo catch para todo
```

### Combinar varias promesas

```js
// Todas en paralelo; espera a TODAS (falla si una falla)
Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => { /* ... */ });

// La primera que termine (resuelva o rechace)
Promise.race([p1, p2]);

// Todas, con su resultado o error individual (nunca falla)
Promise.allSettled([p1, p2]);
```

## 3. async / await — `3-async-await.js`

Azúcar sintáctico sobre las promesas. Permite escribir código
asíncrono que **se lee como si fuera síncrono**. Es la forma moderna
recomendada.

```js
async function cargarUsuario() {
  try {
    const sesion = await login(usuario);    // "espera" sin bloquear
    const perfil = await obtenerPerfil(sesion);
    const amigos = await obtenerAmigos(perfil);
    return amigos;
  } catch (error) {
    console.log("Error:", error);
  }
}
```

- `async` convierte una función en asíncrona (siempre devuelve una promesa).
- `await` pausa la función hasta que la promesa se resuelva.
- Usa `try/catch` para manejar errores (en vez de `.catch()`).

### Ejemplo real con `fetch`

```js
async function obtenerUsuarios() {
  const respuesta = await fetch("https://api.example.com/users");
  if (!respuesta.ok) throw new Error("Error en la petición");
  const datos = await respuesta.json();
  return datos;
}
```

### Paralelo dentro de async/await

```js
// ❌ lento: en serie (uno tras otro)
const a = await tareaA();
const b = await tareaB();

// ✅ rápido: en paralelo
const [a, b] = await Promise.all([tareaA(), tareaB()]);
```

## ✅ Resumen

| Técnica | Pros | Contras |
|---------|------|---------|
| Callbacks | Simple para 1 tarea | "Callback hell" al anidar |
| Promesas | Encadenables, un solo catch | Sintaxis algo verbosa |
| async/await | Se lee como síncrono | Recuerda `try/catch` y paralelizar |

➡️ El siguiente módulo, [Observables](08-Observables), va un paso más
allá: en vez de **un** valor futuro, maneja **flujos** de muchos valores
a lo largo del tiempo.

---
⬅️ [06 · Arrays](06-Arrays) · ➡️ [08 · Observables](08-Observables)
