#  Transporte Urbano Inteligente 

## 1. Análisis del Problema

Una empresa de transporte urbano está modernizando su sistema de gestión de rutas. Cada ruta está compuesta por una secuencia de paradas, y los usuarios deben poder:

- Recorrer la ruta en ambos sentidos (adelante y atrás).
- Insertar nuevas paradas en cualquier posición (inicio, final o intermedia).
- Eliminar paradas específicas de forma rápida.
- Simular recorridos desde cualquier parada en cualquier dirección.

El sistema debe ser escalable, permitiendo miles de paradas sin afectar el rendimiento. Por tanto, se necesita una estructura de datos que ofrezca flexibilidad en la manipulación de paradas y eficiencia en el recorrido.

##  2. Diseño del sistema:
## Estructura Elegida: Lista Doblemente Enlazada + Mapa Auxiliar
Se implementó una lista doblemente enlazada, donde cada parada tiene referencias a la anterior y a la siguiente. Esto nos permite:
- Recorrido bidireccional eficiente.
- Inserción y eliminación rápida en los extremos.
- Navegación rapida y fluida entre paradas.

Además, se utiliza un **`Map` auxiliar** (`PorNombre`) que permite acceder directamente a cualquier parada por su nombre, optimizando operaciones como eliminación y simulación de recorrido.

### Reflexión sobre Complejidad Big O

| Operación                         | Complejidad | Justificación |
|----------------------------------|-------------|----------------|
| Insertar al inicio               | O(1)        | Acceso directo al nodo inicial |
| Insertar al final                | O(1)        | Acceso directo al nodo final |
| Insertar en posición intermedia | O(n)        | Requiere recorrido hasta la posición |
| Eliminar por nombre              | O(1)        | Uso de `Map` para acceso directo |
| Recorrer toda la ruta            | O(n)        | Recorre todos los nodos |
| Movimiento rápido desde parada   | O(k)        | Recorre `k` pasos desde el nodo inicial |

Este diseño logra un equilibrio entre **flexibilidad** (modificación dinámica de rutas) y **rendimiento** (operaciones rápidas incluso con miles de paradas).

---

## 3. Explicación de cada tema implementado
### `insertarAlInicio(nombre)`
- Inserta una nueva parada al inicio de la ruta.
- Complejidad: O(1)

### `insertarAlFinal(nombre)`
- Inserta una nueva parada al final de la ruta.
- Complejidad: O(1)

### `insertarEnPosicion(pos, nombre)`
- Inserta una parada en una posición específica.
- Valida si la posición es válida.
- Complejidad: O(n)

### `eliminarPorNombre(nombre)`
- Elimina una parada por nombre utilizando el mapa auxiliar.
- Si no existe, muestra advertencia.
- Complejidad: O(1)

### `recorrerAdelante()`
- Devuelve un arreglo con los nombres de las paradas desde el inicio.
- Complejidad: O(n)

### `recorrerAtras()`
- Devuelve un arreglo con los nombres de las paradas desde el final.
- Complejidad: O(n)

### `moverDesde(nombre, direccion, pasos)`
- Simula el recorrido desde una parada en una dirección específica.
- Utiliza el mapa para acceso directo.
- Complejidad: O(k)

---

##  4. Funcionalidad del Proyecto

El sistema nos permite:
- Crear rutas dinámicas con inserciones en cualquier posición.
- Eliminar paradas por nombre de forma eficiente.
- Recorrer rutas en ambos sentidos (adelante y atrás).
- Simular recorridos rápidos desde cualquier parada.
- Validar rendimiento con pruebas de benchmarking.
