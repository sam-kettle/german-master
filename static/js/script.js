let displayedNoun = document.getElementById('random-noun').textContent
document.getElementById('currentnoun').value = displayedNoun

const answerPopupText = document.getElementById('answer-popup-text')
if (answerPopupText.textContent === 'Correct!') {
    answerPopupText.classList.add('correct')
} else {
    answerPopupText.classList.add('incorrect')
}