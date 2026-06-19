/**
 * ============================================================
 *  4. SUBJECTS: cuando un observable también puede EMITIR
 * ============================================================
 *
 * Un Observable normal es "frío" (cold): cada suscriptor recibe su
 * propia ejecución independiente. Si dos personas se suscriben a un
 * reloj$, cada una arranca su propio intervalo desde cero.
 *
 * Un SUBJECT es distinto: es "caliente" (hot) y es a la vez
 * Observable Y Observer. Es un "multiplicador": tú emites un valor
 * y TODOS los suscriptores actuales lo reciben (multicast). Es ideal
 * para un BUS DE EVENTOS o un estado compartido.
 *
 * Variantes habituales (las recreamos aquí):
 *   - Subject          -> reparte valores. Quien llega tarde se pierde
 *                         lo anterior.
 *   - BehaviorSubject  -> guarda el ÚLTIMO valor y se lo da de inmediato
 *                         a cada nuevo suscriptor. Perfecto para "estado
 *                         actual" (usuario logueado, tema claro/oscuro...).
 */

// ------------------------------------------------------------
// Subject básico (multicast)
// ------------------------------------------------------------
class Subject {
  constructor() {
    this.observers = [];
    this.cerrado = false;
  }

  subscribe(observer) {
    const obs =
      typeof observer === "function" ? { next: observer } : observer;
    this.observers.push(obs);
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter((o) => o !== obs);
      },
    };
  }

  next(valor) {
    if (this.cerrado) return;
    // Copiamos el array por si alguien se desuscribe durante el reparto.
    this.observers.slice().forEach((o) => o.next && o.next(valor));
  }

  complete() {
    this.cerrado = true;
    this.observers.slice().forEach((o) => o.complete && o.complete());
    this.observers = [];
  }
}

// ------------------------------------------------------------
// BehaviorSubject: recuerda y reemite el último valor
// ------------------------------------------------------------
class BehaviorSubject extends Subject {
  constructor(valorInicial) {
    super();
    this.valor = valorInicial;
  }

  subscribe(observer) {
    const sub = super.subscribe(observer);
    // Diferencia clave: al suscribirte, recibes YA el valor actual.
    const obs =
      typeof observer === "function" ? { next: observer } : observer;
    obs.next && obs.next(this.valor);
    return sub;
  }

  next(valor) {
    this.valor = valor; // guardamos el último estado
    super.next(valor);
  }

  // Acceso síncrono al valor actual (muy cómodo).
  getValue() {
    return this.valor;
  }
}

// ------------------------------------------------------------
// Ejemplo 1: Subject como bus de eventos (multicast)
// ------------------------------------------------------------
console.log("--- Subject (multicast) ---");
const chat = new Subject();

chat.subscribe((msg) => console.log("👤 Ana ve:", msg));
chat.subscribe((msg) => console.log("👤 Luis ve:", msg));

chat.next("¡Hola a todos!"); // lo ven Ana y Luis

// Un suscriptor que llega TARDE no recibe el mensaje anterior:
chat.subscribe((msg) => console.log("👤 Marta ve:", msg));
chat.next("Segundo mensaje"); // ahora lo ven los tres

// ------------------------------------------------------------
// Ejemplo 2: BehaviorSubject como "estado" de la app
// ------------------------------------------------------------
console.log("\n--- BehaviorSubject (estado compartido) ---");
const tema = new BehaviorSubject("claro"); // estado inicial

// El primer suscriptor recibe inmediatamente "claro".
tema.subscribe((t) => console.log("Componente A pinta tema:", t));

tema.next("oscuro"); // todos reaccionan

// Un suscriptor nuevo recibe de inmediato el estado ACTUAL ("oscuro"),
// no tiene que esperar al siguiente cambio:
tema.subscribe((t) => console.log("Componente B (llega tarde) pinta:", t));

console.log("Valor actual del tema:", tema.getValue());

/**
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  node 4-subjects.js
 * ------------------------------------------------------------
 *
 *  ¿CUÁNDO USAR CADA UNO?
 *  - Subject          -> eventos puntuales: clicks, notificaciones,
 *                        "se envió el formulario".
 *  - BehaviorSubject  -> estado que siempre tiene un valor "actual":
 *                        usuario logueado, idioma, carrito de compra,
 *                        tema claro/oscuro. Es la base de muchos
 *                        gestores de estado (incluido el corazón de
 *                        servicios en Angular).
 *
 *  Cold vs Hot:
 *    - Cold (Observable): cada suscriptor = su propia ejecución.
 *    - Hot  (Subject):    una sola fuente compartida por todos.
 */
