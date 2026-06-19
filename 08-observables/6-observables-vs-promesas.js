/**
 * ============================================================
 *  6. OBSERVABLES vs PROMESAS (¿cuándo uso cada uno?)
 * ============================================================
 *
 * En el módulo 07-asincronia viste callbacks, promesas y async/await.
 * Los observables NO los reemplazan: cubren un caso distinto.
 *
 *  ┌───────────────────┬──────────────────┬───────────────────────┐
 *  │                   │ PROMESA          │ OBSERVABLE            │
 *  ├───────────────────┼──────────────────┼───────────────────────┤
 *  │ ¿Cuántos valores? │ Uno solo         │ 0, 1 o muchos (stream)│
 *  │ ¿Cuándo arranca?  │ Al crearla (eager)│ Al suscribirte (lazy) │
 *  │ ¿Se puede cancelar?│ No (de serie)   │ Sí (unsubscribe)      │
 *  │ ¿Operadores?      │ then/catch       │ ~100 (map, filter...) │
 *  │ ¿Re-ejecutable?   │ No               │ Sí (cada subscribe)   │
 *  └───────────────────┴──────────────────┴───────────────────────┘
 *
 * Regla práctica:
 *   - UN resultado puntual (una petición HTTP, leer un archivo)
 *       -> Promesa / async-await. Más simple, suficiente.
 *   - MUCHOS valores en el tiempo (clicks, teclas, websockets,
 *     posición del ratón, datos en vivo) o necesitas CANCELAR
 *       -> Observable.
 */

// ------------------------------------------------------------
// Demostración 1: EAGER (promesa) vs LAZY (observable)
// ------------------------------------------------------------
console.log("--- Eager vs Lazy ---");

// La promesa ejecuta su cuerpo YA, aunque nadie haga .then().
const promesa = new Promise((resolve) => {
  console.log("⚡ La promesa se ejecuta inmediatamente (eager)");
  resolve(42);
});

// El observable NO ejecuta nada hasta que alguien se suscribe.
class MiniObservable {
  constructor(fn) { this.fn = fn; }
  subscribe(next) { return this.fn({ next }); }
}

const observable = new MiniObservable((obs) => {
  console.log("😴 Este texto NO aparece... hasta que haya subscribe()");
  obs.next(42);
});

console.log("(observable creado, pero todavía no se suscribió nadie)");
console.log("Ahora sí nos suscribimos:");
observable.subscribe((v) => console.log("observable emitió:", v));

// ------------------------------------------------------------
// Demostración 2: convertir entre los dos mundos
// ------------------------------------------------------------
// En RxJS real:
//    from(promesa)               // Promesa  -> Observable
//    firstValueFrom(observable)  // Observable -> Promesa
//
// Es decir, no estás obligado a elegir para siempre: puedes pasar
// de uno a otro según lo que necesites en cada momento.

// ------------------------------------------------------------
// Demostración 3: lo que una promesa NO puede hacer fácilmente
// ------------------------------------------------------------
console.log("\n--- Un stream de varios valores (imposible con 1 promesa) ---");

const tecla$ = new MiniObservable((obs) => {
  // Simulamos pulsaciones de teclado a lo largo del tiempo.
  const teclas = ["h", "o", "l", "a"];
  teclas.forEach((t, i) => {
    setTimeout(() => obs.next(t), (i + 1) * 300);
  });
});

let palabra = "";
tecla$.subscribe((t) => {
  palabra += t;
  console.log(`tecla: ${t}  ->  palabra: "${palabra}"`);
});
// Una sola Promesa solo podría entregarte UNA tecla y terminar.

/**
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  node 6-observables-vs-promesas.js
 * ------------------------------------------------------------
 *
 *  RESUMEN PARA RECORDAR:
 *  - No es "observables MEJOR que promesas". Es "cada uno para lo suyo".
 *  - Empieza con async/await (más simple). Pasa a observables cuando
 *    tengas flujos continuos, necesites cancelar, o quieras combinar
 *    varias fuentes de eventos con operadores.
 *  - Si dominas array.map/filter/reduce, ya entiendes el 80% de RxJS:
 *    es lo mismo pero "sobre el tiempo".
 */
