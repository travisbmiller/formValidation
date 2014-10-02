var app = angular.module('devSocial');

app.controller('signupCtrl', function($scope) {

	$scope.submitted = false;

	$scope.signupForm = function(isValid) {
		if(isValid) {
			console.log('valid')
		} else {
			console.log('not valid')
			$scope.signup_form.submitted = true;
		}
	}


});

app.directive('ngFocus', [function() {
	var FOCUS_CLASS = 'ng-focused';
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			ctrl.$focused = false;
			element.bind('focus', function(evt) {
				element.addClass(FOCUS_CLASS);
				scope.$apply(function() {
					ctrl.$focused = true;
				});
			}).bind('blur', function(evt) {
				element.removeClass(FOCUS_CLASS);
				scope.$apply(function() {
					ctrl.$focused = false;
				})
			})
		}
	}
}]);

app.directive('ensureUnique', function(signupService) {
	console.log('ensureUnique')
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, ctrl) {
			console.log(scope.username);
			scope.$watch(attrs.ngModel, function(n) {
				console.log(n)
				if(!n) return;
				signupService.uniqueUsername(n).then(function(result) {
					if(result.userExist) {
						console.log('userexist')
						ctrl.$setValidity('unique', true);
					} else {
						console.log('userdoesntexist')
						ctrl.$setValidity('unique', false);
					}
				})
			})
		}
	}
})