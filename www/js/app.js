// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('novi', ['ionic', 'ngCordova', 'novi.controllers', 'novi.service'])

.run(['$ionicPlatform', '$state', '$timeout', function ($ionicPlatform, $state, $timeout) {
		
	$ionicPlatform.ready(function () {
		document.addEventListener("pause", onResume, false);
		function onResume() {
	    	$state.go('core.pin.enter');
	    }
		/*
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
			alert('deviceready');
			setTimeout(function() {
	          	document.addEventListener("pause", onPause, true);
      	  		document.addEventListener("resume", onResume, true);
	        }, 5000);
   		}

   		/*
   		$ionicPlatform.on("resume", function(event) {
    		alert('resume');
		});

   		/*
	    // Handle the pause event
	    //
	    function onPause() {
	    	alert('pause');
	    	setTimeout(function() {
	          	alert('pause');
	        }, 0);
	    }

	    function onResume() {
	    	alert('resume');
	    	setTimeout(function() {
	          	alert('resume');
	        }, 0);
	    }
		/*
	    document.addEventListener("deviceready", function () {
            document.addEventListener("resume", function () {
                $timeout(function () {
                    alert('resume');
                }, 100);
            }, false);
        });
		*/
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

	});

}])

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/app/sign-in');
	
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true, 
			templateUrl: 'templates/app.tpl.html'
            //TODO: add controller
		})
        .state('app.signIn', {
            url: '/sign-in',
			views: {
                'content': {
                    templateUrl: 'templates/sign-in.tpl.html',
					controller: 'SignInCtrl'
                }
            }
        })
		.state('app.signUp', {
            url: '/sign-up',
            views: {
                'content': {
                    templateUrl: 'templates/sign-up.tpl.html'
					//TODO: add controller
                }
            }
        });
		
    $stateProvider
        .state('core', {
            url: '',
            abstract: true, 
        })
		.state('core.pin', {
			url: '',
			abstract: true,
			resolve: {
				user: ['$q', '$timeout', function ($q, $timeout) {
					var deffer = $q.defer();
					$timeout(function () {
						deffer.resolve('')
					}, 100);
					return deffer.promise;
				}]
			}
		})
		.state('core.pin.enter', {
			url: '/pin',
			views: {
				'@': {
					templateUrl: 'templates/enter-pin.html',
					controller: 'PinEnterCtrl'
				}
			}
		})
		.state('core.pin.create', {
			url: '/pin/create',
			views: {
				'@': {
					templateUrl: 'templates/create-pin.html',
					controller: 'CreatePinCtrl'
				}
			}			
		})
		.state('core.pin.confirm', {
			url: '/confirm',
			views: {
				'@': {
					templateUrl: 'templates/create-pin.html',
					controller: 'ConfirmPinCtrl'
				}
			}
		})			
		.state('core.account', {
			url: '/account',
			abstract: true, 
			views: {
				'@': {
					templateUrl: 'templates/account.tpl.html',
				}
			}
		})	
		.state('core.account.setting', {
			url: '/setting',
			views: {
				'accountContent': {
					templateUrl: 'templates/setting.tpl.html',
				}
			}		
		})	
		.state('core.account.create-pin', {
			url: '/change-pin',
			views: {
				'accountContent': {
					templateUrl: 'templates/change-pin.tpl.html',
					controller: 'CreatePinCtrl',
				}
			}		
		})
		
})