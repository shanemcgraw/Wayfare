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
	  		});
	  	}
	  	
	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}





	//Put all this on the server end one day

 


  //window.loc = $scope.loc;
});
