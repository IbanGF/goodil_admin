function usersController($scope, usersService) {
    $scope.title = "User List";

    function load() {
        usersService.getUsers().then(function (res) {
            $scope.users = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.nickname = $scope.nickname;
        data.email = $scope.email;
        data.encrypted_password = $scope.encrypted_password;
        data.first_name = $scope.first_name;
        data.last_name = $scope.last_name;

        usersService.createUser(data).then(function (res) {
            load();
        });
        $scope.description = "";
    }
    $scope.update = function (user) {
        usersService.updateUser(user._id, user).then(function (res) {
            load();
        });
    }
    $scope.delete = function (user) {
        usersService.deleteUser(user._id).then(function (res) {
            load();
        });
    }
    load();
}