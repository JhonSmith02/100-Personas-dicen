// const questionData = {
//     id: 1,
//     texto: "¿Qué hace que una llamada de cobranza se sienta fácil de atender?",
//     respuestas: [
//         { "texto": "Es corta y clara", "pts": 26 },
//         { "texto": "Me explican bien que debo", "pts": 22 },
//         { "texto": "Me dan opciones de pago", "pts": 20 },
//         { "texto": "No me pasan de una persona a otra", "pts": 16 },
//         { "texto": "Me dejan hablar", "pts": 10 },
//         { "texto": "Me llaman en un buen momento", "pts": 6 }
//     ]
// };

// //ordenar los datos por puntos de mayor a menor
// const sortedResponses = [...questionData.respuestas].sort((a, b) => b.pts - a.pts);


// //Elementos del dom
// const cardsContainer = document.getElementById('cards-container');
// const respuestas_mostradas = document.getElementById('respuestas-mostradas');
// const respuestas_restantes = document.getElementById('respuestas-restantes');
// const porcentaje_total = document.getElementById('porcentaje-total');
// const progress_bar = document.getElementById('progress-bar');
// const btnNext = document.getElementById('btn-next');
// const btnPrev = document.getElementById('btn-prev');
// const btnShowAll = document.getElementById('btn-mostrar-todas');
// const btnHideAll = document.getElementById('btn-ocultar-todas');
// const reveladas = document.getElementById('reveladas');
// const respuesta_top = document.getElementById('respuesta-top');
// const porcentaje_promedio = document.getElementById('porcentaje-promedio');


// // Variables de estado
// let currentIndex = 0;
// let shownResponses = [];
// let revealedResponses = 0;
// let accumulatedPercent = 0;

// // Función para crear una tarjeta de respuesta
// function createResponseCard(response, index) {
//     const card = document.createElement('div');
//     card.className = 'card-container';

//     card.innerHTML = `
//                     <div class="card-flip" data-index="${index}">
//                         <div class="card-front">
//                             <div class="response-number">${index + 1}</div>
//                             <h3>Haz clic para revelar</h3>
//                             <div class="mt-2">
//                                 <i class="fas fa-sync-alt flip-icon"></i>
//                             </div>
//                         </div>
//                         <div class="card-back">
//                             <div class="response-text">${response.texto}</div>
//                             <div class="response-percent">${response.pts}%</div>
//                             <div class="resp-contador">de las personas</div>
//                         </div>
//                     </div>
//                 `;

//     // Añadir evento de clic para voltear
//     const flipCard = card.querySelector('.card-flip');
//     flipCard.addEventListener('click', function () {
//         this.classList.toggle('flipped');

//         // Actualizar conteo de respuestas reveladas
//         if (this.classList.contains('flipped')) {
//             revealedResponses++;
//         } else {
//             revealedResponses--;
//         }
//         reveladasElement.textContent = revealedResponses;

//         // Actualizar respuesta más popular
//         if (revealedResponses > 0) {
//             respuestaTop.textContent = sortedResponses[0].texto.substring(0, 20) + '...';
//         } else {
//             respuestaTop.textContent = '-';
//         }
//     });

//     return card;
// }

// // Función para mostrar la siguiente respuesta
// function showNextResponse() {
//     if (currentIndex < sortedResponses.length) {
//         const response = sortedResponses[currentIndex];

//         // Crear y agregar la tarjeta
//         const responseCard = createResponseCard(response, currentIndex);
//         cardsContainer.appendChild(responseCard);

//         // Animación de entrada
//         responseCard.style.opacity = '0';
//         responseCard.style.transform = 'translateY(20px)';
//         responseCard.style.transition = 'all 0.5s ease';

//         setTimeout(() => {
//             responseCard.style.opacity = '1';
//             responseCard.style.transform = 'translateY(0)';
//         }, 50);

//         // Actualizar estadísticas
//         accumulatedPercent += response.pts;
//         shownResponses.push(response);
//         currentIndex++;

//         updateStats();
//         updateButtonStates();
//     }
// }

