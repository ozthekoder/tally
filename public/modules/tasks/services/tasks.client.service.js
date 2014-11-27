'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('tasks').factory('Tasks', ['$resource',
	function($resource) {
		return $resource('tasks/:taskId', {
			taskId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
            today : {
                method: 'GET',
                url : 'tasks/today',
                isArray : true
            },
            checkoff : {
                method: 'PUT',
                url : 'tasks/checkoff/:taskId'
            }
		});
	}
]);