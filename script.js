// 🐾 Lista de animales mezclados
const animales = [
  { nombre: "Elefante", imagen: "img/Elefante.png", habitat: "tierra" },
  { nombre: "Colibrí", imagen: "img/Colibri.png", habitat: "aire" },
  { nombre: "Ballena", imagen: "img/Ballena.png", habitat: "agua" },
  { nombre: "Perro", imagen: "img/Perro.png", habitat: "tierra" },
  { nombre: "Tiburón", imagen: "img/Tiburon.png", habitat: "agua" },
  { nombre: "Cóndor", imagen: "img/Condor.png", habitat: "aire" },
  { nombre: "León", imagen: "img/Leon.png", habitat: "tierra" },
  { nombre: "Pez", imagen: "img/Pez.png", habitat: "agua" },
  { nombre: "Águila", imagen: "img/Aguila.png", habitat: "aire" } // si tenés esta imagen
];

// 🔢 Índice del animal actual
let indiceActual = 0;

// 🖼️ Referencia al elemento de imagen
const animalImg = document.getElementById("animal");

// 🎯 Cargar el primer animal
function cargarAnimal() {
  const animal = animales[indiceActual];
  animalImg.src = animal.imagen;
  animalImg.alt = animal.nombre;
  animalImg.setAttribute("data-habitat", animal.habitat);
}
cargarAnimal();

// 🧠 Configurar eventos de arrastrar
animalImg.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", animalImg.getAttribute("data-habitat"));
});

// 🧠 Configurar zonas de soltado
const zonas = document.querySelectorAll(".drop-zone");

zonas.forEach((zona) => {
  zona.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  zona.addEventListener("drop", (e) => {
    e.preventDefault();
    const habitatCorrecto = animalImg.getAttribute("data-habitat");
    const zonaPadre = zona.parentElement.id;

    if (habitatCorrecto === zonaPadre) {
      zona.appendChild(animalImg);
      zona.style.borderColor = "green";
      setTimeout(() => {
        zona.style.borderColor = "#aaa";
        siguienteAnimal();
      }, 1000);
    } else {
      zona.style.borderColor = "red";
      setTimeout(() => {
        zona.style.borderColor = "#aaa";
      }, 1000);
    }
  });
});

// ⏭️ Pasar al siguiente animal
function siguienteAnimal() {
  indiceActual++;
  if (indiceActual < animales.length) {
    document.getElementById("animal-zone").appendChild(animalImg);
    cargarAnimal();
  } else {
    animalImg.style.display = "none";
    const mensaje = document.createElement("h2");
    mensaje.textContent = "¡Felicitaciones, Maxi! Clasificaste todos los animales 🎉";
    document.getElementById("animal-zone").appendChild(mensaje);
  }
}