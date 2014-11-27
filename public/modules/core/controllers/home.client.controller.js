'use strict';


angular.module('core').factory('socket', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('error');
    return socket;
}).controller('HomeController', ['$scope', 'Authentication','$location', 'socket',
	function($scope, Authentication, $location, socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        if($scope.authentication.user)
            $location.path('tasks/today');
        console.log('Auth: ');
        console.log($scope.authentication);
        socket.emit('message', { my : 'Hello World!!!' });
        socket.on('message', function (data) {
            console.log(data);
        });
        socket.on('broadcast', function (data) {
            console.log(data);
        });
        socket.on('error', function (data) {
            console.log(data);
        });
	}
]);