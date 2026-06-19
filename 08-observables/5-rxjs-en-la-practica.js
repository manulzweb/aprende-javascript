/**
 * ============================================================
 *  5. RxJS EN LA PRÁCTICA (la librería real)
 * ============================================================
 *
 * Ya entiendes el motor por dentro. En el mundo real NO reinventas
 * todo esto: usas RxJS, la librería estándar de programación reactiva
 * en JavaScript (es el corazón de Angular y se usa muchísimo también
 * en React/Node).
 *
 *  INSTALACIÓN (en un proyecto con npm):
 *      npm install rxjs
 *
 *  Este archivo SÍ requiere rxjs instalado para ejecutarse:
 *      npm install rxjs
 *      node 5-rxjs-en-la-practica.js
 *
 *  Si no quieres instalar nada, léelo como referencia: la API es casi
 *  idéntica a lo que ya construimos en los archivos 2, 3 y 4.
 */

// En RxJS, los operadores van SIEMPRE dentro de .pipe().
const {
  of,
  fromEvent,
  interval,
  from,
  timer,
} = require("rxjs");
const {
  map,
  filter,
  take,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  catchError,
  scan,
  tap,
} = require("rxjs/operators");

// ------------------------------------------------------------
// Ejemplo 1: lo básico (idéntico a nuestro archivo 3)
// ------------------------------------------------------------
console.log("--- 1. map + filter + take ---");
of(1, 2, 3, 4, 5, 6)
  .pipe(
    filter((x) => x % 2 === 0),
    map((x) => x * 10),
    take(2)
  )
  .subscribe({
    next: (v) => console.log("valor:", v),
    complete: () => console.log("completado\n"),
  });

// ------------------------------------------------------------
// Ejemplo 2: scan = como reduce, pero acumulando en el tiempo
// ------------------------------------------------------------
// Útil para llevar un contador, un total, o gestionar estado.
console.log("--- 2. scan (acumulador) ---");
of(10, 20, 30)
  .pipe(scan((acumulado, valor) => acumulado + valor, 0))
  .subscribe((total) => console.log("total acumulado:", total));
// 10, 30, 60

// ------------------------------------------------------------
// Ejemplo 3: switchMap — EL operador estrella para peticiones HTTP
// ------------------------------------------------------------
/*
  switchMap "cambia" a un nuevo observable interno y CANCELA el anterior
  si llega un valor nuevo. Es la solución clásica a un buscador en vivo:

    cajaDeBusqueda$           // texto que escribe el usuario
      .pipe(
        debounceTime(300),       // espera a que deje de teclear 300ms
        distinctUntilChanged(),  // ignora si el texto no cambió
        switchMap(texto =>       // por cada texto, lanza la búsqueda...
          buscarEnApi(texto)     // ...y si llega otra letra, CANCELA
        )                        //    la búsqueda anterior (¡clave!)
      )
      .subscribe(resultados => pintar(resultados));

  Diferencias con sus hermanos:
    - switchMap : cancela el anterior  -> buscadores, autocompletado.
    - mergeMap  : ejecuta todos en paralelo -> subir varios archivos.
    - concatMap : uno tras otro, en orden -> operaciones que no deben
                  pisarse (ej. guardar en cola).
    - exhaustMap: ignora nuevos mientras uno está activo -> evitar
                  doble click en "enviar".
*/
console.log("\n--- 3. switchMap (simulando una API) ---");

// Simulamos una "API" que devuelve un observable con retardo.
const buscarEnApi = (texto) =>
  timer(200).pipe(map(() => `resultados para "${texto}"`));

// Simulamos al usuario tecleando "ho", "hol", "hola" muy rápido.
from(["ho", "hol", "hola"])
  .pipe(
    switchMap((texto) => buscarEnApi(texto)) // solo sobrevive la última
  )
  .subscribe((res) => console.log(res));
// Gracias a switchMap, solo veremos: resultados para "hola"

// ------------------------------------------------------------
// Ejemplo 4: manejo de errores con catchError
// ------------------------------------------------------------
console.log("\n--- 4. catchError ---");
const { throwError } = require("rxjs");

throwError(() => new Error("💥 falló la red"))
  .pipe(
    catchError((err) => {
      console.log("Capturado:", err.message);
      return of("valor por defecto"); // nos recuperamos con un fallback
    })
  )
  .subscribe((v) => console.log("recibido:", v));

/**
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  npm install rxjs  &&  node 5-rxjs-en-la-practica.js
 * ------------------------------------------------------------
 *
 *  CHULETA MENTAL DE OPERADORES:
 *    Transformar:  map, scan, pluck
 *    Filtrar:      filter, take, takeUntil, distinctUntilChanged
 *    Tiempo:       debounceTime, throttleTime, delay, interval, timer
 *    Aplanar:      switchMap, mergeMap, concatMap, exhaustMap
 *    Combinar:     combineLatest, merge, zip, withLatestFrom, forkJoin
 *    Errores:      catchError, retry, retryWhen
 *    Depurar:      tap   (efectos secundarios: console.log sin tocar el flujo)
 *
 *  REGLA DE ORO: en componentes (Angular/React) recuerda DESUSCRIBIRTE
 *  (takeUntil + un Subject de destrucción, o async pipe en Angular) para
 *  no dejar suscripciones colgando.
 */
