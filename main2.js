const searchForm = document.querySelector('#search-form');
const searchFormInput = document.querySelector('input');
const searchBarElement = document.querySelector('#search-bar');
const navList = document.querySelector('#list-of-navigations');
var speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    console.log('Your browser supports speech recognition');
    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fa-solid fa-microphone"></i></button>');
    const micBtn = document.querySelector('button');
    const micIcon = document.querySelector('i');

    const recognition = new speechRecognition();
    // recognition.lang = 'GU';
    recognition.continuous = true;
    micBtn.addEventListener('click', micBtnClick)
    function micBtnClick() {
        if (micIcon.classList.contains('fa-microphone')) {//Start speech recognition
            recognition.start();
        }
        else {//Stop speech recognition
            recognition.stop();
        }

    }

    recognition.addEventListener('start', startSpeechRecognition);
    function startSpeechRecognition() {
        micIcon.classList.remove('fa-microphone');
        micIcon.classList.add('fa-microphone-slash');
        console.log('Speech recognition started...');
        searchFormInput.focus();
    }
    recognition.addEventListener('end', stopSpeechRecognition);
    function stopSpeechRecognition() {
        micIcon.classList.remove('fa-microphone-slash');
        micIcon.classList.add('fa-microphone');
        console.log('Speech recognition stopped...');
        searchFormInput.focus();
    }
    recognition.addEventListener('result', resultOfSpeechRecognition);
    function resultOfSpeechRecognition(event) {
        const currentResultIndex = event.resultIndex; 
        const transcript = event.results[currentResultIndex][0].transcript;
        // searchFormInput.value = transcript;
        // setTimeout(() => {
        //     searchForm.submit();
        // }, 800);
        if (transcript.toLowerCase().trim() === 'stop recording') {
            recognition.stop();
        }
        else if (!searchFormInput.value) {
            searchFormInput.value = transcript;
        }
        else {
            if (transcript.toLowerCase().trim() === 'go') {
                searchForm.submit();
            }
            else if (transcript.toLowerCase().trim() === 'reset input') {
                searchFormInput.value = '';
            }
            else {
                searchFormInput.value = transcript;
            }
        }
    }

}
else {
    console.log('Your browser does not support speech recognition');
}
