'use strict';
angular.module('wayfare', [
  'ngMap',
	'wayfare.form',
	'ngRoute',
  'wayfare.map'
	])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../app/forms/forms.html',
      controller: 'FormController',
    })
    .otherwise({
      redirectTo: '/'
    });
})

.factory('Uber', function ($http) {
  var Uber = {};

  Uber.getRide = function (destinations, currentLat, currentLong) {

    var request = {
      server_token: 'JksNcozbSKYhHTP5LYlQfe1bW_yALIU3brH6S_7b',
      url: 'https://api.uber.com/v1/estimates/price',
      startLat: currentLat,
      startLong: currentLong,
      endLat: null,
      endLong: null,
    };

    var destData = [];

    destinations.forEach(function(loc, i){
      $http({
        method: 'GET',
        url: request.url,
        headers: {
          Authorization: 'Token ' + request.server_token
        },
        params: {
          server_token: request.server_token,
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
        torch(loc);
        console.log(response);
        destData.push(loc);
        if(destData.length - 1 === i){
          return destData;
        }
      })
      .catch(function(err){
        console.error(err);
      });

    });
  } 
  return Uber;
})