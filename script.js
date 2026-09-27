let currentPin = "";
const correctPin = "271015"; // Ganti dengan PIN rahasia Anda

function pressPin(num) {
    if (currentPin.length < 6) {
        currentPin += num;
        updateDots();
    }
}

function clearPin() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function submitPin() {
    if (currentPin === correctPin) {
        document.getElementById('pin-overlay').classList.add('hidden');
        document.getElementById('gift-overlay').classList.remove('hidden');
    } else {
        alert("Kode PIN salah, coba lagi!");
        clearPin();
    }
}

function openGift() {
    document.getElementById('gift-overlay').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
}

function blowCandle() {
    document.getElementById('flame').classList.add('off');
    alert("Semoga semua keinginanmu terkabul! 🎉");
}

function showFlowerMsg(msg) {
    document.getElementById('flower-message').innerText = msg;
}

function playSong(title, src) {
    document.getElementById('now-playing').innerText = "NOW PLAYING: " + title;
    const player = document.getElementById('audio-player');
    player.src = src;
    player.play();
}

const notes = [
    "Aku bersyukur telah memiliki mu namun sekarang sudah tidak.",
    "Terima kasih telah mau memasuki dunia ku saat dahulu.",
    "Aku bersyukur atas kehangatan hatimu yang selalu berhasil menenangkan pikiranku.",
    "I MIS YOU,  YOU KHOWW?"
];

function shakeJar() {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    document.getElementById('note-text').innerText = `"${randomNote}"`;
}