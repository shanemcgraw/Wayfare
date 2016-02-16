angular.module('ngMap')
.controller('MapController', function($scope, $timeout, NgMap, $http) {
  var vm = this;
  
  vm.initMap = function(mapId) {
    vm.map = NgMap.initMap(mapId);
  }

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
  	  		    loc.timeEstimate = (response.data.prices[0].duration / 60) + " minutes";
  	  		    loc.priceEstimate = (response.data.prices[0].estimate);
  	  		    loc.low = response.data.prices[0].low_estimate;
  	  		    loc.high = response.data.prices[0].high_estimate;

  	  		    //torch(loc);

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

// angular.module('wayfare.map', ['ngMap'])

// .controller('HeatmapController', function ($scope, NgMap) {
//   var heatmap, context = this;

//   NgMap.getMap()
//   .then(function (map) {
//     context.map = map;
//     console.log(map);
//     heatmap = context.map.heatmapLayers;
//     $scope.map = map;
//   });
// })