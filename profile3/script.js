
/* walkoud.github.io */

var makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    /* walkoud.github.io */
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }
  


  $('#video_id').on('loadstart', function (event) {
    $(this).addClass('loading');
    console.log("video loaded")
  });
  $('#video_id').on('canplay', function (event) {
    $(this).removeClass('loading');
    $(this).attr('poster', '');
  });


let loaded = false;
setTimeout(() => {
  var enterButton = document.getElementById('enterButton');

  loaded = true;
  // Changer le texte du bouton
  enterButton.innerText = "enter";
  
}, 8000)

setInterval(() => {
  var enterButton = document.getElementById('enterButton');

  if(!loaded){
    enterButton.innerText+= "."
  }

}, 1000)



window.PLAYER_TRACKS = [
    { src: '../assets/music/mylesxiety_it_will_be_alright.mp3', title: 'it will be alright' },
    { src: '../assets/music/lost_signal.mp3', title: 'lost signal' },
    { src: '../assets/music/destiny.mp3', title: 'destiny' }
];

function playMusic(){
    var random = Math.floor(Math.random() * window.PLAYER_TRACKS.length);
    window.profilePlayer.load(random, true);
}

window.PLAYER_ON_TOGGLE = function (playing) {
    var video = document.getElementById('myVideo');
    if (!video) return;
    if (playing) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
    } else {
        video.pause();
    }
};

  // enter button
  document.addEventListener('DOMContentLoaded', function() {



    var enterButton = document.getElementById('enterButton');
    var video = document.getElementById('myVideo');

    enterButton.addEventListener('click', function() {
        if(!loaded)return;
        $('#overlay').addClass("overlayfade")
        enterButton.classList.add('clicked');


        // Affiche la vidéo
        video.style.display = 'block';
                
        // Lance la vidéo
        video.play();

        playMusic();



 
        
    });




});








  

/* walkoud.github.io */