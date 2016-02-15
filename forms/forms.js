angular.module('wayfare.form', [])

.controller('FormController', function ($scope, $http) {
  

	if ("geolocation" in navigator) {
	  /* geolocation is available */
	  navigator.geolocation.getCurrentPosition(function(position) {
	    do_something(position.coords.latitude, position.coords.longitude);
	  });
	} else {
	  alert("Please ensure location services are enabled in your browser")
	}

  $scope.data = {
  	location: {
  		x: null,
  		y: null
  	}
  };

  $scope.postLoc = function(loc){
    console.log("great scott! You entered:", loc);
    window.loc = loc;
  }


  window.loc = $scope.loc;
});
