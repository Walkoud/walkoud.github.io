
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
  


  // enter button
  document.addEventListener('DOMContentLoaded', function() {



    var enterButton = document.getElementById('enterButton');
    var video = document.getElementById('myVideo');

    enterButton.addEventListener('click', function() {
        $('#overlay').addClass("overlayfade")
        enterButton.classList.add('clicked');


        // Affiche la vidéo
        video.style.display = 'block';
                
        // Lance la vidéo
        video.play();

        playMusic();


 
        
    });




});



function playMusic(){
    let random = Math.floor(Math.random() * 3);
    var audio = new Audio('./assets/music/flokilostsouldown.mp3');
    
    audio.play();
}



   setTimeout(() => {
    makeItRain();

   
   }, 2000)
   




  

/* walkoud.github.io */