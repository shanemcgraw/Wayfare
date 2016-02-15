angular.module('wayfare.form', [])

.controller('FormController', function ($scope, $http) {
  
  $scope.data = {
  	destinations: [
	  	{
	  		name: "Tartine Bakery",
	  		latitude: 37.761418,
	  		longitude: -122.424104
	  	},
  	],
  	location: {
  		latitude: null,
  		longitude: null
  	}
  };

	if ("geolocation" in navigator) {
	  // geolocation is available
	  navigator.geolocation.getCurrentPosition(function (position) {

	    $scope.data.location.latitude = position.coords.latitude;
	    $scope.data.location.longitude = position.coords.longitude;

	  	console.log($scope.data);
	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}


  $scope.postLoc = function(loc){
    console.log("great scott! You entered:", loc);
    window.loc = loc;
  }


  window.loc = $scope.loc;
});
