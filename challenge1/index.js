videojs.getPlayer('myPlayerID').on('loadstart', function() {
    const myPlayer= this
    myPlayer.muted(true)
    setTimeout(function(){var whereYouAt = myPlayer.currentTime();
        myPlayer.currentTime(20);}
        
        ,10000)
   
});

