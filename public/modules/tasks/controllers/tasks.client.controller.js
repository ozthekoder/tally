'use strict';

angular.module('tasks').controller('TasksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tasks',
	function($scope, $stateParams, $location, Authentication, Tasks) {
		$scope.authentication = Authentication;


        $scope.setCheckDay = function(day){

            $scope.currentCheckOn = 'Choose Day';
            if($scope.task.repeat.period === 'weekly')
            {
                $scope.checkOnWeek = day;
                $scope.currentCheckOn = $scope.daysInWeek[day];
            }
            else if($scope.task.repeat.period === 'monthly')
            {
                $scope.checkOnMonth = day;
                $scope.currentCheckOn = day;
            }
            $scope.task.repeat.checkOn = day;
            console.log($scope.currentCheckOn);
        };

        $scope.setExpectedTime = function(time){
            $scope.task.expectedTime = time;
        };



        $scope.init = function(){
            $scope.daysInWeek = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            $scope.checkOnWeek = 0;
            $scope.checkOnMonth = 1;
            $scope.daysInMonth = [];
            $scope.currentCheckOn = 1;
            for(var i=1; i<=28; i++)
            {
                $scope.daysInMonth.push(i);
            }

            $scope.times = [];

            for(i=1; i<=8; i++)
            {
                $scope.times.push(i);
            }

            $scope.task = {
                title: '',
                description: '',
                priority: 2,
                expectedTime : 1,
                repeat : {
                    period: 'daily',
                    checkOn: 1
                }
            };
        };

		$scope.create = function() {

            if(this.task.repeat.period !== 'daily')
                this.task.repeat.checkOn = this.task.repeat.period === 'weekly' ? this.checkOnWeek : this.checkOnMonth;
            var task = new Tasks(this.task);
            console.log(task);
            task.$save(function(response) {
				$location.path('tasks/' + response._id);

				$scope.title = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(task) {
			if (task) {
                task.$remove();

				for (var i in $scope.tasks) {
					if ($scope.tasks[i] === task) {
						$scope.tasks.splice(i, 1);
					}
				}
			} else {
				$scope.task.$remove(function() {
					$location.path('tasks');
				});
			}
		};

		$scope.update = function() {
			var task = $scope.task;

            task.$update(function() {
				$location.path('tasks/' + task._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.tasks = Tasks.query();
		};

        $scope.today = function() {
            $scope.tasks = Tasks.today();
            console.log($scope.tasks);
        };

		$scope.findOne = function() {
            $scope.init();
			$scope.task = Tasks.get({
				taskId: $stateParams.taskId
			},function(task){
                $scope.setCheckDay(task.repeat.checkOn);
            });


		};
	}
]);