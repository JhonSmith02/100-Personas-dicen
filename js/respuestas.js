

document.addEventListener('DOMContentLoaded', function () {
    const questionData = {
        id: 1,
        texto: "¿Qué hace que una llamada de cobranza se sienta fácil de atender?",
        respuestas: [
            { "texto": "Es corta y clara", "pts": 26 },
            { "texto": "Me explican bien que debo", "pts": 22 },
            { "texto": "Me dan opciones de pago", "pts": 20 },
            { "texto": "No me pasan de una persona a otra", "pts": 16 },
            { "texto": "Me dejan hablar", "pts": 10 },
            { "texto": "Me llaman en un buen momento", "pts": 6 }
        ]
    };

    // Ordenar respuestas por puntos (mayor a menor)
    const sortedResponses = [...questionData.respuestas].sort((a, b) => b.pts - a.pts);

    // Elementos del DOM
    const cardsContainer = document.getElementById('cards-container');
    const respuestasReveladas = document.getElementById('respuestasReveladas');
    const respuestasRestantes = document.getElementById('respuestas-restantes');
    const porcentajeTotal = document.getElementById('porcentaje-total');
    const progressBar = document.getElementById('progress-bar');
    const btnShowAll = document.getElementById('btn-show-all');
    const btnHideAll = document.getElementById('btn-hide-all');
    const respuestaTop = document.getElementById('respuesta-top');
    const porcentajePromedio = document.getElementById('porcentaje-promedio');

    // Variables de estado
    let accumulatedPercent = 0;
    let revealedCards = 0;

    // Función para crear una tarjeta de respuesta
    function createResponseCard(response, index) {
        const card = document.createElement('div');
        card.className = 'card-container';

        card.innerHTML = `
                    <div class="card-flip" data-index="${index}">
                        <div class="card-front">
                            <div class="response-number">${index + 1}</div>
                            <h3>Haz clic para revelar</h3>
                            <div class="mt-2">
                                
                            </div>
                        </div>
                        <div class="card-back">
                            <div class="response-text">${response.texto}</div>
                            <div class="response-percent">${response.pts}%</div>
                            <div class="resp-contador">de las personas</div>
                        </div>
                    </div>
                `;

        // Añadir evento de clic para voltear
        const flipCard = card.querySelector('.card-flip');
        flipCard.addEventListener('click', function () {
            this.classList.toggle('flipped');

            // Actualizar estadisticas
            if (this.classList.contains('flipped')) {
                revealedCards++;
                accumulatedPercent += response.pts;
            } else {
                revealedCards--;
                accumulatedPercent -= response.pts;
            }
            updateStats();
        });

        return card;
    }

    // Función para mostrar todas las tarjetas
    function generateAllCards() {
        sortedResponses.forEach((response, index) => {
            const responseCard = createResponseCard(response, index);
            cardsContainer.appendChild(responseCard);
        });
    }

    // Función para voltear todas las tarjetas
    function flipAllCards(flip) {
        const cards = document.querySelectorAll('.card-flip');
        cards.forEach(card => {
            if (flip) {
                card.classList.add('flipped');
            } else {
                card.classList.remove('flipped');
            }
        });

        // Actualizar estadísticas
        revealedCards = flip ? cards.length : 0;
        accumulatedPercent = flip ? sortedResponses.reduce((sum, r) => sum + r.pts, 0) : 0;
        totalPeople = flip ? sortedResponses.reduce((sum, r) => sum + r.pts, 0) : 0;

        updateStats();
    }


    // Función para voltear todas las tarjetas
    function flipAllCards(flip) {
        const cards = document.querySelectorAll('.card-flip');
        cards.forEach(card => {
            if (flip) {
                card.classList.add('flipped');
            } else {
                card.classList.remove('flipped');
            }
        });

        // Actualizar estadísticas
        revealedCards = flip ? cards.length : 0;
        accumulatedPercent = flip ? sortedResponses.reduce((sum, r) => sum + r.pts, 0) : 0;
        // totalPeople = flip ? sortedResponses.reduce((sum, r) => sum + r.pts, 0) : 0;

        updateStats();
    }

    // Actualizar estadísticas
    function updateStats() {
        respuestasReveladas.textContent = revealedCards;
        respuestasRestantes.textContent = sortedResponses.length - revealedCards;
        porcentajeTotal.textContent = `${accumulatedPercent}%`;
        // personasRepresentadas.textContent = totalPeople;

        // Actualizar barra de progreso
        const progressPercent = (revealedCards / sortedResponses.length) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Actualizar porcentaje promedio
        if (revealedCards > 0) {
            const avg = accumulatedPercent / revealedCards;
            porcentajePromedio.textContent = `${avg.toFixed(1)}%`;
        } else {
            porcentajePromedio.textContent = '0%';
        }

        // Actualizar respuesta más popular
        if (revealedCards > 0) {
            respuestaTop.textContent = sortedResponses[0].texto;
        } else {
            respuestaTop.textContent = '-';
        }
    }



    // Event Listeners
    btnShowAll.addEventListener('click', () => flipAllCards(true));
    btnHideAll.addEventListener('click', () => flipAllCards(false));

    // Inicializar
    generateAllCards();
    updateStats();


});