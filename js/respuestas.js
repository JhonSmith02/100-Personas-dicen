// document.addEventListener('DOMContentLoaded', async  () => {
//     const res = await fetch('/data/preguntas.json');
//     const preguntas = await res.json();

//     const respuestas = preguntas.find( p => p.id === 1).respuestas;

//     const btnNext = document.getElementById('btn-next');
//     const btnPrev = document.getElementById('btn-prev');
//     const contenedor = document.querySelector('.res-container');

//     let currentIndex = 0;

//     function mostrarIndice(idx){
//         contenedor.innerHTML = '';
//         const { texto, pts} = respuestas[idx];
//         crearRespuestas(idx + 1, texto, pts);

//         btnPrev.disabled = idx === 0;
//         btnNext.disabled = idx === respuestas.length -1;
//     }

//     btnNext.addEventListener('click', () => {
//         if (currentIndex < respuestas.length - 1){
//             currentIndex++;
//             mostrarIndice(currentIndex);
//         }
//     });

//     btnPrev.addEventListener('click', () => {
//         if(currentIndex > 0){
//             currentIndex--;
//             mostrarIndice(currentIndex);
//         }
//     });

//     mostrarIndice(currentIndex);
// });


// function crearRespuestas(numero, texto, pts) {

//     const row = document.createElement('div'); //Creamos un elemento
//     row.className = 'row text-white text-center mt-4'; //Le pasamos las clases al elemento

//     //Creamos las columnas vacias
//     const colLeft = document.createElement('div');
//     colLeft.className = 'col-lg-2';
//     const colRight  = document.createElement('div');
//     colRight.className = 'col-lg-2';

//     //Numero de respuesta
//     const colNumero = document.createElement('div'); // div del h3
//     colNumero.className = 'col-lg-1 border bg-blur';

//     const h3Numero = document.createElement('h3'); //El h3
//     h3Numero.textContent = numero; //contenido del h3

//     colNumero.appendChild(h3Numero); //ingreso el h3 en el div

//     //texto de la respuesta
//     const colTexto = document.createElement('div');
//     colTexto.className = 'col-lg-6 border bg-blur';

//     const pTexto = document.createElement('h5');
//     pTexto.textContent = texto;

//     colTexto.appendChild(pTexto);

//     //Puntaje o cantidad de personas
//     const colPts = document.createElement('div');
//     colPts.className = 'col-lg-1 border bg-blur';

//     const h3Pts = document.createElement('h3');
//     h3Pts.textContent = pts;

//     colPts.appendChild(h3Pts);

//     //Agregamos las columnas al row
//     row.appendChild(colLeft);
//     row.appendChild(colNumero);
//     row.appendChild(colTexto);
//     row.appendChild(colPts);
//     row.appendChild(colRight);

//     // Insertamos el div creado al contenedor principal
//     document.querySelector('.res-container').appendChild(row);
// }


ner('DOMContentLoaded', async () => {
    // 1. Obtener ID de pregunta desde la URL
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const match = filename.match(/pregunta(\d+)\.html/);
    
    if (!match) {
        console.error('No se pudo determinar el ID de la pregunta');
        return;
    }
    
    const questionId = parseInt(match[1], 10);
    
    // 2. Cargar datos de preguntas
    const res = await fetch('/data/preguntas.json');
    const preguntas = await res.json();
    
    // 3. Buscar pregunta específica
    const pregunta = preguntas.find(p => p.id === questionId);
    
    if (!pregunta) {
        console.error(`No se encontró la pregunta con ID ${questionId}`);
        return;
    }
    
    // 4. Ordenar respuestas por puntos (de mayor a menor)
    const respuestas = pregunta.respuestas
        .map(r => ({ 
            texto: r.texto, 
            pts: r.pts || r.pst || 0 // Manejar propiedades diferentes
        }))
        .sort((a, b) => b.pts - a.pts);
    
    // 5. Referencias a elementos DOM
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const contenedor = document.querySelector('.res-container');
    const tituloPregunta = document.querySelector('header h1');
    
    // 6. Actualizar título de la pregunta
    if (tituloPregunta) {
        tituloPregunta.textContent = pregunta.texto;
    }
    
    let currentIndex = 0;
    
    // 7. Función para mostrar siguiente respuesta
    function mostrarSiguiente() {
        if (currentIndex < respuestas.length) {
            const respuesta = respuestas[currentIndex];
            crearFilaRespuesta(respuesta, currentIndex + 1);
            currentIndex++;
            
            // Actualizar estado de botones
            btnPrev.disabled = false;
            if (currentIndex === respuestas.length) {
                btnNext.disabled = true;
            }
        }
    }
    
    // 8. Función para ocultar última respuesta
    function ocultarAnterior() {
        if (currentIndex > 0) {
            const filas = contenedor.querySelectorAll('.respuesta-fila');
            if (filas.length > 0) {
                contenedor.removeChild(filas[filas.length - 1]);
                currentIndex--;
                
                // Actualizar estado de botones
                btnNext.disabled = false;
                if (currentIndex === 0) {
                    btnPrev.disabled = true;
                }
            }
        }
    }
    
    // 9. Función para crear fila de respuesta
    function crearFilaRespuesta(respuesta, numero) {
        const row = document.createElement('div');
        row.className = 'row text-white text-center mt-4 respuesta-fila';
        row.style.animation = 'fadeIn 0.5s ease-out';
        
        // Columnas laterales para margen
        const colLeft = document.createElement('div');
        colLeft.className = 'col-lg-2';
        
        const colRight = document.createElement('div');
        colRight.className = 'col-lg-2';
        
        // Columna de número
        const colNumero = document.createElement('div');
        colNumero.className = 'col-lg-1 border bg-blur d-flex align-items-center justify-content-center';
        
        const h3Numero = document.createElement('h3');
        h3Numero.className = 'mb-0';
        h3Numero.textContent = numero;
        
        colNumero.appendChild(h3Numero);
        
        // Columna de texto
        const colTexto = document.createElement('div');
        colTexto.className = 'col-lg-6 border bg-blur d-flex align-items-center';
        
        const pTexto = document.createElement('h5');
        pTexto.className = 'mb-0';
        pTexto.textContent = respuesta.texto;
        
        colTexto.appendChild(pTexto);
        
        // Columna de puntos
        const colPts = document.createElement('div');
        colPts.className = 'col-lg-1 border bg-blur d-flex align-items-center justify-content-center';
        
        const h3Pts = document.createElement('h3');
        h3Pts.className = 'mb-0';
        h3Pts.textContent = respuesta.pts;
        
        colPts.appendChild(h3Pts);
        
        // Construir fila
        row.appendChild(colLeft);
        row.appendChild(colNumero);
        row.appendChild(colTexto);
        row.appendChild(colPts);
        row.appendChild(colRight);
        
        // Agregar al contenedor
        contenedor.appendChild(row);
        
        // Scroll a la nueva respuesta
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // 10. Event listeners para botones
    btnNext.addEventListener('click', mostrarSiguiente);
    btnPrev.addEventListener('click', ocultarAnterior);
    
    // 11. Estado inicial de botones
    btnPrev.disabled = true;
    if (respuestas.length === 0) {
        btnNext.disabled = true;
    }
    
    // 12. Mostrar primera respuesta automáticamente
    if (respuestas.length > 0) {
        mostrarSiguiente();
    }
});