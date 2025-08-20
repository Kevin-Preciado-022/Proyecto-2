// Clase que representa una parada en la ruta
class Parada {
  constructor(nombre) {
    this.nombre = nombre;       // Nombre de la parada
    this.anterior = null;       // Referencia a la parada anterior
    this.siguiente = null;      // Referencia a la parada siguiente
  }
}

// Clase que representa una ruta completa
class Ruta {
  constructor() {
    this.inicio = null;         // Primer nodo de la ruta
    this.fin = null;            // Último nodo de la ruta
    this.longitud = 0;          // Número total de paradas
    this.indicePorNombre = new Map(); // Mapa auxiliar para acceso rápido por nombre
  }

  // Inserta una parada al inicio — O(1)
  // No requiere recorrido, simplemente ajusta punteros
  insertarAlInicio(nombre) {
    const nueva = new Parada(nombre);
    if (!this.inicio) {
      this.inicio = this.fin = nueva;
    } else {
      nueva.siguiente = this.inicio;
      this.inicio.anterior = nueva;
      this.inicio = nueva;
    }
    this.indicePorNombre.set(nombre, nueva);
    this.longitud++;
  }

  // Inserta una parada al final — O(1)
  // Similar a insertar al inicio, sin recorrido
  insertarAlFinal(nombre) {
    const nueva = new Parada(nombre);
    if (!this.fin) {
      this.inicio = this.fin = nueva;
    } else {
      nueva.anterior = this.fin;
      this.fin.siguiente = nueva;
      this.fin = nueva;
    }
    this.indicePorNombre.set(nombre, nueva);
    this.longitud++;
  }

  // Inserta en posición intermedia — O(n)
  // Requiere recorrer hasta la posición deseada
  insertarEnPosicion(pos, nombre) {
    if (pos < 0 || pos > this.longitud) {
      console.error("Posición inválida");
      return;
    }
    if (pos === 0) return this.insertarAlInicio(nombre);
    if (pos === this.longitud) return this.insertarAlFinal(nombre);

    const nueva = new Parada(nombre);
    let actual = this.inicio;
    for (let i = 0; i < pos; i++) actual = actual.siguiente;

    const anterior = actual.anterior;
    anterior.siguiente = nueva;
    nueva.anterior = anterior;
    nueva.siguiente = actual;
    actual.anterior = nueva;

    this.indicePorNombre.set(nombre, nueva);
    this.longitud++;
  }

  // Elimina por nombre — O(1)
  // Acceso directo gracias al Map, sin recorrido
  eliminarPorNombre(nombre) {
    const actual = this.indicePorNombre.get(nombre);
    if (!actual) {
      console.warn("Parada no encontrada:", nombre);
      return;
    }

    if (actual.anterior) actual.anterior.siguiente = actual.siguiente;
    else this.inicio = actual.siguiente;

    if (actual.siguiente) actual.siguiente.anterior = actual.anterior;
    else this.fin = actual.anterior;

    this.indicePorNombre.delete(nombre);
    this.longitud--;
  }

  // Recorre hacia adelante — O(n)
  // Lineal respecto al número de paradas
  recorrerAdelante() {
    const recorrido = [];
    let actual = this.inicio;
    while (actual) {
      recorrido.push(actual.nombre);
      actual = actual.siguiente;
    }
    return recorrido;
  }

  // Recorre hacia atrás — O(n)
  recorrerAtras() {
    const recorrido = [];
    let actual = this.fin;
    while (actual) {
      recorrido.push(actual.nombre);
      actual = actual.anterior;
    }
    return recorrido;
  }

  // Movimiento rápido desde una parada — O(k)
  // Donde k es el número de pasos solicitados
  moverDesde(nombre, direccion = "adelante", pasos = 1) {
    let actual = this.indicePorNombre.get(nombre);
    if (!actual) {
      console.error("Parada no encontrada:", nombre);
      return [];
    }

    const recorrido = [];
    while (actual && pasos-- > 0) {
      recorrido.push(actual.nombre);
      actual = direccion === "adelante" ? actual.siguiente : actual.anterior;
    }
    return recorrido;
  }
}

