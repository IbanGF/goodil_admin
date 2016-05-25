// Brand CONTROLLER
function categoriesController($scope, categoriesService, subCategoriesService) {
    $scope.title = "Catégories";

    function load() {
        categoriesService.getCategories().then(function (res) {
            $scope.categories = res.data;
        });
    }

    $scope.selectCategory = function(category) {
      $scope.selectedCategory = category;
    };
    $scope.addCategory = function () {
        var addedCategory = {};
        addedCategory = $scope.addedCategory;
        categoriesService.createCategory(addedCategory).then(function (res) {
            load();
        });
    };
    $scope.updateCategory = function (category) {
        categoriesService.updateCategory(category._id, category).then(function (res) {
            load();
        });
    };
    $scope.deleteCategory = function (category) {
        categoriesService.deleteCategory(category._id).then(function (res) {
            load();
        });
    };
    
    $scope.addSubCategory = function () {
        var addedSubCategory = {};
        addedSubCategory = $scope.addedSubCategory;
        addedSubCategory.category = $scope.selectedCategory._id;
        subCategoriesService.createSubCategory(addedSubCategory).then(function (res) {
            load();
        });
    };
    $scope.updateSubCategory = function (subCategory) {
        subCategoriesService.updateSubCategory(subCategory._id, subCategory).then(function (res) {
            load();
        });
    };
    $scope.deleteSubCategory = function (subCategory) {
        subCategoriesService.deleteSubCategory(subCategory._id, subCategory.category).then(function (res) {
            load();
        });
    };
    load();
}
