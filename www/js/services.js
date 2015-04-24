angular.module('novi.service', [])
.factory('messageList', function () {
        return {
		
			default : [
				"Enter pin",
				"Confirm Enter pin",
				"Pins do not match",
			],
			
			attempt :[
				"",
				"Invalid. Two more attempts",
				"Invalid. One more attempts",
			]
		}
    })
.factory('pinsService', ['$q', '$timeout', function ($q, $timeout) {
    var _pin = '1111'; //TODO: delete demo pin 
    var _count_tries = 0; // counter tries
	
    return {
		pin : '',
        getCountEntryErrors: function(){
                return _count_tries;
        },
        // business logic validate the security pin
        checkPin: function (value) {
            var deferred = $q.defer();
            //TODO: change 
            $timeout(function () {
                if (value === _pin) {
                    _count_tries = 0;
                    deferred.resolve('Success');
                } else {
                    _count_tries = _count_tries + 1;
                    if (_count_tries > 4) {
                       // alert('User Logout');
                       _count_tries = 0;
                    }
                    deferred.reject('error');
                }
            }, 1000);
            return deferred.promise;
        },

        checkConfirmPin: function (pin, confirmPin) {
            var deferred = $q.defer();
            $timeout(function () {
                if (pin === confirmPin) {
                    deferred.resolve('success');
                } else {
                    deferred.reject('error');
                }
            }, 1000);
            return deferred.promise;
        },

    }

 }])
.factory('usersService', ['$q', '$timeout', function($q, $timeout){
	var demoUser = 'demo';
	var demoPassword = '1234';
	var auth = true;  
	return {
		userAuth : function( username, password){
		
			var deferred = $q.defer();
			$timeout(function () {
				if ( username == demoUser && password == demoPassword) {
					deferred.resolve({
						status : 'success',
						_token : Math.random()
					});
				} else {
					deferred.reject({
						status : 'error'
					});
				}
			}, 1000);

			return deferred.promise;
		},

		isAuth : function(){
			return auth;
		},	

		getDemoData : {
			user: demoUser,
			password: demoPassword
		}
	}
	
 }]);