// 🧩 Renderiza visualmente el recorrido con animación
function renderizarRecorrido(listaDeNombres, contenedorId = "recorrido") {
  let ul = document.getElementById(contenedorId);
  if (!ul) {
    ul = document.createElement("ul");
    ul.id = contenedorId;
    document.body.appendChild(ul);
  }

  ul.innerHTML = "";

  listaDeNombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    li.classList.add("animada"); // 👈 Animación aplicada
    ul.appendChild(li);
  });
}

// 🧪 Benchmarking — Validación empírica de rendimiento
// Permite comparar tiempos de ejecución de operaciones clave

const ruta = new Ruta();
ruta.insertarAlFinal("Terminal Norte");
ruta.insertarAlFinal("Calle 45");
ruta.insertarAlFinal("Centro");
ruta.insertarEnPosicion(1, "Universidad");
ruta.insertarAlInicio("Estación Sur");

renderizarRecorrido(ruta.recorrerAdelante());

ruta.eliminarPorNombre("Centro");
renderizarRecorrido(ruta.recorrerAdelante());

renderizarRecorrido(ruta.moverDesde("Universidad", "adelante", 2));

const rutaAlternativa = new Ruta();
rutaAlternativa.insertarAlFinal("Portal Oeste");
rutaAlternativa.insertarAlFinal("Avenida 30");
rutaAlternativa.insertarAlFinal("Estación Central");
rutaAlternativa.insertarAlFinal("Museo");
rutaAlternativa.insertarAlFinal("Parque Industrial");
rutaAlternativa.insertarEnPosicion(2, "Hospital General");
rutaAlternativa.insertarEnPosicion(4, "Zona Franca");
rutaAlternativa.insertarAlInicio("Terminal Sur");

renderizarRecorrido(rutaAlternativa.recorrerAdelante());

rutaAlternativa.eliminarPorNombre("Museo");
rutaAlternativa.eliminarPorNombre("NoExiste");

renderizarRecorrido(rutaAlternativa.recorrerAdelante());
renderizarRecorrido(rutaAlternativa.moverDesde("Hospital General", "atrás", 3));
renderizarRecorrido(rutaAlternativa.moverDesde("Zona Franca", "adelante", 3));

for (let i = 0; i < 500; i++) {
  rutaAlternativa.insertarAlFinal("Extensión " + i);
}

renderizarRecorrido(rutaAlternativa.moverDesde("Extensión 495", "adelante", 5));
renderizarRecorrido(rutaAlternativa.moverDesde("Extensión 499", "atrás", 5));

// 🧪 Benchmarking extendido
console.time("Insertar al inicio");
for (let i = 0; i < 10000; i++) {
  ruta.insertarAlInicio("Inicio " + i);
}
console.timeEnd("Insertar al inicio"); // O(1)

console.time("Insertar al final");
for (let i = 0; i < 10000; i++) {
  ruta.insertarAlFinal("Final " + i);
}
console.timeEnd("Insertar al final"); // O(1)

console.time("Insertar en posición intermedia");
for (let i = 0; i < 1000; i++) {
  ruta.insertarEnPosicion(Math.floor(ruta.longitud / 2), "Intermedia " + i);
}
console.timeEnd("Insertar en posición intermedia"); // O(n)

console.time("Eliminar por nombre");
for (let i = 0; i < 1000; i++) {
  ruta.eliminarPorNombre("Intermedia " + i);
}
console.timeEnd("Eliminar por nombre"); // O(1)

console.time("Recorrer hacia adelante");
ruta.recorrerAdelante();
console.timeEnd("Recorrer hacia adelante"); // O(n)

console.time("Recorrer hacia atrás");
ruta.recorrerAtras();
console.timeEnd("Recorrer hacia atrás"); // O(n)

console.time("Movimiento rápido");
const resultado = ruta.moverDesde("Inicio 9999", "adelante", 5);
console.timeEnd("Movimiento rápido"); // O(k)
renderizarRecorrido(resultado);

