const piano_keys = document.querySelectorAll('.piano-keys');
const notes_number = document.querySelectorAll('#notes-number')[0];
const max_range = document.querySelectorAll('#max-range')[0];
const text = document.querySelectorAll('#text')[0];

const keys = [...piano_keys].map((piano_key) => piano_key.dataset.key);



const sampler = new Tone.Sampler({
	urls: {
		C4: "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		A4: "A4.mp3",
	},
	release: 1,
	baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

function playKey(piano_key, show=true) {
    sampler.triggerAttackRelease(piano_key.dataset.key, 1);
    if (show) {
        piano_key.classList.add('playing');
        setTimeout(() => piano_key.classList.remove('playing'), 1000);
    }
}

function getRandomKey() {
    
    return keys[r], piano_keys[r];
}

function startGame() {
    if (isReady && !isStarted) {
        launchGame();
    }
}

function launchGame() {
    isStarted = true;
    let ref = Math.floor((Math.random()*keys.length));
    playKey(piano_keys[ref]);

    let r = Math.floor((Math.random()*keys.length));

    while (Math.abs(ref-r) > parseInt(max_range.value)) {
        
        r = Math.floor((Math.random()*keys.length));
        console.log(ref, r);
    }

    setTimeout(() => playKey(piano_keys[r], show=false), 1000);

    function rePlayKey(e) {
        if (e.code == 'KeyE') {
            playKey(piano_keys[r], show=false)
        }
    }

    this.addEventListener('keydown', rePlayKey)

    piano_keys[r].addEventListener('click', (e) => {
        this.removeEventListener('keydown', rePlayKey)
        text.innerHTML = "Trouvé, c'était un " + keys[r];
        setTimeout(() => text.innerHTML = '', 1000);
        isStarted = false;
    }, {once: true})
}

var isReady = false;
var isStarted = false;

Tone.loaded().then(() => {
	isReady = true;
    
});

piano_keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        playKey(e.target);
    });
});

this.addEventListener('keydown', (e) => {
    if (e.code == 'KeyR') {
        startGame();
    }
})