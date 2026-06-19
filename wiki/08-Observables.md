# 08 · Observables y programación reactiva

Módulo avanzado. Damos el salto de la asincronía "clásica"
([módulo 07](07-Asincronia)) a la **programación reactiva**: trabajar
con *flujos de valores que llegan a lo largo del tiempo* (streams).

La idea de fondo es pasar del modelo **pull** ("yo pregunto: ¿ya hay
datos?") al modelo **push** ("me avisan cuando hay datos"). Reaccionas
a eventos en lugar de perseguirlos.

📂 Archivos del módulo: `08-observables/`

> 💡 Si dominas `array.map().filter()` ([módulo 06](06-Arrays)), ya
> entiendes el 80% de los observables: es lo mismo, pero sobre valores
> que llegan **con el tiempo** en vez de una lista que ya tienes.

## Requisitos previos

- [04 · Funciones](04-Funciones) (closures)
- [06 · Arrays](06-Arrays) (`map`, `filter`, `reduce`)
- [07 · Asincronía](07-Asincronia) (promesas, async/await)

## 1. El patrón Observer — `1-patron-observer.js`

La base de todo. Un **sujeto** mantiene una lista de **observadores** y
los notifica cuando algo cambia (como suscribirse a un canal: te avisan,
tú no preguntas).

```js
class Subject {
  constructor() { this.observers = []; }
  subscribe(obs) {
    this.observers.push(obs);
    return () => { // función para desuscribirse (evita fugas de memoria)
      this.observers = this.observers.filter(o => o !== obs);
    };
  }
  next(valor) { this.observers.forEach(o => o(valor)); }
}
```

- `subscribe()` = "quiero enterarme".
- `next()` = "ha pasado algo, aviso a todos".
- la función de desuscripción = "ya no quiero enterarme".

## 2. Un Observable de verdad — `2-observable-desde-cero.js`

Un Observable maneja **tres** notificaciones:

- `next(valor)` → un valor (0..N veces).
- `error(err)` → algo falló, termina.
- `complete()` → no habrá más valores, termina.

Dos propiedades clave frente a una promesa:

- **Lazy (perezoso):** no hace nada hasta que alguien se `subscribe`
  (una promesa se ejecuta al crearse).
- **Multi-valor:** emite muchos valores en el tiempo (una promesa, uno).
- **Cancelable:** `unsubscribe()` detiene el flujo y limpia recursos.

```js
const reloj$ = new Observable((observer) => {
  let s = 0;
  const id = setInterval(() => observer.next(++s), 1000);
  return () => clearInterval(id); // limpieza al desuscribirse
});

const sub = reloj$.subscribe(s => console.log("tic", s));
// sub.unsubscribe(); // para y limpia el intervalo
```

> 📝 Convención: los streams se nombran con `$` al final (`reloj$`,
> `clicks$`, `user$`).

## 3. Operadores — `3-operadores.js`

Funciones puras que transforman un observable en otro, encadenadas con
`pipe()`. Son `map`/`filter`/`reduce`... pero sobre el tiempo.

```js
of(1, 2, 3, 4, 5, 6)
  .pipe(
    filter(x => x % 2 === 0), // 2, 4, 6
    map(x => x * 10),          // 20, 40, 60
    take(2)                    // 20, 40 (y completa)
  )
  .subscribe(v => console.log(v));
```

## 4. Subjects — `4-subjects.js`

Un **Subject** es Observable *y* Observer a la vez: un "multiplicador"
(multicast) ideal como bus de eventos o estado compartido.

- **`Subject`**: reparte valores; quien llega tarde se pierde lo anterior.
  → eventos puntuales (clicks, notificaciones).
- **`BehaviorSubject`**: guarda el último valor y se lo da de inmediato a
  cada nuevo suscriptor. → estado "actual" (usuario, tema, carrito).

```js
const tema = new BehaviorSubject("claro");
tema.subscribe(t => console.log("A:", t)); // recibe "claro" ya
tema.next("oscuro");                         // todos reaccionan
tema.getValue();                             // "oscuro"
```

> **Cold vs Hot:** un Observable normal es *cold* (cada suscriptor tiene
> su propia ejecución); un Subject es *hot* (una fuente compartida).

## 5. RxJS en la práctica — `5-rxjs-en-la-practica.js`

En el mundo real usas **[RxJS](https://rxjs.dev/)**, la librería estándar
(es el corazón de Angular).

```bash
npm install rxjs
```

```js
// Buscador en vivo: el patrón más típico de RxJS
cajaBusqueda$.pipe(
  debounceTime(300),       // espera a que deje de teclear
  distinctUntilChanged(),  // ignora si el texto no cambió
  switchMap(texto => buscarEnApi(texto)) // cancela la búsqueda anterior
).subscribe(pintarResultados);
```

### Operadores para "aplanar" observables (los más avanzados)

| Operador | Comportamiento | Caso típico |
|----------|----------------|-------------|
| `switchMap` | Cancela el anterior | Buscadores, autocompletado |
| `mergeMap` | Todos en paralelo | Subir varios archivos |
| `concatMap` | Uno tras otro, en orden | Operaciones que no deben pisarse |
| `exhaustMap` | Ignora nuevos si hay uno activo | Evitar doble click en "enviar" |

### Chuleta de operadores

- **Transformar:** `map`, `scan`, `pluck`
- **Filtrar:** `filter`, `take`, `takeUntil`, `distinctUntilChanged`
- **Tiempo:** `debounceTime`, `throttleTime`, `delay`, `interval`, `timer`
- **Combinar:** `combineLatest`, `merge`, `zip`, `forkJoin`
- **Errores:** `catchError`, `retry`
- **Depurar:** `tap`

## 6. Observables vs Promesas — `6-observables-vs-promesas.js`

| | Promesa | Observable |
|---|---|---|
| ¿Cuántos valores? | Uno solo | 0, 1 o muchos |
| ¿Cuándo arranca? | Al crearla (eager) | Al suscribirte (lazy) |
| ¿Cancelable? | No | Sí (`unsubscribe`) |
| Operadores | `then`/`catch` | ~100 (`map`, `switchMap`...) |

**Regla práctica:**
- Un resultado puntual (una petición HTTP) → **promesa / async-await**.
- Muchos valores en el tiempo (clicks, teclas, websockets, datos en
  vivo) o necesitas cancelar → **observable**.

## Cómo ejecutar

Los archivos **1, 2, 3, 4 y 6** funcionan con Node.js puro:

```bash
cd 08-observables
node 1-patron-observer.js
```

El **5** necesita RxJS: `npm install rxjs && node 5-rxjs-en-la-practica.js`

## Para profundizar

- [Documentación oficial de RxJS](https://rxjs.dev/)
- [RxMarbles](https://rxmarbles.com/) — operadores visualizados
- [Learn RxJS](https://www.learnrxjs.io/) — recetario de operadores

---
⬅️ [07 · Asincronía](07-Asincronia) · 🏠 [Inicio](Home)
