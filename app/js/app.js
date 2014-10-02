'use strict';

var app = angular.module('devSocial', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'app/js/home/home.html',
      controller: 'homeCtrl'
      // resolve: {
      //   allData: function($route, homeService){
      //     return homeService.getAllData();
      //   }
      // }
    })
    .otherwise({
      redirectTo: '/'
    });

}]);