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