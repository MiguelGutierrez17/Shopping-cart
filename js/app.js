const cart = document.querySelector('#cart');
const contenedorCart = document.querySelector('#cart-list tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-cart');
const listaPosters = document.querySelector('#poster-list');
let articulosCart = [];
const indicador = document.querySelector('#long');

cargarEvents();

function cargarEvents() {
    listaPosters.addEventListener('click', agregarPoster);
    cart.addEventListener('click', eliminarPoster);
    document.addEventListener('DOMContentLoaded', () => {
        articulosCart = JSON.parse(localStorage.getItem('Cart')) || [];
        generarCarrito();
    });
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCart = [];
        localStorage.removeItem('Cart');
        limpiarCarroNuevoingreso();
    })
    comprobarLong();
}

function comprobarLong() {
    valor = 0;
    articulosCart.forEach(poster => {
        const { cantidad } = poster;
        valor += cantidad;
    })
    indicador.innerHTML = valor;
}

function agregarPoster(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains('add-cart')) {
        const posterSeleccionado = evt.target.parentElement;
        leerPoster(posterSeleccionado);
    }
    comprobarLong();

}

function eliminarPoster(evt) {
    if (evt.target.classList.contains('erase-poster')) {
        const posterID = evt.target.getAttribute('data-id');
        articulosCart = articulosCart.filter(poster => poster.id !== posterID);
        generarCarrito();
    }
    comprobarLong();
}

function leerPoster(poster) {
    const info = {
        imagen: poster.querySelector('#imgposter').src,
        nombre: poster.querySelector('#title').textContent,
        precio: poster.querySelector('#price').textContent,
        id: poster.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCart.some(poster => poster.id === info.id);
    if (existe) {
        const posters = articulosCart.map(poster => {
            if (poster.id === info.id) {
                poster.cantidad++;
                return poster;
            } else {
                return poster;
            }
        });
        articulosCart = [...posters]
    } else {
        articulosCart = [...articulosCart, info];
    }
    generarCarrito();
    comprobarLong();
}

function generarCarrito() {
    limpiarCarroNuevoingreso();

    articulosCart.forEach(poster => {
        const { imagen, nombre, precio, cantidad, id } = poster;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="200"></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="erase-poster" data-id="${id}">
        X</a>
        </td>
        `;
        contenedorCart.appendChild(row);
    })
    comprobarLong();

    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('Cart', JSON.stringify(articulosCart));
}

function limpiarCarroNuevoingreso() {
    while (contenedorCart.firstChild) {
        contenedorCart.removeChild(contenedorCart.firstChild);
    }
    comprobarLong();
}