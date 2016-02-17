angular.module('ngMap')
.controller('MapController', function($scope, $timeout, NgMap, $http) {
  var vm = this;
  
  vm.initMap = function(mapId) {
    vm.map = NgMap.initMap(mapId);
    vm.heatmap.set('radius', 5);
  }

  var torch = function (ride) {
    var lat = ride.latitude;
    var long = ride.longitude;

    var priceAvg = Math.ceil(.5 * (parseInt(ride.high) - parseInt(ride.low))) * 100;

    for(var i=0; i<priceAvg; i++){
    	var polish = (.001010 * ((Math.random() * 2) + 1));
    	newPoint(lat - polish, long - polish)
      newPoint(lat + polish, long + polish)
      newPoint(lat + polish, long - polish)
      newPoint(lat - polish, long + polish)

      newPoint(lat, long + polish)
      newPoint(lat, long - polish)
      newPoint(lat + polish, long)
      newPoint(lat - polish, long)


    }
    for(var i=0; i<priceAvg; i++){
      newPoint(lat, long);    	
    }
  };

  var newPoint = function (lat, long) {
    var newRidePoint = new google.maps.LatLng(lat, long);
    rideData.push(newRidePoint);
    
  };

  $scope.avasted = true;
  $scope.data = {
  	destinations: [
		{
			name: "Academy of Sciences",
			latitude: 37.769458,
			longitude: -122.466352
		},
		{
			name: "Twin Peaks",
			latitude: 37.751754,
			longitude: -122.447252
		},
		{
			name: "Coit Tower",
			latitude: 37.802174,
			longitude: -122.405865
		},
		{
			name: "Fort Point",
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
			name: "Lake Merced",
			latitude: 37.723204,
			longitude: -122.492416
		},
		{
			name: "Land's End",
			latitude: 37.784993, 
			longitude: -122.506154
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
	$scope.noHeading = true;
	$scope.mapIncomplete = true;

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
	  		$scope.statusMessage = "Ready to chart a course...";
	  		$scope.noHeading = false;
	  	});

	  	$scope.postLoc = function () {
	  		//Uber.getRide($scope.data.destinations, currentLat, currentLong);
	  		var destinations = $scope.data.destinations;
	  		
	  		destinations.forEach(function(loc, i){
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
	  		      end_latitude: loc.latitude,
	  		      end_longitude: loc.longitude
	  		    }
	  		  })
	  		  .then(function (response) {
	  		  	$scope.avasted = false;
	  		    loc.timeEstimate = (response.data.prices[0].duration / 60) + " minutes";
	  		    loc.priceEstimate = (response.data.prices[0].estimate);
	  		    loc.low = response.data.prices[0].low_estimate;
	  		    loc.high = response.data.prices[0].high_estimate;

	  		    torch(loc);
	  		    if(i === destinations.length - 1){
	  		    	$scope.statusMessage = "Ready to set sail";
	  		    	$scope.mapIncomplete = false;
	  		    }
	  		  })
	  		  .catch(function(err){
	  		    console.error(err);
	  		  });

	  		});
	  	};

	  });

	} else {
	  alert("Please ensure location services are enabled in your browser");
	}



});