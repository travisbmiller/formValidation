var app = angular.module('devSocial');

app.service('loginService', function($http, $q) {

	this.loginUser = function(user) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: 'http://localhost:1212/login/',
			data: {
				user: user
			}
		}).success(function(res) {
			deferred.resolve(res);
		});
		return deferred.promise;
	}


});