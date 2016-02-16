angular.module('wayfare.form', [])

.controller('FormController', function ($scope, $http) {
  

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
			latitude: 37.804933
			longitude: -122.430329
		}],
  	location: {
  		latitude: null,
  		longitude: null
  	}
  };

  var test = $scope.data.destinations[0];
  var currentLat;
  var currentLong;
  
	$scope.statusMessage = "Assembling the four winds...";
	$scope.notReady = true;

  $scope.request = {
  	server_token: 'JksNcozbSKYhHTP5LYlQfe1bW_yALIU3brH6S_7b',
  	url: 'https://api.uber.com/v1/estimates/price',
  	startLat: currentLat,
  	startLong: currentLong,
  	endLat: test.latitude,
  	endLong: test.longitude,
  };

	if ("geolocation" in navigator) {
	  // geolocation is available
	  navigator.geolocation.getCurrentPosition(function (position) {

	    currentLat = position.coords.latitude;
	    currentLong = position.coords.longitude;

		  $scope.data.location.latitude = currentLat;
		  $scope.data.location.longitude = currentLong;

	  	$scope.$apply(function(){
	  		$scope.statusMessage = "The four winds are at your command!";
	  		$scope.notReady = false;
	  	});

	  	$scope.postLoc = function () {
	  		$http({
	  			method: 'GET',
	  			url: $scope.request.url,
	  			headers: {
	  				Authorization: 'Token ' + $scope.request.server_token
	  			},
	  			params: {
	  				server_token: $scope.request.server_token,
	  				start_latitude: currentLat,
	  				start_longitude: currentLong,
	  				end_latitude: $scope.request.endLat,
	  				end_longitude: $scope.request.endLong
	  			}
	  		}).then(function (response) {
	  			console.log(response);
	  			$scope.tartineTime = (response.data.prices[0].duration / 60) + " minutes";
	  			$scope.tartineMones = (response.data.prices[0].estimate + " " + response.data.prices[0].currency_code);
	  		});
	  	}
	  	
	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}


});
