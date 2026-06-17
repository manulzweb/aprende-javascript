/**
 * ============================================================
 *  1. EL PATRÓN OBSERVER (la base de todo)
 * ============================================================
 *
 * Antes de usar librerías como RxJS conviene entender el patrón
 * que hay debajo: el patrón "Observer" (Observador).
 *
 * Idea central:
 *   - Hay un SUJETO (Subject) que mantiene una lista de interesados.
 *   - Hay OBSERVADORES (Observers) que quieren enterarse cuando algo
 *     cambia.
 *   - Cuando el sujeto cambia, NOTIFICA a todos los observadores.
 *
 * Es el mismo principio de "suscribirse a un canal de YouTube":
 * el canal (sujeto) sube un video y avisa a todos los suscriptores
 * (observadores). Tú no llamas al canal cada 5 minutos preguntando
 * "¿hay algo nuevo?"; el canal te avisa a ti. Eso es programación
 * REACTIVA: reaccionas a eventos en lugar de preguntar (pull vs push).
 */

// ------------------------------------------------------------
// Implementación mínima de un Subject (Sujeto observable)
// ------------------------------------------------------------
class Subject {
  constructor() {
    // Aquí guardamos las funciones que quieren ser notificadas.
    this.observers = [];
  }

  // Un observador se "suscribe" para recibir avisos.
  subscribe(observer) {
    this.observers.push(observer);

    // Devolvemos una función para "desuscribirse".
    // Esto es CLAVE: si no te puedes desuscribir, tienes una fuga
    // de memoria (memory leak). Las librerías serias siempre te dan
    // una forma de cancelar.
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    };
  }

  // El sujeto emite un valor y todos los observadores reaccionan.
  next(value) {
    this.observers.forEach((observer) => observer(value));
  }
}

// ------------------------------------------------------------
// Ejemplo de uso
// ------------------------------------------------------------
const temperatura = new Subject();

// Observador 1: muestra la temperatura.
const unsubMostrar = temperatura.subscribe((grados) => {
  console.log(`🌡️  Temperatura actual: ${grados}°C`);
});

// Observador 2: avisa solo si hace calor.
temperatura.subscribe((grados) => {
  if (grados > 30) console.log("🔥 ¡Hace mucho calor!");
});

// El sensor emite valores. Cada emisión notifica a TODOS.
temperatura.next(25); // -> solo el observador 1 reacciona
temperatura.next(32); // -> reaccionan los dos

// Cancelamos el primer observador.
unsubMostrar();
console.log("\n(El observador que mostraba la temperatura se desuscribió)\n");

temperatura.next(35); // -> ya solo reacciona el observador del calor

/**
 * ------------------------------------------------------------
 *  PARA EJECUTAR:  node 1-patron-observer.js
 * ------------------------------------------------------------
 *
 *  IDEAS PARA QUEDARTE:
 *  - subscribe() = "quiero enterarme".
 *  - next()      = "ha pasado algo nuevo, aviso a todos".
 *  - unsubscribe = "ya no quiero enterarme" (evita fugas de memoria).
 *
 *  Un "Observable" (siguiente archivo) es básicamente esta misma idea
 *  pero con superpoderes: maneja errores, finalización y operadores.
 */
