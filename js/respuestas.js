function crearRespuestas(numero, texto, puntaje) {

    const row = document.createElement('div'); //Creamos un elemento
    row.className = 'row text-white text-center mt-4'; //Le pasamos las clases al elemento

    //Creamos las columnas vacias
    const colLeft = document.createElement('div');
    colLeft.className = 'col-lg-2';
    const colRight  = document.createElement('div');
    colRight.className = 'col-lg-2';

    //Numero de respuesta
    const colNumero = document.createElement('div'); // div del h3
    colNumero.className = 'col-lg-1 border bg-blur';

    const h3Numero = document.createElement('h3'); //El h3
    h3Numero.textContent = numero; //contenido del h3

    colNumero.appendChild(h3Numero); //ingreso el h3 en el div

    //texto de la respuesta
    const colTexto = document.createElement('div');
    colTexto.className = 'col-lg-6 border bg-blur';

    const pTexto = document.createElement('h5');
    pTexto.textContent = texto;

    colTexto.appendChild(pTexto);

    //Puntaje o cantidad de personas
    const colPts = document.createElement('div');
    colPts.className = 'col-lg-1 border bg-blur';

    const h3Pts = document.createElement('h3');
    h3Pts.textContent = puntaje;

    colPts.appendChild(h3Pts);

    //Agregamos las columnas al row
    row.appendChild(colLeft);
    row.appendChild(colNumero);
    row.appendChild(colTexto);
    row.appendChild(colPts);
    row.appendChild(colRight);

    // Insertamos el div creado al contenedor principal
    document.querySelector('.res-container').appendChild(row);
}

const resContainer = document.querySelector('.res-container');


const btnRespuesta = document.querySelector('.btn-resp');
btnRespuesta.addEventListener('click', () => {
    crearRespuestas(1, 'Es corta y clara', 26);
});



