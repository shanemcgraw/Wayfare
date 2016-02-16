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

.controller('HeatmapController', function (ngMap) {
  var heatmap, context = this;

  ngMap.getMap()
  .then(function (map) {
    context.map = map;
    heatmap = context.map.heatmapLayers.foo;
  });
})

//build services!
