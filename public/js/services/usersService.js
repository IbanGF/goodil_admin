function usersService($http) {
    return {
        getUsers: function () {
            return $http.get('/user');
        },
        updateUser: function (id, data) {
            return $http.put('/user/' + id, data);
        },
        createUser: function (data) {
            return $http.post('/user', data);
        },
        deleteUser: function (id) {
            return $http.delete('/user/' + id);
        }
    }
};