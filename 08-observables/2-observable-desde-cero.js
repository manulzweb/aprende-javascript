/**
 * ============================================================
 *  2. UN OBSERVABLE DESDE CERO
 * ============================================================
 *
 * En el archivo anterior el Subject solo emitía valores con next().
 * Un OBSERVABLE de verdad maneja TRES tipos de notificación:
 *
 *   - next(valor)  -> "aquí tienes un valor" (puede ocurrir 0..N veces)
 *   - error(err)   -> "algo falló, me detengo" (termina el flujo)
 *   - complete()   -> "ya no habrá más valores" (termina el flujo)
 *
 * A ese objeto con { next, error, complete } se le llama OBSERVER.
 *
 * Diferencias importantes con una Promesa:
 *   - Una Promesa entrega UN solo valor. Un Observable entrega MUCHOS
 *     (un stream / flujo de valores a lo largo del tiempo).
 *   - Una Promesa es "eager": se ejecuta en cuanto la creas.
 *     Un Observable es "lazy" (perezoso): no hace NADA hasta que
 *     alguien se suscribe. Es como una receta de cocina: existe,
 *     pero no se cocina hasta que alguien la "ejecuta".
 */

// ------------------------------------------------------------
// Nuestro mini Observable
// ------------------------------------------------------------
class Observable {
  // Recibe una "función productora": describe CÓMO se generan los
  // valores, pero no se ejecuta todavía (lazy).
  constructor(productor) {
    this._productor = productor;
  }

  // Al suscribirnos, recién aquí se ejecuta la función productora.
  subscribe(observer) {
    // Permitimos pasar solo una función (atajo para 'next').
    const safeObserver =
      typeof observer === "function" ? { next: observer } : observer;

    // Rellenamos los métodos que falten para no romper nada.
    const obs = {
      next: safeObserver.next || (() => {}),
      error: safeObserver.error || ((e) => { throw e; }),
      complete: safeObserver.complete || (() => {}),
      closed: false,
    };

    // Envolvemos para garantizar que tras error/complete NO se emite más.
    // Esta es una regla del "Observable Contract": una vez terminado,
    // el flujo no vuelve a emitir.
    const wrapped = {
      next: (v) => { if (!obs.closed) obs.next(v); },
      error: (e) => { if (!obs.closed) { obs.closed = true; obs.error(e); } },
      complete: () => { if (!obs.closed) { obs.closed = true; obs.complete(); } },
    };

    // Ejecutamos el productor. Puede devolver una función de limpieza
    // (por ejemplo para detener un setInterval).
    const cleanup = this._productor(wrapped) || (() => {});

    // Devolvemos un objeto con unsubscribe (igual que RxJS).
    return {
      unsubscribe: () => {
        obs.closed = true;
        cleanup();
      },
    };
  }
}

// ------------------------------------------------------------
// Ejemplo 1: un observable que emite valores fijos y completa
// ------------------------------------------------------------
const numeros$ = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  observer.next(99); // <- IGNORADO: ya completó (gracias al contrato)
});

// Nota: usamos el sufijo "$" en el nombre (numeros$). Es una convención
// muy usada para indicar "esto es un stream / observable".

console.log("--- Ejemplo 1: valores síncronos ---");
numeros$.subscribe({
  next: (v) => console.log("Recibido:", v),
  complete: () => console.log("✅ Completado (no llegará el 99)"),
});

// ------------------------------------------------------------
// Ejemplo 2: un observable ASÍNCRONO (un reloj) + limpieza
// ------------------------------------------------------------
const reloj$ = new Observable((observer) => {
  let segundos = 0;
  const id = setInterval(() => {
    segundos++;
    observer.next(segundos);
  }, 1000);

  // Función de limpieza: se llama al hacer unsubscribe.
  return () => {
    clearInterval(id);
    console.log("🧹 Intervalo limpiado (sin fugas de memoria)");
  };
});

console.log("\n--- Ejemplo 2: stream asíncrono (3 segundos) ---");
const sub = reloj$.subscribe((s) => console.log(`Tic: ${s}s`));

// Tras 3.5 segundos cancelamos la suscripción.
setTimeout(() => {
  sub.unsubscribe();
  console.log("Suscripción cancelada.");
}, 3500);

/**
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  node 2-observable-desde-cero.js
 * ------------------------------------------------------------
 *
 *  CONCEPTOS CLAVE:
 *  - LAZY: el código del productor no corre hasta subscribe().
 *  - El "Observer Contract": next* (error | complete) — después, nada.
 *  - La función de limpieza evita fugas (timers, listeners, sockets...).
 *  - Convención "$": nombres de streams terminan en $ (clicks$, user$).
 */
