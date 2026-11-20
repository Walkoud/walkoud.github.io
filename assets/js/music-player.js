/* ===== Shared music player engine (walkoud.github.io) ===== */
(function () {
    var tracks = [];
    var audio = null;
    var index = 0;

    function updateUI() {
        var titleEl = document.getElementById('mpTitle');
        var toggleIcon = document.querySelector('#mpToggle i');

        if (titleEl && tracks[index]) {
            titleEl.textContent = tracks[index].title;
        }
        if (toggleIcon && audio) {
            toggleIcon.className = audio.paused ? 'fas fa-play' : 'fas fa-pause';
        }
    }

    function setupMarquee() {
        var titleEl = document.getElementById('mpTitle');
        if (!titleEl) return;
        var wrap = titleEl.parentElement;
        if (!wrap || !wrap.classList.contains('mp-title-wrap')) return;

        wrap.classList.remove('scrolling');
        titleEl.style.transform = 'none';

        var overflow = Math.max(titleEl.scrollWidth, wrap.scrollWidth) - wrap.clientWidth;
        if (overflow > 4) {
            var duration = Math.max(4, Math.round(overflow / 22));
            titleEl.style.setProperty('--mp-marquee-distance', '-' + overflow + 'px');
            titleEl.style.setProperty('--mp-marquee-duration', duration + 's');
            void titleEl.offsetWidth;
            wrap.classList.add('scrolling');
        }
    }

    function load(i, autoplay) {
        if (!audio || !tracks.length) return;
        index = ((i % tracks.length) + tracks.length) % tracks.length;
        audio.src = tracks[index].src;
        audio.currentTime = 0;

        var bar = document.getElementById('mpProgress');
        if (bar) bar.style.width = '0%';
        updateUI();
        setTimeout(setupMarquee, 60);
        setTimeout(setupMarquee, 400);

        if (autoplay) {
            var playing = audio.play();
            if (playing && playing.catch) playing.catch(function () {});
        }
    }

    function toggle() {
        if (!audio) return;
        if (audio.paused) {
            var playing = audio.play();
            if (playing && playing.catch) playing.catch(function () {});
        } else {
            audio.pause();
        }
        updateUI();
        if (typeof window.PLAYER_ON_TOGGLE === 'function') {
            window.PLAYER_ON_TOGGLE(!audio.paused);
        }
    }

    function next() {
        if (audio) load(index + 1, true);
    }

    function prev() {
        if (audio) load(index - 1, true);
    }

    window.profilePlayer = {
        load: load,
        toggle: toggle,
        next: next,
        prev: prev,
        updateUI: updateUI
    };

    document.addEventListener('DOMContentLoaded', function () {
        tracks = window.PLAYER_TRACKS || [];
        audio = new Audio();
        audio.volume = 0.6;

        audio.addEventListener('ended', function () { load(index + 1, true); });
        audio.addEventListener('play', updateUI);
        audio.addEventListener('pause', updateUI);
        audio.addEventListener('timeupdate', function () {
            var bar = document.getElementById('mpProgress');
            if (bar && audio.duration) {
                bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
            }
        });

        var toggleBtn = document.getElementById('mpToggle');
        var nextBtn = document.getElementById('mpNext');
        var prevBtn = document.getElementById('mpPrev');
        if (toggleBtn) toggleBtn.addEventListener('click', toggle);
        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        updateUI();
        setTimeout(setupMarquee, 120);
        setTimeout(setupMarquee, 500);
        window.addEventListener('resize', setupMarquee);
    });
})();
