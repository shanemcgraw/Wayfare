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

  var test = $scope.data.destinations[0];
  var currentLat = $scope.data.location.latitude;
  var currentLong = $scope.data.location.longitude;

  $scope.request = {
  	serverToken: 'JksNcozbSKYhHTP5LYlQfe1bW_yALIU3brH6S_7b',
  	url: 'https://api.uber.com/v1/estimates/price',
  	startLat: $scope.location.latitude,
  	startLong: $scope.location.longitude,
  	endLat: test.latitude,
  	endLong: test.longitude,
  };


	if ("geolocation" in navigator) {
	  // geolocation is available
	  navigator.geolocation.getCurrentPosition(function (position) {

	    currentLat = position.coords.latitude;
	    currentLong = position.coords.longitude;

	  	console.log($scope.data);
	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}


  $scope.postLoc = function(){
  	$http({
  		method: 'GET',
  		url: $scope.request.url,
  		params: {
  			start_latitude: $scope.request.startLat,
  			start_longitude: $scope.request.startLong,
  			end_latitude: $scope.request.endLat,
  			end_longitude: $scope.request.endLong
  		}
  	}).then(function (response) {
  		console.log(response);
  	});

    console.log("great scott!");
    window.loc = loc;
  }


  window.loc = $scope.loc;
});
