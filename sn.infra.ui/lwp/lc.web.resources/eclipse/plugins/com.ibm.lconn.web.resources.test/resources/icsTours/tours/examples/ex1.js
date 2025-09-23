require([
  "lconn.test/icsTours/tours/tourController"
], function(tourController){
  var folk = tourController;
  folk.init();
  folk.registerTours();
  //console.log(folk);
  folk.startTour('welcome_tour');
});
