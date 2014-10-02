var app = angular.module('devSocial');

app.controller('loginCtrl', function($scope, loginService) {

	$scope.submitted = false;
	$scope.usernameIncorrect = false;
	$scope.passwordIncorrect = false;


	$scope.loginForm = function(isValid) {
		if(isValid) {
			loginService.loginUser($scope.user).then(function(res) {
				if(res.success) {

				} else {
					$scope.login_form.submitted = true;
					if(res.issue === 'username') {
						$scope.usernameIncorrect = true;
						$scope.errorMessage = res.message;
					} else {
						$scope.passwordIncorrect = true;
						$scope.errorMessage = res.message;
					}
					$scope.login_form.$setPristine();
					$scope.user = '';
				}
			})
		} else {
			$scope.login_form.submitted = true;
			$scope.user = '';
		}
	}


})