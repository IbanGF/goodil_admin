// Brand CONTROLLER
function subCategoriesController($scope, subCategoriesService, categoriesService) {
    $scope.title = "Sub category List";

    function load() {
        subCategoriesService.getSubCategories().then(function (res) {
            $scope.subCategories = res.data;
        });
        categoriesService.getCategories().then(function (res) {
            $scope.categories = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.name = $scope.name;
        data.logo = $scope.logo;
        data.category = $scope.selectedCategory._id;
        subCategoriesService.createSubCategory(data).then(function (res) {
            load();
        });
    };
    $scope.update = function (subCategory) {
        subCategoriesService.updateSubCategory(subCategory._id, subCategory).then(function (res) {
            load();
        });
    };
    $scope.delete = function (subCategory) {
        subCategoriesService.deleteSubCategory(subCategory._id, subCategory.category._id).then(function (res) {
            load();
        });
    };
    load();
}
