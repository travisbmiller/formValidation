var app = angular.module('devSocial');

app.service('signupService', function($http, $q) {

	this.uniqueUsername = function(username) {
		var deferred = $q.defer();

		$http({
			method: 'POST',
			url: 'http://localhost:1212/signup.verifyUsername',
			data: {
				username: username
			}
		}).success(function(res) {
			deferred.resolve(res);
		});
		return deferred.promise;
	};
});