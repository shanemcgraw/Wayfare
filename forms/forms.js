angular.module('wayfare.form', [])

.controller('FormController', function ($scope, $http, Uber) {
  

  $scope.data = {
  	destinations: [{
			name: "Tartine Bakery",
			latitude: 37.761418,
			longitude: -122.424104
		},
		{
			name: "The Painted Ladies",
			latitude: 37.776103,
			longitude: -122.432738
		},
		{
			name: "Coit Tower",
			latitude: 37.802174,
			longitude: -122.405865
		},
		{
			name: "Golden Gate Bridge",
			latitude: 37.810426,
			longitude: -122.476865
		},
		{
			name: "Dolores Park",
			latitude: 37.759467,
			longitude: -122.426398
		},
		{
			name: "Ferry Building",
			latitude: 37.795333,
			longitude: -122.393494
		},
		{
			name: "AT&T Park",
			latitude: 37.778256,
			longitude: -122.389238
		},
		{
			name: "Fort Mason",
			latitude: 37.804933,
			longitude: -122.430329
		}],
  	location: {
  		latitude: null,
  		longitude: null
  	}
  };

  var currentLat;
  var currentLong;
  
	$scope.statusMessage = "Assembling the four winds...";
	$scope.notReady = true;

  $scope.request = {
  	server_token: 'JksNcozbSKYhHTP5LYlQfe1bW_yALIU3brH6S_7b',
  	url: 'https://api.uber.com/v1/estimates/price',
  	startLat: currentLat,
  	startLong: currentLong,
  	endLat: null,
  	endLong: null,
  };

	if ("geolocation" in navigator) {
	  // geolocation is available
	  navigator.geolocation.getCurrentPosition(function (position) {

	    currentLat = position.coords.latitude;
	    currentLong = position.coords.longitude;

		  $scope.data.location.latitude = currentLat;
		  $scope.data.location.longitude = currentLong;

	  	$scope.$apply(function(){
	  		$scope.number = 0;
	  		$scope.statusMessage = "We have a heading!";
	  		$scope.notReady = false;
	  	});

	  	$scope.postLoc = function () {
	  		Uber.getRide($scope.data.destinations, currentLat, currentLong);
	  	};

	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}

});
