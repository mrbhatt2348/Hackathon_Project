const dynamicText = document.getElementById('dynamic-text')
const phrases = [' companion...',  ' guide...', ' personal assistant...']
let letterIndex = 0
let phraseIndex = 0 

function printLetters(phrase) {
    if (letterIndex < phrase.length) {
        dynamicText.textContent += phrase.charAt(letterIndex)
    letterIndex++
    setTimeout(function() {
        printLetters(phrase)
    }, 200)
    }
    else if(letterIndex == phrase.length) {
        clearLetters();
    }
}

function clearLetters() {
    if (letterIndex > -1) {
        let updatedPhrase = ''
        for (let i = 0; i < letterIndex; i++) {
            updatedPhrase += phrases[phraseIndex].charAt(i)
        }
        dynamicText.textContent = updatedPhrase
        letterIndex--
        setTimeout(function() {
            clearLetters()
        }, 100)
    }
    else if (letterIndex == -1) {
        phraseIndex = (phraseIndex + 1)%phrases.length
        letterIndex = 0
        printLetters(phrases[phraseIndex])
    }
}

printLetters(phrases[phraseIndex])

//Search Box