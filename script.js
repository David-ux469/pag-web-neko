// Productos de ejemplo (puedes cambiar las imágenes por las que subiste)
const productos = [
  {
    nombre: 'Top Blanco',
    descripcion: '',
    imagen: 'top blanco.png',
    precio: '20€'
  },
  {
    nombre: 'Sudadera nekø',
    descripcion: '',
    imagen: 'sudadera neko blanco.png',
    precio: '20€'
  },
  {
    nombre: 'Camiseta nekø Gris',
    descripcion: '',
    imagen: 'neko diseño camiseta gris.png',
    precio: '20€'
  },
  {
    nombre: 'Camiseta nekø Rosa',
    descripcion: '',
    imagen: 'neko diseño camiseta.png',
    precio: '20€'
  }
];

function mostrarProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  productos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="img-ampliable">
      <h3>${prod.nombre}</h3>
      <strong>${prod.precio}</strong>
      <button class="btn-comprar">Comprar</button>
    `;
    // Ampliar imagen al hacer clic
    div.querySelector('.img-ampliable').addEventListener('click', function(e) {
      const modal = document.getElementById('modal-imagen');
      const modalImg = document.getElementById('modal-img');
      modalImg.src = prod.imagen;
      modalImg.alt = prod.nombre;
      modal.style.display = 'flex';
    });
    // Botón comprar
    div.querySelector('.btn-comprar').addEventListener('click', function() {
      localStorage.setItem('productoSeleccionado', prod.nombre);
      window.location.href = 'subpagina.html';
    });
    contenedor.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', mostrarProductos);

// Cerrar modal al hacer clic fuera de la imagen o presionar Escape
window.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal-imagen');
  if(modal) {
    modal.addEventListener('click', function(e) {
      if(e.target === modal) modal.style.display = 'none';
    });
    document.addEventListener('keydown', function(e) {
      if(e.key === 'Escape') modal.style.display = 'none';
    });
  }
});

// Manejo del formulario de contacto
const form = document.getElementById('form-contacto');
if(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = form.nombre.value;
    const email = form.email.value;
    const mensaje = form.mensaje.value;
    const asunto = encodeURIComponent('Contacto desde la web de nekø');
    const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);
    window.location.href = `mailto:nekoropa@gmx.es?subject=${asunto}&body=${cuerpo}`;
    // Opcional: mostrar mensaje de gracias
    form.style.display = 'none';
    document.getElementById('mensaje-enviado').style.display = 'block';
  });
}

// Lógica para la subpágina: personalizar el correo con el producto seleccionado
if (window.location.pathname.endsWith('subpagina.html')) {
  const producto = localStorage.getItem('productoSeleccionado') || '';
  const btnCorreo = document.querySelector('.btn-comprar');
  if (btnCorreo) {
    let body = 'Hola, quiero finalizar mi compra de nekø.';
    if (producto) {
      body = `Hola, quiero comprar la camiseta: ${producto}.\nPor favor, envíame el número de cuenta para realizar la transacción.`;
    }
    btnCorreo.href = `mailto:nekoropa@gmx.es?subject=Pedido%20nekø&body=${encodeURIComponent(body)}`;
    btnCorreo.addEventListener('click', function() {
      // Limpia el producto seleccionado después de enviar
      localStorage.removeItem('productoSeleccionado');
    });
  }
}