// // Función para mostrar la respuesta anterior
// function showPrevResponse() {
//     if (shownResponses.length > 0) {
//         // Eliminar la última respuesta mostrada
//         const lastCard = cardsContainer.lastChild;
//         cardsContainer.removeChild(lastCard);

//         // Actualizar estadísticas
//         const removedResponse = shownResponses.pop();
//         accumulatedPercent -= removedResponse.pts;
//         currentIndex--;

//         updateStats();
//         updateButtonStates();

//         // Actualizar conteo de reveladas si es necesario
//         const flippedCards = document.querySelectorAll('.card-flip.flipped');
//         revealedResponses = flippedCards.length;
//         reveladasElement.textContent = revealedResponses;
//     }
// }

// // Función para mostrar todas las respuestas
// function showAllResponses() {
//     while (currentIndex < sortedResponses.length) {
//         showNextResponse();
//     }
// }

// // Función para voltear todas las tarjetas
// function flipAllCards(flip) {
//     const cards = document.querySelectorAll('.card-flip');
//     cards.forEach(card => {
//         if (flip) {
//             card.classList.add('flipped');
//         } else {
//             card.classList.remove('flipped');
//         }
//     });

//     revealedResponses = flip ? cards.length : 0;
//     revealedCount.textContent = revealedResponses;

//     if (revealedResponses > 0) {
//         topAnswer.textContent = sortedResponses[0].texto.substring(0, 20) + '...';
//     } else {
//         topAnswer.textContent = '-';
//     }
// }

// // Actualizar estadísticas
// function updateStats() {
//     shownCount.textContent = shownResponses.length;
//     remainingCount.textContent = sortedResponses.length - shownResponses.length;
//     totalPercent.textContent = `${accumulatedPercent}%`;

//     // Actualizar barra de progreso global
//     const progressPercent = (shownResponses.length / sortedResponses.length) * 100;
//     progressBar.style.width = `${progressPercent}%`;

//     // Actualizar porcentaje promedio
//     if (shownResponses.length > 0) {
//         const avg = accumulatedPercent / shownResponses.length;
//         averagePercent.textContent = `${avg.toFixed(1)}%`;
//     } else {
//         averagePercent.textContent = '0%';
//     }
// }

// // Actualizar estado de los botones
// function updateButtonStates() {
//     btnPrev.disabled = shownResponses.length === 0;
//     btnNext.disabled = shownResponses.length === sortedResponses.length;
// }

// // Event Listeners
// btnNext.addEventListener('click', showNextResponse);
// btnPrev.addEventListener('click', showPrevResponse);
// btnShowAll.addEventListener('click', () => {
//     showAllResponses();
//     flipAllCards(true);
// });
// btnHideAll.addEventListener('click', () => flipAllCards(false));

// // Inicializar
// updateButtonStates();

