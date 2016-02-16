'use strict';
angular.module('wayfare', [
  'ngMap',
	'wayfare.form',
	'ngRoute',
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

.controller('HeatmapController', function (NgMap) {
  var heatmap, context = this;

  NgMap.getMap()
  .then(function (map) {
    context.map = map;
    heatmap = context.map.heatmapLayers.foo;
  });
})

//build services!
