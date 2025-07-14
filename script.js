const materias = [
    // Primer año
    { id: "1", nombre: "Contabilidad Básica", requisitos: [] },
    { id: "2", nombre: "Derecho Constitucional", requisitos: [] },
    { id: "3", nombre: "Principios de Administración", requisitos: [] },
    { id: "4", nombre: "Matemática I", requisitos: [] },
    { id: "5", nombre: "Historia Económica Contemporánea", requisitos: [] },
    { id: "6", nombre: "Metodología de las Ciencias Sociales", requisitos: [] },
    
    // Segundo año
    { id: "10", nombre: "Matemática II", requisitos: ["4"] },
    { id: "9", nombre: "Derecho Civil", requisitos: ["2"] },
    { id: "8", nombre: "Organización y Estructuras", requisitos: ["3"] },
    { id: "7", nombre: "Tecnologías de la Información", requisitos: ["3"] },
    { id: "13", nombre: "Introducción a la Economía", requisitos: ["4", "5"] },
    { id: "11", nombre: "Comportamiento Organizacional", requisitos: ["6", "8"] },
    { id: "12", nombre: "Técnicas de Valuación", requisitos: ["1"] },
    { id: "14", nombre: "Sistemas de Información", requisitos: ["7", "8"] },
    
    // Tercer año
    { id: "16", nombre: "Matemática Financiera", requisitos: ["10"] },
    { id: "17", nombre: "Derecho Comercial I", requisitos: ["9"] },
    { id: "15", nombre: "Microeconomía", requisitos: ["13"] },
    { id: "18", nombre: "Procedimientos Administrativos", requisitos: ["8"] },
    { id: "19", nombre: "Administración Estratégica", requisitos: ["14", "11"] },
    { id: "20", nombre: "Derecho del Trabajo", requisitos: ["17"] },
    { id: "21", nombre: "Estadísticas", requisitos: ["10"] },
    
    // Cuarto año
    { id: "22", nombre: "Sistemas de Costos", requisitos: ["1", "8"] },
    { id: "23", nombre: "Macroeconomía", requisitos: ["15"] },
    { id: "24", nombre: "Recursos Humanos", requisitos: ["11", "14", "20"] },
    { id: "25", nombre: "Derecho Administrativo", requisitos: ["9"] },
    { id: "26", nombre: "Costos para Decisiones", requisitos: ["12", "22"] },
    { id: "27", nombre: "Finanzas Públicas", requisitos: ["21", "23", "25"] },
    { id: "29", nombre: "Investigación Operativa", requisitos: ["21"] },
    { id: "28", nombre: "Marketing", requisitos: ["18", "19", "21"] },
    
    // Quinto año
    { id: "30", nombre: "Derecho Comercial II", requisitos: ["17"] },
    { id: "31", nombre: "Administración de la Producción", requisitos: ["14", "26", "29"] },
    { id: "32", nombre: "Coyuntura Económica", requisitos: ["23"] },
    { id: "33", nombre: "Administración Financiera", requisitos: ["16", "26"] },
    { id: "34", nombre: "Seminario de Proyectos", requisitos: ["24", "28", "31", "33"] },
    { id: "35", nombre: "Seminario de Dirección", requisitos: ["23"] },
    { id: "36", nombre: "Administración Sector Público", requisitos: ["8", "27"] },
    { id: "37", nombre: "Práctica Profesional Supervisada", requisitos: [
        "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
        "17","18","19","20","21","22","23","24","25","26","27","28","29","30",
        "31","32","33","34","35","36"
    ]}
];

const estadoMaterias = {};

const malla = document.getElementById("malla");

function renderMalla() {
    malla.innerHTML = "";
    materias.forEach(m => {
        const btn = document.createElement("div");
        btn.classList.add("materia");

        if (m.requisitos.length === 0) {
            estadoMaterias[m.id] = "desbloqueado";
        } else {
            if (!estadoMaterias[m.id]) estadoMaterias[m.id] = "bloqueado";
        }

        actualizarEstilo(btn, estadoMaterias[m.id]);

        btn.textContent = m.nombre;
        btn.onclick = () => aprobarMateria(m.id);
        btn.id = m.id;
        malla.appendChild(btn);
    });
}

function actualizarEstilo(elemento, estado) {
    elemento.className = "materia";
    elemento.classList.add(estado);
}

function aprobarMateria(id) {
    if (estadoMaterias[id] !== "desbloqueado") return;

    estadoMaterias[id] = "aprobado";
    document.getElementById(id).className = "materia aprobado";

    desbloquearMaterias();
}

function desbloquearMaterias() {
    materias.forEach(m => {
        if (estadoMaterias[m.id] === "bloqueado") {
            const requisitosCumplidos = m.requisitos.every(req => estadoMaterias[req] === "aprobado");
            if (requisitosCumplidos) {
                estadoMaterias[m.id] = "desbloqueado";
                const elem = document.getElementById(m.id);
                if (elem) actualizarEstilo(elem, "desbloqueado");
            }
        }
    });
}

renderMalla();

