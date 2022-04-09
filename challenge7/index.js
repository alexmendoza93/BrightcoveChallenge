// Get a reference to the video poster image and the lightbox
var myPlayer,
    eContainer = document.getElementById("container"),
    eLightbox = document.getElementById("playerLightbox");

videojs.getPlayer('myPlayerID').ready(function() {
  // Get a reference to the player
  myPlayer = this;

  // +++ Wait for loadstart +++
  // Listen for the loadstart event
  myPlayer.on('loadstart',function(){
    var str = "";
    // Get the video's poster image and use it in the img tag
    str += '<img src="' +
      myPlayer.mediainfo.posterSources[0].src + '" alt="' +
      myPlayer.mediainfo.name + '" width="100%" height="100%"/>';
    eContainer.innerHTML = str;

    // +++ Listen for poster click +++
    // Add click event listener to the video poster image
    eContainer.onclick = function(e) {
      // reveal the lightbox
      eLightbox.className = "playerShow";
      // play the video
      myPlayer.play();
    }

    // +++ Close the lightbox +++
    // Listen for a click event on the close button
    playerClose.onclick = function(e) {
      myPlayer.pause();
      // hide the lightbox
      eLightbox.className = "playerHide";
    }
  })
});