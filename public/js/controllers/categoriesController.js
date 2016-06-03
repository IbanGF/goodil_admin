// Brand CONTROLLER
function categoriesController($scope, Upload, categoriesService, subCategoriesService) {
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
        addedCategory.name = $scope.addedCategory.name;
        Upload.upload({
          url: '/brand/uploadBrandImage',
          file: $scope.addedCategory.logo
        }).progress(function(event) {
          var progressPercentage = parseInt(100.0 * event.loaded / event.total);
          console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
        }).success(function(data, status, headers, config) {
          console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
          addedCategory.logo = data.path;
          categoriesService.createCategory(addedCategory).then(function (res) {
              load();
          });
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
