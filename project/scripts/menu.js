// JavaScript para alternar la visibilidad del menú en pantallas pequeñas
document.addEventListener('DOMContentLoaded', function() {
  // Obtenemos el botón de menú y el contenedor de navegación
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');

  // Añadimos un listener al botón para que cuando se haga clic, 
  // alternemos la clase 'open' que mostrará/ocultará el menú
  menuButton.addEventListener('click', function() {
      navigation.classList.toggle('open');
      menuButton.classList.toggle('open');
  });
});
