const materias = document.querySelectorAll('.materia');
const infoBox = document.getElementById('infoBox');

let materiasAprobadas = new Set();

function actualizarHabilitadas() {
  materias.forEach(m => {
    if (materiasAprobadas.has(m.dataset.id)) {
      m.classList.add('finalizada');
      m.classList.remove('habilitada');
      m.style.pointerEvents = 'none';
      return;
    }

    const prereqs = m.dataset.prereqs.split(',').filter(x => x.trim() !== "");
    if (prereqs.length === 0) {
      m.classList.add('habilitada');
      m.style.pointerEvents = 'auto';
    } else {
      const todosAprobados = prereqs.every(id => materiasAprobadas.has(id));
      if (todosAprobados) {
        m.classList.add('habilitada');
        m.style.pointerEvents = 'auto';
      } else {
        m.classList.remove('habilitada');
        m.style.pointerEvents = 'none';
      }
    }
  });
}

materias.forEach(m => {
  m.addEventListener('click', () => {
    if (!m.classList.contains('habilitada')) return;

    const id = m.dataset.id;
    if (materiasAprobadas.has(id)) {
      materiasAprobadas.delete(id);
    } else {
      materiasAprobadas.add(id);
    }
    actualizarHabilitadas();
  });

  m.addEventListener('mouseenter', () => {
    const prereqs = m.dataset.prereqs;
    if (prereqs && prereqs.trim() !== "") {
      infoBox.textContent = "Prerrequisitos: " + prereqs;
    } else {
      infoBox.textContent = "Sin prerrequisitos";
    }
  });

  m.addEventListener('mouseleave', () => {
    infoBox.textContent = "Pasa el cursor sobre una materia para ver los prerrequisitos";
  });
});

// Al cargar la página, habilitar las materias iniciales sin requisitos
actualizarHabilitadas();
