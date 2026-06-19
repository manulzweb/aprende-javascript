# 05 · Objetos

Un **objeto** agrupa datos relacionados en pares **clave: valor**. Es la
estructura más importante de JavaScript: representa "cosas" del mundo
real (un usuario, un producto, una configuración).

📂 Archivos del módulo: `05-objetos/`

## Creación — `1-creacion.js`

```js
// Forma literal (la más común)
const persona = {
  nombre: "Ana",
  edad: 25,
  activo: true,
};

// Objeto vacío al que añades cosas después
const config = {};

// Con el constructor (menos habitual)
const otro = new Object();
```

## Propiedades — `2-propiedades.js`

### Leer y escribir

```js
// Notación de punto (la preferida)
persona.nombre;        // "Ana"
persona.edad = 26;     // modificar

// Notación de corchetes (para claves dinámicas o con espacios)
const clave = "nombre";
persona[clave];        // "Ana"

// Añadir y borrar
persona.email = "ana@mail.com";
delete persona.activo;
```

### Comprobar y recorrer

```js
"nombre" in persona;        // true
Object.keys(persona);       // ["nombre", "edad", "email"]
Object.values(persona);     // ["Ana", 26, "ana@mail.com"]
Object.entries(persona);    // [["nombre","Ana"], ...]

for (const [clave, valor] of Object.entries(persona)) {
  console.log(clave, "=", valor);
}
```

## Métodos — `3-metodos.js`

Un **método** es una función dentro de un objeto. Dentro de él, `this`
se refiere al propio objeto.

```js
const cuenta = {
  saldo: 100,
  depositar(cantidad) {
    this.saldo += cantidad;   // 'this' = cuenta
    return this.saldo;
  },
  mostrar() {
    return `Saldo: ${this.saldo}€`;
  },
};

cuenta.depositar(50); // 150
cuenta.mostrar();      // "Saldo: 150€"
```

> ⚠️ Usa **funciones normales** para los métodos, no arrow functions, si
> necesitas `this`. Las arrow no tienen su propio `this`.

## Desestructuración (destructuring)

Extrae propiedades en variables de forma cómoda.

```js
const { nombre, edad } = persona;
console.log(nombre, edad); // "Ana" 26

// Con renombrado y valor por defecto
const { email = "sin email", edad: anios } = persona;
```

## Spread y copia de objetos

```js
const base = { a: 1, b: 2 };

const copia = { ...base };            // copia superficial
const ampliado = { ...base, c: 3 };   // copia + nueva propiedad
const modificado = { ...base, a: 99 };// sobrescribe 'a'
```

> 💡 Recuerda del módulo [01](01-Tipos-de-datos): los objetos se copian
> por **referencia**. Usa `{ ...obj }` para una copia real (superficial)
> y `structuredClone(obj)` para una copia profunda.

## Objetos anidados

```js
const usuario = {
  nombre: "Ana",
  direccion: {
    ciudad: "Madrid",
    cp: "28001",
  },
};

usuario.direccion.ciudad;       // "Madrid"
usuario?.direccion?.ciudad;      // acceso seguro con ?.
```

## ✅ Resumen

- Los objetos guardan pares **clave: valor**.
- Accede con `.` o `["..."]`; recorre con `Object.keys/values/entries`.
- Los **métodos** son funciones del objeto; `this` apunta al objeto.
- **Destructuring** y **spread** (`...`) hacen el código más limpio.
- Copia con `{...obj}` (superficial) o `structuredClone` (profunda).

---
⬅️ [04 · Funciones](04-Funciones) · ➡️ [06 · Arrays](06-Arrays)
