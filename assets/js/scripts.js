var firstCarousel = document.getElementById('portfolio--carousel');

var myCarousel = (function() {
  var images,
      carouselCountainer,
      carouselSelectors,
      paused = false;

  var startCarousel = function() {
    carouselCountainer[0].addEventListener("mouseover", function() {
      paused = true;
    });
    carouselCountainer[0].addEventListener("mouseout", function() {
      paused = false;
    });

    var autoSwitch = setInterval(function() {
      imageSwitch();
    }, 6000);

    function imageSwitch(direction) {
      if(!paused) {
        for(var i = 0; i < images.length; i++) {

          if(images[i].className.indexOf("middle") > -1) {
            images[i].className = "carousel-image carousel-right";
          } else if(images[i].className.indexOf("right") > -1) {
            images[i].className = "carousel-image carousel-left";
          } else if(images[i].className.indexOf("left") > -1) {
            images[i].className = "carousel-image carousel-middle";

            // change button classes
            // carouselSelectors[(i<0 ? i-1 : 3)].className = "carousel-selector";
            // carouselSelectors[i].className ="carousel-selector selected";
          }
        }
      }
    }
  };



  return {
    start: function(thisCarousel) {
      images = thisCarousel.getElementsByClassName('carousel-image');
      carouselCountainer = thisCarousel.getElementsByClassName('portfolio--carousel-images');
      carouselSelectors = thisCarousel.getElementsByClassName('carousel-selector');

      startCarousel();
    }
  };

})();

myCarousel.start(firstCarousel);
