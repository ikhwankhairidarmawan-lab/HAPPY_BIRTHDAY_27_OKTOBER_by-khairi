// Configuration & State
        const CORRECT_PIN = "271015"; // PIN disimpan di dalam file/skrip JavaScript
        let enteredPin = "";
        let isCandleBlown = false;
        let isPlaying = false;

        // Interactive Canvas Background
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random() * 0.7 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(226, 169, 179, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        initParticles();
        animateParticles();

        // PIN Keypad Logic
        function updatePinDots() {
            const dots = document.querySelectorAll('.pin-dots .dot');
            dots.forEach((dot, idx) => {
                if (idx < enteredPin.length) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function pressPin(num) {
            if (enteredPin.length < 6) {
                enteredPin += num;
                updatePinDots();
                if (enteredPin.length === 6) {
                    setTimeout(submitPin, 200);
                }
            }
        }

        function clearPin() {
            enteredPin = "";
            updatePinDots();
        }

        function submitPin() {
            // Validasi PIN langsung mencocokkan ke konstanta JavaScript
            if (enteredPin === CORRECT_PIN) {
                document.getElementById('pin-overlay').classList.add('hidden');
                document.getElementById('gift-overlay').classList.remove('hidden');
            } else {
                alert("Kode rahasia salah, coba lagi ya!");
                clearPin();
            }
        }

        // Gift & Main Screen Transition
        function openGift() {
            document.getElementById('gift-overlay').classList.add('hidden');
            const mainContent = document.getElementById('main-content');
            mainContent.classList.add('visible');
            triggerConfetti();
        }

        // Confetti Effect
        function triggerConfetti() {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);
                
                if (typeof confetti === 'function') {
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }
            }, 250);
        }

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Interactive Cake Logic
        function blowCandle() {
            if (!isCandleBlown) {
                isCandleBlown = true;
                document.getElementById('flame').classList.add('blown');
                document.getElementById('cake-instruction').innerText = "Make a wish! Harapanmu sudah terkirim ✨";
                triggerConfetti();
            }
        }

        // Flower Bouquet Logic
        function showFlowerMsg(msg) {
            const msgBox = document.getElementById('flower-message');
            msgBox.style.opacity = 0;
            setTimeout(() => {
                msgBox.innerText = msg;
                msgBox.style.opacity = 1;
            }, 200);
        }

        // Music Player Logic
        const songs = [
            { title: "Monokrom", artist: "Tulus", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { title: "Super Powers", artist: "Daniel Caesar", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            { title: "Selamat Ulang Tahun", artist: "Jamrud", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ];
        let currentSongIndex = 0;
        const audioPlayer = document.getElementById('audio-player');

        function togglePlay() {
            const vinyl = document.getElementById('vinyl');
            const playBtn = document.getElementById('play-btn');

            if (!audioPlayer.src) {
                audioPlayer.src = songs[currentSongIndex].src;
            }

            if (isPlaying) {
                audioPlayer.pause();
                vinyl.classList.remove('playing');
                playBtn.innerText = "▶";
            } else {
                audioPlayer.play().catch(() => {});
                vinyl.classList.add('playing');
                playBtn.innerText = "❚❚";
            }
            isPlaying = !isPlaying;
        }

        function selectSong(index, title, artist) {
            currentSongIndex = index;
            document.getElementById('song-title').innerText = title;
            document.getElementById('song-artist').innerText = artist;

            const items = document.querySelectorAll('.song-item');
            items.forEach((item, idx) => {
                item.classList.toggle('active', idx === index);
            });

            audioPlayer.src = songs[index].src;
            isPlaying = false;
            togglePlay();
        }

        // Jar of Reasons Logic
        const reasons = [
            "Kamu selalu punya cara untuk bikin suasana jadi lebih hangat.",
            "Kebaikan dan ketulusan hatimu adalah hal yang paling berkesan.",
            "Tawamu selalu menular dan bikin hari siapa pun jadi lebih cerah.",
            "Cara pandangmu tentang hal-hal kecil selalu menginspirasi.",
            "Terima kasih sudah pernah hadir dan mengukir kenangan indah.",
            "Semoga kamu selalu dikelilingi oleh hal-hal baik yang layak kamu dapatkan."
        ];

        function shakeJar() {
            const jarIcon = document.getElementById('jar-icon');
            const jarNote = document.getElementById('jar-note');

            jarIcon.classList.add('shake');
            setTimeout(() => {
                jarIcon.classList.remove('shake');
                const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
                jarNote.innerText = `"${randomReason}"`;
            }, 500);
        }
    </script>
</body>
</html>