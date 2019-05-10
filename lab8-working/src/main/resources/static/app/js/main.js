var wafepaApp = angular.module("wafepaApp", ['ngRoute']);

wafepaApp.controller("homeCtrl", function($scope){
	$scope.message = "Hello JWD 36!";
});


wafepaApp.controller("activitiesCtrl", function($scope, $http, $location){
	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		var promise = $http.get(baseUrl);
		promise.then(
			function success(res){
				//console.log(res);
				$scope.activities = res.data;
			},
			function error(res){
				//console.log(res);
				alert("Couldn't fetch activities!");
			}
		);
		console.log("Test");
	}
	
	getActivities();
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
	$scope.doDelete = function(id){
		$http.delete(baseUrl + "/" + id).then(
			function success(res){
				getActivities();
			},
			function error(res){
				alert("Couldn't delete the activity");
			}
		);
	}
});


wafepaApp.controller("editActivityCtrl", function($scope, $http, $routeParams, $location){
	
	//console.log($routeParams);
	
	var url = "/api/activities/" + $routeParams.id;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		var promise = $http.get(url);
		promise.then(
			function uspeh(odg){
				$scope.activity = odg.data;
			},
			function neuspeh(odg){
				alert("Couldn't fetch the activity");
			}
		);
	}
	
	getActivity();
	
	$scope.doEdit = function(){
		$http.put(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't save the activity")
			}
		);
	}
	
});


wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	$scope.doAdd = function(){
		//console.log($scope.newActivity.name);
		$http.post(url, $scope.newActivity).then(
			function success(res){
				$location.path("/activities");
			},
			function error(res){
				alert("Couln't save the activity");
			}
		);
	}
	
});


wafepaApp.controller("recordsCtrl", function($scope, $http){
	
	var url = "/api/records";
	var activitiesUrl = "/api/activities";
	var usersUrl = "/api/users";
	
	$scope.records = [];
	$scope.activities = [];
	$scope.users = [];
	
	$scope.newRecord = {};
	$scope.newRecord.time = "";
	$scope.newRecord.duration = "";
	$scope.newRecord.intensity = "";
	$scope.newRecord.activityId = "";
	$scope.newRecord.userId = "";
	
	
	var getRecords = function(){
		var promise = $http.get(url);
		promise.then(
			function success(res){
				$scope.records = res.data;
			},
			function error(){
				alert("Couldn't fetch records");
			}
		);
	}
	
	getRecords();
	
	var getActivities = function(){
		var promise = $http.get(activitiesUrl);
		promise.then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(res){
				alert("Couldn't fetch activities");
			}
		);
	}
	
	getActivities();
	
	var getUsers = function(){
		var promise = $http.get(usersUrl);
		promise.then(
			function success(res){
				$scope.users = res.data;
			},
			function error(){
				alert("Couldn't fetch users");
			}
		);
	}
	
	getUsers();
	
	$scope.doAdd = function(){
		//console.log($scope.newRecord);
		$http.post(url, $scope.newRecord).then(
			function success(res){
				getRecords();
				
				
				$scope.newRecord.time = "";
				$scope.newRecord.duration = "";
				$scope.newRecord.intensity = "";
				$scope.newRecord.activityId = "";
				$scope.newRecord.userId = "";
			},
			function error(){
				alert("Couldn't save the record");
			}
		);
	}
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			template : `<div>
							<h1>{{message}}</h1>
						</div>`,
			controller : "homeCtrl"
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:id', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.when('/records', {
			templateUrl : '/app/html/records.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);