// // Mostrar las primeras 2 respuestas automáticamente
// setTimeout(() => showNextResponse(), 300);
// setTimeout(() => showNextResponse(), 800);


   document.addEventListener('DOMContentLoaded', function() {
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
            const respuestasMostradas = document.getElementById('respuestas-mostradas');
            const respuestasRestantes = document.getElementById('respuestas-restantes');
            const porcentajeTotal = document.getElementById('porcentaje-total');
            const progressBar = document.getElementById('progress-bar');
            const btnNext = document.getElementById('btn-next');
            const btnPrev = document.getElementById('btn-prev');
            const btnShowAll = document.getElementById('btn-show-all');
            const btnHideAll = document.getElementById('btn-hide-all');
            const reveladasElement = document.getElementById('reveladas');
            const respuestaTop = document.getElementById('respuesta-top');
            const porcentajePromedio = document.getElementById('porcentaje-promedio');

            // Variables de estado
            let currentIndex = 0;
            let shownResponses = [];
            let revealedResponses = 0;
            let accumulatedPercent = 0;

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
                                <i class="fas fa-sync-alt flip-icon"></i>
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
                flipCard.addEventListener('click', function() {
                    this.classList.toggle('flipped');
                    
                    // Actualizar conteo de respuestas reveladas
                    if (this.classList.contains('flipped')) {
                        revealedResponses++;
                    } else {
                        revealedResponses--;
                    }
                    reveladasElement.textContent = revealedResponses;
                    
                    // Actualizar respuesta más popular
                    if (revealedResponses > 0) {
                        respuestaTop.textContent = sortedResponses[0].texto.substring(0, 20) + '...';
                    } else {
                        respuestaTop.textContent = '-';
                    }
                });
                
                return card;
            }

            // Función para mostrar la siguiente respuesta
            function showNextResponse() {
                if (currentIndex < sortedResponses.length) {
                    const response = sortedResponses[currentIndex];
                    
                    // Crear y agregar la tarjeta
                    const responseCard = createResponseCard(response, currentIndex);
                    cardsContainer.appendChild(responseCard);
                    
                    // Animación de entrada
                    responseCard.style.opacity = '0';
                    responseCard.style.transform = 'translateY(20px)';
                    responseCard.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        responseCard.style.opacity = '1';
                        responseCard.style.transform = 'translateY(0)';
                    }, 50);
                    
                    // Actualizar estadísticas
                    accumulatedPercent += response.pts;
                    shownResponses.push(response);
                    currentIndex++;
                    
                    updateStats();
                    updateButtonStates();
                }
            }

            // Función para mostrar la respuesta anterior
            function showPrevResponse() {
                if (shownResponses.length > 0) {
                    // Eliminar la última respuesta mostrada
                    const lastCard = cardsContainer.lastChild;
                    cardsContainer.removeChild(lastCard);
                    
                    // Actualizar estadísticas
                    const removedResponse = shownResponses.pop();
                    accumulatedPercent -= removedResponse.pts;
                    currentIndex--;
                    
                    updateStats();
                    updateButtonStates();
                    
                    // Actualizar conteo de reveladas si es necesario
                    const flippedCards = document.querySelectorAll('.card-flip.flipped');
                    revealedResponses = flippedCards.length;
                    reveladasElement.textContent = revealedResponses;
                }
            }

            // Función para mostrar todas las respuestas
            function showAllResponses() {
                while (currentIndex < sortedResponses.length) {
                    showNextResponse();
                }
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
                
                revealedResponses = flip ? cards.length : 0;
                reveladasElement.textContent = revealedResponses;
                
                if (revealedResponses > 0) {
                    respuestaTop.textContent = sortedResponses[0].texto.substring(0, 20) + '...';
                } else {
                    respuestaTop.textContent = '-';
                }
            }

            // Actualizar estadísticas
            function updateStats() {
                respuestasMostradas.textContent = shownResponses.length;
                respuestasRestantes.textContent = sortedResponses.length - shownResponses.length;
                porcentajeTotal.textContent = `${accumulatedPercent}%`;
                
                // Actualizar barra de progreso global
                const progressPercent = (shownResponses.length / sortedResponses.length) * 100;
                progressBar.style.width = `${progressPercent}%`;
                
                // Actualizar porcentaje promedio
                if (shownResponses.length > 0) {
                    const avg = accumulatedPercent / shownResponses.length;
                    porcentajePromedio.textContent = `${avg.toFixed(1)}%`;
                } else {
                    porcentajePromedio.textContent = '0%';
                }
            }

            // Actualizar estado de los botones
            function updateButtonStates() {
                btnPrev.disabled = shownResponses.length === 0;
                btnNext.disabled = shownResponses.length === sortedResponses.length;
            }

            // Event Listeners
            btnNext.addEventListener('click', showNextResponse);
            btnPrev.addEventListener('click', showPrevResponse);
            btnShowAll.addEventListener('click', () => {
                showAllResponses();
                flipAllCards(true);
            });
            btnHideAll.addEventListener('click', () => flipAllCards(false));

            // Inicializar
            updateButtonStates();
            
            // Mostrar las primeras 2 respuestas automáticamente
            setTimeout(() => showNextResponse(), 300);
            setTimeout(() => showNextResponse(), 800);
        });