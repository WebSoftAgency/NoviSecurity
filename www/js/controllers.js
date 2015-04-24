angular.module('novi.controllers', ['novi.service', 'ngCordova'])
.controller('PinEnterCtrl', ['$scope', '$state', '$ionicPopup', '$ionicHistory', 'messageList', 'pinsService', '$ionicLoading', '$cordovaVibration', function ($scope, $state, $ionicPopup, $ionicHistory, messageList, pinsService, $ionicLoading, $cordovaVibration) {

        $scope.messageList = messageList;
        $scope.message = '';
        $scope.pin = '';

        $scope.enter = function (value) {
            if ($scope.pin.length < 4) {
                $scope.pin += value;
            };
        }

        $scope.del = function () {
            if ($scope.pin.length != 0) {
                $scope.pin = $scope.pin.slice(0, -1);
            };
        }

        $scope.$watch('pin', function (newVal, oldVal) {
            if (newVal != oldVal) {
                if (newVal.length == 4) {
                    $ionicLoading.show({
                        template: 'Please wait...'
                    });
                    /* Call validation */
                    pinsService.checkPin(newVal)
                        .then(
                            function (data) {
                                $scope.message = data;
                                $scope.pin = '';
								pinsService.getCountEntryErrors = 0;
                                $state.go('core.account.setting');                         
                            },
                            function (err) {
                                $scope.message = err;
                                $scope.pin = '';
                                $cordovaVibration.vibrate(100);
                            })
                        .finally(function () {
                            $ionicLoading.hide()
                        });
                }
            }
        }, true);
        /*
        Controll count errors
        */
        $scope.$watch(pinsService.getCountEntryErrors, function (newVal, oldVal) {		
            if (newVal != oldVal && newVal == 3) {
                pinsService.getCountEntryErrors = 0;
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
                $state.go('app.signIn')
            }
			$scope.message = $scope.messageList.attempt[newVal];
        });

 }])
.controller('CreatePinCtrl', function ($scope, $state, messageList, pinsService, $ionicPopup, $ionicLoading, $ionicHistory) {
	//TODO: controller don't init  second time when return back the scope
    $scope.messageList = messageList;
    $scope.message = $scope.messageList.default[0];
	
    $scope.pin = '';
	
    $scope.enter = function (value) {
        if ($scope.pin.length < 4) {
            $scope.pin += value;
        };
    }

    $scope.del = function () {

        if ($scope.pin.length != 0) {
            $scope.pin = $scope.pin.slice(0, -1);
        };
    }

    $scope.$watch('pin', function (newVal, oldVal) {
        if (newVal != oldVal) {
            if (newVal.length == 4) {				
				pinsService.pin = $scope.pin;
				$state.go('core.pin.confirm');
            }
        }
    }, true);
	
	$scope.goBack = function(){
		$state.go('core.account.setting');
	}
	
})
.controller('ConfirmPinCtrl', function ($scope, $state, messageList, pinsService, $ionicPopup, $ionicLoading, $ionicHistory) {
	
    $scope.messageList = messageList;
    $scope.message = $scope.messageList.default[0];

    $scope.pin = '';
    $scope.confirmPin = pinsService.pin;
    $scope.enter = function (value) {
        if ($scope.pin.length < 4) {
            $scope.pin += value;
        };
    }

    $scope.del = function () {

        if ($scope.pin.length != 0) {
            $scope.pin = $scope.pin.slice(0, -1);
        };
    }

    $scope.$watch('pin', function (newVal, oldVal) {
        if (newVal != oldVal) {
            if (newVal.length == 4) {
                if ($scope.pin.length == 4 && $scope.confirmPin.length == 4) {
					
                    if ($scope.pin === $scope.confirmPin) {
                        pinsService.checkConfirmPin($scope.pin, $scope.confirmPin).then(function (data) {
                            $scope.message = $scope.messageList.default[1];
                            $scope.pin = '';
                            $scope.confirmPin = '';
							$ionicHistory.nextViewOptions({
								disableAnimate: true,
								disableBack: true
							});
                            $state.go('core.account.setting');
                        }, function (err) {
							
                        });

                    }else {
						$scope.pin = '';
						$scope.message = $scope.messageList.default[2];
					} 
					
                } 				
            }
        }
    }, true);
	
	$scope.goBack = function(){		
		$state.go('core.pin.create');
	}
})
.controller('SignInCtrl', function($scope, $state, $ionicLoading, usersService){
	
	$scope.user = {};
	
    $scope.demoData = usersService.getDemoData;
	$scope.reset = function(){
		$scope.user.name = null;
		$scope.user.password = null;
	}
	
	$scope.signIn = function(){
		if( $scope.user.name && $scope.user.password) {
			
			var statusAuth = usersService.userAuth( $scope.user.name, $scope.user.password);
			$ionicLoading.show({
                template: 'Please wait...',
                duration: 1000
            });
			statusAuth
				.then(
					function (response) {
						if( response.status == 'success') {
							// TODO save response.token in localStorage 
							$scope.reset();
							$state.go('core.account.setting');
						} else {
							$scope.reset();
						}						
					},
					function (err) {
                        $scope.reset();
						console.log(err); 
					})
				.finally(function () {
					
				});
				
		} else {
			$scope.reset();
		}
	}
	
})
.controller('SignUpCtrl', function($scope, $state, usersService){
	
})




