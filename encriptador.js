// Elementos del DOM
const encryptButton = document.getElementById("btn-encriptar");
const decryptButton = document.getElementById("btn-desencriptar");
const copyButton = document.getElementById("btn-copy");
const textareaElement = document.getElementById("textarea");

// Variables para almacenar texto encriptado y desencriptado
let encryptedText;
let decryptedText;

// Eventos al hacer clic en los botones
encryptButton.addEventListener("click", handleEncrypt);
decryptButton.addEventListener("click", handleDecrypt);
copyButton.addEventListener("click", handleCopy);

// Mapeo de letras para encriptar y desencriptar
const encryptionMap = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

const decryptionMap = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};

// Función para transformar el texto
function transformText(input, map = {}) {
    return input.map(word => [...word].map(letter => map[letter] || letter));
}

// Función de manejo de eventos para encriptar
function handleEncrypt() {
    // Validaciones
    if (!textareaElement.value.trim()) {
        alert("Ingresa un mensaje para encriptarlo o desencriptarlo.");
        return;
    }
    
    // Convertir a minúsculas y dividir en palabras
    const userInput = textareaElement.value.toLowerCase().split(" ");
    encryptedText = transformText(userInput, encryptionMap);
    displayText(encryptedText);
}

// Función de manejo de eventos para desencriptar
function handleDecrypt() {
    // Validaciones
    if (!encryptedText || !textareaElement.value.trim()) {
        alert("Ingresa un mensaje para encriptarlo o desencriptarlo.");
        return;
    }
    
   // Convertir a minúsculas y dividir en palabras
   const userInput = textareaElement.value.toLowerCase().split(" ");
    // Validaciones
    console.log(validateString(userInput))
    if( !validateString(userInput) ){
        alert("Para desencriptar un mensaje, primero necesitas haberlo encriptado previamente.")
        return;
    }
    decryptedText = transformText(encryptedText, decryptionMap);
    displayText(decryptedText);
}

// Función de manejo de eventos para copiar
function handleCopy() {
    const message = document.getElementById("message");
    const textCopy = message.textContent;
    copyToClipboard(textCopy);
}

// Función para validar la desencriptación
function validateString( userInput ){
    const validatePhraseArray = encryptedText.map( item => item.join(""));
    let isValid = true;
    validatePhraseArray.forEach( (word,index) => {     
        if(word.length != userInput[index].length ){
            isValid = false
        }  
   });    
   return isValid;
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Texto copiado al portapapeles");
        })
        .catch((error) => {
            console.error("Error al copiar al portapapeles:", error);
        });
}

// Función para mostrar el texto en el DOM
function displayText(arrayOfWords) {
    const primaryDiv = document.getElementById("div-primario");
    const secondaryDiv = document.getElementById("div-secundario");
    const messageElement = document.getElementById("message");
    const joinedText = arrayOfWords.map(word => word.join("")).join(" ");
    primaryDiv.classList.add("hidden");
    secondaryDiv.classList.remove("hidden");
    messageElement.textContent = joinedText;
    textareaElement.value = "";
}
