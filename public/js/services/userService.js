function userService($http){
	return {
		getUsers: function(){
			return $http.get('/api/users');
		},
		create: function(user){
			return $http.post('/api/users', user);
		}
	};
}
