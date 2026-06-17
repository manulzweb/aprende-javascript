/**
 * ============================================================
 *  3. OPERADORES: el verdadero poder de los observables
 * ============================================================
 *
 * Un operador es una función que toma un observable y devuelve OTRO
 * observable transformado, SIN modificar el original. Es exactamente
 * la misma idea que .map() / .filter() de los arrays... pero aplicada
 * a valores que llegan a lo largo del TIEMPO, no a una lista en memoria.
 *
 *   Array:      [1,2,3].map(x => x*2)            -> [2,4,6]   (ya)
 *   Observable: numeros$.pipe(map(x => x*2))     -> 2,4,6...  (con el tiempo)
 *
 * Aquí construimos versiones mínimas de los operadores más usados
 * (map, filter, take) para que veas que NO son magia.
 */

// ------------------------------------------------------------
// Observable mínimo con soporte para .pipe()
// ------------------------------------------------------------
class Observable {
  constructor(productor) {
    this._productor = productor;
  }

  subscribe(observer) {
    const obs =
      typeof observer === "function" ? { next: observer } : observer;
    const safe = {
      next: obs.next || (() => {}),
      error: obs.error || ((e) => { throw e; }),
      complete: obs.complete || (() => {}),
    };
    const cleanup = this._productor(safe) || (() => {});
    return { unsubscribe: cleanup };
  }

  // pipe encadena operadores: source.pipe(op1, op2, op3)
  // Cada operador recibe el observable de entrada y devuelve uno nuevo.
  pipe(...operadores) {
    return operadores.reduce((fuente, operador) => operador(fuente), this);
  }
}

// Helper: crea un observable a partir de una lista de valores.
function of(...valores) {
  return new Observable((observer) => {
    valores.forEach((v) => observer.next(v));
    observer.complete();
  });
}

// ------------------------------------------------------------
// OPERADORES (cada uno: observable de entrada -> observable de salida)
// ------------------------------------------------------------

// map: transforma cada valor.
const map = (fn) => (fuente) =>
  new Observable((observer) =>
    fuente.subscribe({
      next: (v) => observer.next(fn(v)),
      error: (e) => observer.error(e),
      complete: () => observer.complete(),
    }).unsubscribe
  );

// filter: deja pasar solo los valores que cumplen la condición.
const filter = (predicado) => (fuente) =>
  new Observable((observer) =>
    fuente.subscribe({
      next: (v) => { if (predicado(v)) observer.next(v); },
      error: (e) => observer.error(e),
      complete: () => observer.complete(),
    }).unsubscribe
  );

// take: deja pasar solo los primeros N valores y luego completa.
const take = (n) => (fuente) =>
  new Observable((observer) => {
    let contador = 0;
    let terminado = false; // evita completar dos veces (cumple el contrato)
    const sub = fuente.subscribe({
      next: (v) => {
        if (terminado) return;
        if (contador < n) {
          contador++;
          observer.next(v);
          if (contador === n) {
            terminado = true;
            observer.complete();
          }
        }
      },
      error: (e) => observer.error(e),
      complete: () => { if (!terminado) { terminado = true; observer.complete(); } },
    });
    return sub.unsubscribe;
  });

// ------------------------------------------------------------
// Ejemplo: combinamos operadores con pipe()
// ------------------------------------------------------------
console.log("--- Solo pares, x10, los 3 primeros ---");

of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  .pipe(
    filter((x) => x % 2 === 0), // 2, 4, 6, 8, 10
    map((x) => x * 10),         // 20, 40, 60, 80, 100
    take(3)                     // 20, 40, 60  (y completa)
  )
  .subscribe({
    next: (v) => console.log("Valor:", v),
    complete: () => console.log("✅ Completado"),
  });

/**
 * Salida esperada:
 *   Valor: 20
 *   Valor: 40
 *   Valor: 60
 *   ✅ Completado
 *
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  node 3-operadores.js
 * ------------------------------------------------------------
 *
 *  IDEAS CLAVE:
 *  - Un operador es PURO: no toca la fuente, crea un nuevo observable.
 *  - pipe() encadena transformaciones de forma legible.
 *  - Esto es composición funcional aplicada a flujos de datos.
 *
 *  En RxJS real existen ~100 operadores. Los que más usarás:
 *    map, filter, take, tap, debounceTime, switchMap, mergeMap,
 *    catchError, startWith, scan, combineLatest, withLatestFrom.
 *  (Los más avanzados, switchMap/mergeMap, en el archivo 5.)
 */
