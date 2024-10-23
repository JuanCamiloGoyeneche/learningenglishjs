let score = 0; /* Inicializa la puntuación del juego en 0. */

function loadGame(gameType) {
    const gameContainer = document.getElementById('game-container'); /* Obtiene el contenedor del juego. */
    gameContainer.innerHTML = ''; /* Limpia el contenido del contenedor. */
    score = 0; /* Reinicia la puntuación. */
    updateScore(); /* Actualiza la visualización de la puntuación. */

    /** Carga el tipo de juego seleccionado. */
    switch(gameType) {
        case 'greetings':
            createGreetingsGame(); /* Inicia el juego de saludos. */
            break;
        case 'alphabet':
            createAlphabetGame(); /* Inicia el juego del abecedario. */
            break;
        case 'verbs':
            createVerbsGame(); /* Inicia el juego de verbos irregulares. */
            break;
    }
}

/** Crea el juego de saludos. */
function createGreetingsGame() {
    const greetings = [ /* Lista de saludos en inglés y español. */
        { en: 'Hello', es: 'Hola' },
        { en: 'Good morning', es: 'Buenos días' },
        { en: 'Good afternoon', es: 'Buenas tardes' },
        { en: 'Good evening', es: 'Buenas noches' },
        { en: 'Good night', es: 'Buenas noches' },
        { en: 'How are you?', es: '¿Cómo estás?' },
        { en: 'Nice to meet you', es: 'Encantado de conocerte' },
        { en: 'Goodbye', es: 'Adiós' },
        { en: 'See you later', es: 'Hasta luego' },
        { en: 'Have a nice day', es: 'Que tengas un buen día' }
    ];

    const grid = document.createElement('div'); /* Crea un nuevo contenedor para los saludos. */
    grid.className = 'greetings-grid'; /* Asigna una clase al contenedor. */

    greetings.forEach(greeting => {
        const card = document.createElement('div'); /* Crea una tarjeta para cada saludo. */
        card.className = 'greeting-card'; /* Asigna una clase a la tarjeta. */
        card.textContent = greeting.en; /* Muestra el saludo en inglés. */

        /** Configura el evento al hacer clic en la tarjeta. */
        card.onclick = () => {
            speak(greeting.en); /* Reproduce el saludo en voz alta. */
            setTimeout(() => { card.textContent = greeting.es; }, 500); /* Muestra la traducción después de medio segundo. */
            score += 5; /* Incrementa la puntuación. */
            updateScore(); /* Actualiza la puntuación mostrada. */
        };

        grid.appendChild(card); /* Agrega la tarjeta al contenedor. */
    });

    document.getElementById('game-container').appendChild(grid); /* Agrega el contenedor de saludos al contenedor del juego. */
}

/** Función para reproducir un texto usando la síntesis de voz. */
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text); /* Crea un objeto de síntesis de voz. */
    utterance.lang = 'en-US'; /* Establece el idioma a inglés.  */

    speechSynthesis.speak(utterance); /* Reproduce el texto.  */

}

/** Actualiza la visualización de la puntuación. */
function updateScore() {
    document.getElementById('score').textContent = `Puntuación: ${score}`; /* Muestra la puntuación actual en el DOM.  */

}

/** Crea el juego del abecedario. */
function createAlphabetGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ` 
        <h2>Abecedario y Descripción</h2>
        <div id="current-letter"></div> 
        <div id="phonetic"></div> 
        <input type="text" id="description-input" placeholder="Descripción">
        <button class="check-button" onclick="checkDescription()">Comprobar</button> 
    `;

    const alphabet = [ /* Lista de letras del abecedario con su pronunciación fonética. */     
        { letter: 'A', phonetic: 'æ' },
        { letter: 'B', phonetic: 'biː' },
        { letter: 'C', phonetic: 'siː' },
        { letter: 'D', phonetic: 'diː' },
        { letter: 'E', phonetic: 'iː' },
        { letter: 'F', phonetic: 'ɛf' },
        { letter: 'G', phonetic: 'dʒiː' },
        { letter: 'H', phonetic: 'eɪtʃ' },
        { letter: 'I', phonetic: 'aɪ' },
        { letter: 'J', phonetic: 'dʒeɪ' },
        { letter: 'K', phonetic: 'keɪ' },
        { letter: 'L', phonetic: 'ɛl' },
        { letter: 'M', phonetic: 'ɛm' },
        { letter: 'N', phonetic: 'ɛn' },
        { letter: 'O', phonetic: 'oʊ' },
        { letter: 'P', phonetic: 'piː' },
        { letter: 'Q', phonetic: 'kjuː' },
        { letter: 'R', phonetic: 'ɑːr' },
        { letter: 'S', phonetic: 'ɛs' },
        { letter: 'T', phonetic: 'tiː' },
        { letter: 'U', phonetic: 'juː' },
        { letter: 'V', phonetic: 'viː' },
        { letter: 'W', phonetic: 'ˈdʌbəljuː' },
        { letter: 'X', phonetic: 'ɛks' },
        { letter: 'Y', phonetic: 'waɪ' },
        { letter: 'Z', phonetic: 'ziː' }
    ];

    let currentIndex = Math.floor(Math.random() * alphabet.length); /* Selecciona un índice aleatorio del alfabeto. */
    const current = alphabet[currentIndex]; /* Obtiene la letra actual.  */


    document.getElementById('current-letter').textContent = current.letter; /* Muestra la letra actual.  */

    document.getElementById('phonetic').innerHTML = `<span class="phonetic">${current.phonetic}</span>`; /* Muestra la pronunciación fonética.   */

}

