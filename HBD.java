document.getElementById('celebrateBtn').addEventListener('click', () => {
    // Fungsi confetti dari library eksternal
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff7e5f', '#feb47b', '#ffffff', '#764ba2']
    });

    // Opsional: Ubah teks tombol setelah diklik
    const btn = document.getElementById('celebrateBtn');
    btn.innerText = "Nikmati Harimu! ✨";
    btn.style.backgroundColor = "#4caf50";
});