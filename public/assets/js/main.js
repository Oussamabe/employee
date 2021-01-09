$(window).on('load', function () {
//
});

/***************Count************/

    $(document).ready(function() {
 //   $('.carousel').carousel();//pour 5000ms  par default
$('.carousel').carousel({ //pour carousel priciser votre time
    interval: 4000
});
//        counter par un 
     //   $('.carousel').carousel('prev');
       //  $('.carousel').carousel('next')
//  var counters = $(".count");
//  var countersQuantity = counters.length;
//  var counter = [];
//
//  for (i = 0; i < countersQuantity; i++) {
//    counter[i] = parseInt(counters[i].innerHTML);
//  }
//
//  var count = function(start, value, id) {
//    var localStart = start;
//    setInterval(function() {
//      if (localStart < value) {
//        localStart++;
//        counters[id].innerHTML = localStart;
//      }
//    }, 5);
//  }
//
//  for (j = 0; j < countersQuantity; j++) {
//    count(0, counter[j], j);
//  }
/***************end Count 1************/       
/************************counter scroll*****************/
   var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 7000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});
/****************end counter onscroll **********/
           
        // initialize scrollspy
    $('body').scrollspy({
      target: '.dotted-scrollspy'
    });

        /* WOW.js init  pour l'animation*/
    new WOW().init();

        $('.navbar-collapse a').click(function(){
            $(".navbar-collapse ").collapse('hide');
        });
        
        
});
