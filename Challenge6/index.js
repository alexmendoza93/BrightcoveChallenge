// +++ Helpful method to convert seconds +++
/**
 * Utility to extract h/m/s from seconds
 * @param {number} secs - seconds to convert to hh:mm:ss
 */
 function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    if (hours < 10) {
      hours = "0" + hours.toString();
    } else {
      hours = hours.toString();
    };
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    minutes = minutes.toString();
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    } else {
      seconds = seconds.toString();
    };
    var obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
  
  videojs.getPlayer('myPlayerID').ready(function () {
    var myPlayer = this,
    jumpAmount = 5,
    controlBar,
    insertBeforeNode,
    newElementBB = document.createElement("div"),
    newElementFB = document.createElement("div"),
    newImageBB = document.createElement("img"),
    newImageFB = document.createElement("img");

  // +++ Assign IDs for later element manipulation +++
  newElementBB.id = "backButton";
  newElementFB.id = "forwardButton";

  // +++ Assign properties to elements and assign to parents +++
  newImageBB.setAttribute(
    "src",
    "https://player.support.brightcove.com/assets/images/code-samples/brightcove-player-sample-back-forward-buttons/back-button.png"
  );
  newElementBB.appendChild(newImageBB);
  newImageFB.setAttribute(
    "src",
    "https://player.support.brightcove.com/assets/images/code-samples/brightcove-player-sample-back-forward-buttons/forward-button.png"
  );
  newElementFB.appendChild(newImageFB);

  // +++ Get controlbar and insert elements +++
  controlBar = myPlayer.$(".vjs-control-bar");
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = myPlayer.$(".vjs-volume-panel");

  // Insert the button div in proper location
  controlBar.insertBefore(newElementBB, insertBeforeNode);
  controlBar.insertBefore(newElementFB, insertBeforeNode);

  // +++ Add event handlers to jump back or forward +++
  // Back button logic, don't jump to negative times
  newElementBB.addEventListener("click", function() {
    var newTime,
      rewindAmt = jumpAmount,
      videoTime = myPlayer.currentTime();
    if (videoTime >= rewindAmt) {
      newTime = videoTime - rewindAmt;
    } else {
      newTime = 0;
    }
    myPlayer.currentTime(newTime);
  });

  // Forward button logic, don't jump past the duration
  newElementFB.addEventListener("click", function() {
    var newTime,
      forwardAmt = jumpAmount,
      videoTime = myPlayer.currentTime(),
      videoDuration = myPlayer.duration();
    if (videoTime + forwardAmt <= videoDuration) {
      newTime = videoTime + forwardAmt;
    } else {
      newTime = videoDuration;
    }
    myPlayer.currentTime(newTime);
  });

  
    // +++ Add the overlay to the player +++
    myPlayer.overlay({
      "content": "<p id='adOverlay'>Ad: <span id='timeTarget'></span></p>",
      "start": "loadedmetadata"
    })
  
    // +++ Get reference to element containing overlay +++
    var adPlayerElement = document.querySelector('#adOverlay').parentElement;
    // Hide overlay at startup
    adPlayerElement.setAttribute('style', 'display: none');
    myPlayer.on('loadedmetadata', function () {
      var theInterval,
        timeLeftInAd;
  
      // +++ Check progress of ad every second +++
      // Function to be called every second during ad playback
      // Calculates time remaining and injects into overlay
      function everySecond() {
        var timeObject = secondsToTime(Math.floor(myPlayer.ima3.adPlayer.duration() - myPlayer.ima3.adPlayer.currentTime()));
        document.getElementById('timeTarget').innerHTML = timeObject.m + ':' + timeObject.s;
      }
  
      // +++ Clean up at ad end or ad skipped +++
      function videoCompleteOrSkipped() {
        // Stop the counter
        clearInterval(theInterval);
        // Hide the overlay
        adPlayerElement.setAttribute('style', 'display: none');
        // Clear any numbers so on display of overlay no small numbers left
        document.getElementById('timeTarget').innerHTML = '';
      }
  
      // +++ Start counter on start of ad +++
      myPlayer.on('ima3-started', function () {
        adPlayerElement.setAttribute('class', 'vjs-overlay');
        // Display the overlay
        adPlayerElement.setAttribute("style", "display: block; left: 5px");
        // Start the counter that calls function every second
        theInterval = setInterval(everySecond, 1000);
      });
  
      // +++ Listen for ad end or skipped +++
      myPlayer.on('ima3-complete', videoCompleteOrSkipped);
      myPlayer.on('ads-ad-skipped', videoCompleteOrSkipped);
    });
  });