/** Verifica si la descripción ingresada es correcta. */
function checkDescription() {
    const input = document.getElementById('description-input').value; /* Obtiene la entrada del usuario.  */

    const currentLetter = document.getElementById('current-letter').textContent; /* Obtiene la letra actual.   */


    /** Comprueba si la entrada comienza con la letra correcta. */
    if (input.charAt(0).toLowerCase() === currentLetter.toLowerCase()) {
        score += 10; /* Incrementa la puntuación si es correcto.  */

        showFeedback('¡Correcto!', true); /* Muestra un mensaje de éxito. */
    } else {
        score -= 5; /* Decrementa la puntuación si es incorrecto.   */

        showFeedback('Inténtalo de nuevo.', false); /* Muestra un mensaje de error.  */

    }
    updateScore(); /* Actualiza la puntuación mostrada.   */

    createAlphabetGame(); /* Reinicia el juego para seleccionar una nueva letra.   */

}

/** Muestra un mensaje de retroalimentación al usuario. */
function showFeedback(message, success) {
    const feedback = document.getElementById('feedback'); /* Obtiene el elemento de retroalimentación.   */

    feedback.textContent = message; /* Establece el mensaje de retroalimentación.   */

    feedback.className = `feedback ${success ? 'success' : 'error'}`; /* Asigna una clase basada en el éxito o error.   */

    feedback.style.opacity = '1'; /* Asegura que el mensaje sea visible.    */

    setTimeout(() => {
        feedback.style.opacity = '0'; /* Desaparece el mensaje después de 2 segundos.    */

    }, 2000);
}

/** Crea el juego de verbos irregulares. */
function createVerbsGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ` 
        <h2>Aprende Verbos Irregulares</h2>
        <div id="current-verb"></div> 
        <input type="text" id="past-input" placeholder="Pasado simple"> 
        <input type="text" id="participle-input" placeholder="Participio pasado"> 
        <button class="check-button" onclick="checkVerb()">Comprobar</button> 
    `;

    const irregularVerbs = [ /* Lista de verbos irregulares con sus formas. */
        {base: 'go', past: 'went', participle: 'gone'},
        {base: 'do', past: 'did', participle: 'done'},
        {base: 'see', past: 'saw', participle: 'seen'},
        {base: 'eat', past: 'ate', participle: 'eaten'},
        {base: 'take', past: 'took', participle: 'taken'},
        {base: 'give', past: 'gave', participle: 'given'},
        {base: 'write', past: 'wrote', participle: 'written'},
        {base: 'speak', past: 'spoke', participle: 'spoken'},
        {base: 'sing', past: 'sang', participle: 'sung'},
        {base: 'drink', past: 'drank', participle: 'drunk'}
    ];

    let currentVerb = getRandomVerb(); /* Obtiene un verbo irregular aleatorio.  */


    /** Obtiene un verbo aleatorio de la lista. */
    function getRandomVerb() {
        return irregularVerbs[Math.floor(Math.random() * irregularVerbs.length)]; /* Selecciona un verbo aleatorio.  */

    }

    /** Actualiza la visualización del verbo actual. */
    function updateVerbDisplay() {
        document.getElementById('current-verb').textContent = currentVerb.base; /* Muestra el verbo base actual.   */

        document.getElementById('past-input').value = ''; /* Limpia el campo de entrada del pasado.    */

        document.getElementById('participle-input').value = ''; /* Limpia el campo de entrada del participio.     */

    }

    /** Comprueba si las respuestas son correctas. */
    window.checkVerb = function() {
        const pastInput = document.getElementById('past-input').value.toLowerCase(); /* Obtiene la entrada del pasado en minúsculas.   */

        const participleInput = document.getElementById('participle-input').value.toLowerCase(); /* Obtiene la entrada del participio en minúsculas.    */


        /** Comprueba si ambas respuestas son correctas. */
        if (pastInput === currentVerb.past && participleInput === currentVerb.participle) {
            showFeedback('¡Correcto! Excelente trabajo.', true); /* Muestra un mensaje de éxito. */
            score += 20; /* Incrementa la puntuación. */
            updateScore(); /* Actualiza la puntuación mostrada.  */

        } else {
            showFeedback(`Casi... La respuesta correcta es: ${currentVerb.past} - ${currentVerb.participle}`, false); /* Muestra un mensaje de error con la respuesta correcta. */
        }

        currentVerb = getRandomVerb(); /* Selecciona un nuevo verbo irregular aleatorio.   */

        updateVerbDisplay(); /* Actualiza la visualización del verbo. */  
    }

    updateVerbDisplay(); /* Muestra el verbo inicial. */
}

/** Función para reproducir un texto usando la síntesis de voz. */
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text); /* Crea un objeto de síntesis de voz.  */

        utterance.lang = 'en-US'; /* Establece el idioma a inglés.  */

        speechSynthesis.speak(utterance); /* Reproduce el texto.  */

    }
}

/** Actualiza la visualización de la puntuación. */
function updateScore() {
    document.getElementById('score').textContent = `Puntuación: ${score}`; /* Muestra la puntuación actual en el DOM.  */

}

/** Muestra un mensaje de retroalimentación al usuario. */
function showFeedback(message, isSuccess) {
    const feedback = document.getElementById('feedback'); /* Obtiene el elemento de retroalimentación.   */

    feedback.textContent = message; /* Establece el mensaje de retroalimentación.  */
    feedback.className = `feedback ${isSuccess ? 'success' : 'error'}`; /* Asigna una clase basada en el éxito o error.   */

    feedback.style.animation = 'fadeInOut 3s'; /* Aplica una animación para mostrar el mensaje.   */

    setTimeout(() => {
        feedback.style.animation = ''; /* Elimina la animación después de 3 segundos.    */

    }, 3000);
}
