# 08 - Observables y Programación Reactiva

Módulo avanzado. Aquí damos el salto de la asincronía "clásica"
(callbacks, promesas, async/await del módulo `07-asincronia`) a la
**programación reactiva**: trabajar con *flujos de valores que llegan
a lo largo del tiempo* (streams).

La idea de fondo es pasar del modelo **pull** ("yo pregunto: ¿ya hay
datos?") al modelo **push** ("me avisan cuando hay datos"). Reaccionas
a eventos en lugar de perseguirlos.

## Requisitos previos

- Funciones y closures (`04-funciones`)
- Métodos de arrays: `map`, `filter`, `reduce` (`06-arrays`)
- Promesas y async/await (`07-asincronia`)

> 💡 Si dominas `array.map().filter()`, ya entiendes el 80% de los
> observables: es lo mismo, pero aplicado a valores que llegan **con el
> tiempo** en vez de a una lista que ya tienes en memoria.

## Contenido y orden recomendado

| # | Archivo | Qué aprendes |
|---|---------|--------------|
| 1 | `1-patron-observer.js` | El patrón Observer: la base de todo (subscribe / next / unsubscribe) |
| 2 | `2-observable-desde-cero.js` | Construir un Observable real: next/error/complete, *lazy*, limpieza |
| 3 | `3-operadores.js` | Operadores (`map`, `filter`, `take`) y `pipe()` hechos a mano |
| 4 | `4-subjects.js` | `Subject` y `BehaviorSubject`: multicast y estado compartido |
| 5 | `5-rxjs-en-la-practica.js` | RxJS, la librería real: `switchMap`, `debounceTime`, `catchError`... |
| 6 | `6-observables-vs-promesas.js` | Cuándo usar cada uno (eager vs lazy, uno vs muchos) |

## Cómo ejecutar

Los archivos **1, 2, 3, 4 y 6** funcionan con Node.js puro, sin instalar nada:

```bash
node 1-patron-observer.js
node 2-observable-desde-cero.js
node 3-operadores.js
node 4-subjects.js
node 6-observables-vs-promesas.js
```

El archivo **5** usa la librería real RxJS:

```bash
npm install rxjs
node 5-rxjs-en-la-practica.js
```

## Conceptos clave que te llevas

- **Observable**: receta *lazy* que produce 0..N valores cuando alguien
  se suscribe.
- **Observer**: el objeto `{ next, error, complete }` que reacciona.
- **Observable Contract**: tras `error` o `complete`, no se emite más.
- **unsubscribe**: cancelar para evitar fugas de memoria (timers,
  listeners, peticiones).
- **Operadores**: funciones puras que transforman un observable en otro
  (`map`, `filter`, `switchMap`...), encadenadas con `pipe()`.
- **Subject / BehaviorSubject**: streams *hot* para eventos y estado
  compartido (la base de muchos gestores de estado).
- **Cold vs Hot**: cada suscriptor con su propia ejecución (cold) vs una
  fuente compartida por todos (hot).

## Para seguir profundizando

- [Documentación oficial de RxJS](https://rxjs.dev/)
- [RxMarbles](https://rxmarbles.com/) — operadores visualizados con diagramas de canicas (muy recomendable)
- [Learn RxJS](https://www.learnrxjs.io/) — recetario de operadores con ejemplos
