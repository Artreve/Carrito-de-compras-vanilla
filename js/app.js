//Variables
const carrito = document.querySelector("#carrito"),
  listaACursos = document.querySelector("#lista-cursos"),
  contenedorCarrito = document.querySelector("#lista-carrito tbody"),
  vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  //Cuando agregas un curso precionando "Agregar Carrito"
  listaACursos.addEventListener("click", agregarCurso);
  //Elimina cursos de carrito
  carrito.addEventListener("click", eliminarCurso);
  //Vaciar el carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();
  const cursoSeleccionado = e.target.parentElement.parentElement;
  if (e.target.classList.contains("agregar-carrito"))
    leerCursos(cursoSeleccionado);
}

//Mostrar valores seleccionados y carcarlos en el carrito
function leerCursos(curso) {
  //objeto de curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna todos los demas elementos
      }
    });
    articulosCarrito = [...curso];
  } else {
    //Agregar al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  console.log(articulosCarrito);
  carritoHTML();
}

//Eliminar curso
function eliminarCurso(e) {
  e.preventDefault()
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Elimina del arreglo articuloCarrito por el id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); //volvemos a cargar el carrito
  }
}

//Muestra en la ventana del carrito
function carritoHTML() {
  //limpiar el html
  limpiarHTML();
  //recorrer y cargar el carrito
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src=${imagen} width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${id}> x</a>
        </td>`;

    //Agregar el HTML al tbody
    contenedorCarrito.appendChild(row);
  });
}

//Eliminar cursos del tbody
function limpiarHTML() {
  //forma lenta
  //   contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
