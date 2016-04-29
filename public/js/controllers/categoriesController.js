// Brand CONTROLLER
function categoriesController($scope, categoriesService) {
    $scope.title = "Category List";

    function load() {
        categoriesService.getCategories().then(function (res) {
            $scope.categories = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.name = $scope.name;
        data.logo = $scope.logo;
        categoriesService.createCategory(data).then(function (res) {
            load();
        });
    }
    $scope.update = function (category) {
        categoriesService.updateCategory(category._id, category).then(function (res) {
            load();
        });
    }
    $scope.delete = function (category) {
        categoriesService.deleteCategory(category._id).then(function (res) {
            load();
        });
    }
    load();
}