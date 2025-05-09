/* walkoud.github.io */

// Fonction pour l'effet de pluie
var makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      increment += randoFiver;
      
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
}

// Renouvelle l'effet de pluie périodiquement
setInterval(makeItRain, 10000);

// Gestion du chargement
let loaded = false;
let dots = 0;

const loadingAnimation = setInterval(() => {
    if (!loaded) {
        const enterButton = document.getElementById('enterButton');
        dots = (dots + 1) % 4;
        enterButton.innerText = 'LOADING' + '.'.repeat(dots);
    } else {
        clearInterval(loadingAnimation);
    }
}, 500);

setTimeout(() => {
    const enterButton = document.getElementById('enterButton');
    loaded = true;
    enterButton.innerText = "ENTER";
    enterButton.style.cursor = "pointer";
}, 6000);

// Gestion principale
document.addEventListener('DOMContentLoaded', function() {
    const enterButton = document.getElementById('enterButton');
    const video = document.getElementById('myVideo');
    const overlay = document.getElementById('overlay');
    const audio = new Audio('assets/videos/music.opus');
    const gasAudio = new Audio('assets/videos/gas.mp3');
    
    // Initialize rain effect
    makeItRain();

    // Gas button handler
    document.getElementById('gasButton').addEventListener('click', function(e) {
        e.preventDefault();
        if (gasAudio.paused) {
            gasAudio.play();
        } else {
            gasAudio.pause();
            gasAudio.currentTime = 0;
        }
    });

    // Initialize event listeners
    enterButton.addEventListener('click', function() {
        if (!loaded) return;
        
        // Add animation classes
        overlay.classList.add('overlayfade');
        enterButton.classList.add('clicked');
        document.body.classList.add('back-row-toggle');

        // Start video with fade in
        video.style.display = 'block';
        video.style.opacity = 0;
        video.play();
        setTimeout(() => {
            video.style.opacity = 1;
        }, 50);

        // Start music with fade in
        audio.volume = 0;
        audio.play();
        audio.loop = true;
        
        // Fade in audio
        const fadeAudio = setInterval(() => {
            if (audio.volume < 0.95) {
                audio.volume += 0.05;
            } else {
                audio.volume = 1;
                clearInterval(fadeAudio);
            }
        }, 100);

        // Hide overlay after animation
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    });

    // Gestion de la navigation
    document.querySelectorAll('.nav_links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mise à jour des liens actifs
            document.querySelectorAll('.nav_links a').forEach(a => {
                a.classList.remove('active');
            });
            this.classList.add('active');
            
            // Mise à jour des sections
            document.querySelectorAll('section.main').forEach(section => {
                section.classList.remove('active');
            });
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
        });
    });
});



