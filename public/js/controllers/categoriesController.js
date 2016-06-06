// Brand CONTROLLER
function categoriesController($scope, Upload, categoriesService, subCategoriesService) {
  $scope.title = "Catégories";

  function load() {
    categoriesService.getCategories().then(function(res) {
      $scope.categories = res.data;
    });
  }

  // selectCategory
  $scope.selectCategory = function(category) {
    $scope.selectedCategory = category;
  };
  // addCategory
  $scope.addCategory = function() {
    var addedCategory = {};
    addedCategory.name = $scope.addedCategory.name;
    Upload.upload({
      url: '/category/uploadCategoryImage',
      file: $scope.addedCategory.logo
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      addedCategory.logo = data.path;
      categoriesService.createCategory(addedCategory).then(function(res) {
        load();
      });
    });
  };
  // updateCategory
  $scope.updateCategory = function(category) {
    Upload.upload({
      url: '/category/uploadCategoryImage',
      file: $scope.selectedCategory.logo
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      category.logo = data.path;
      categoriesService.updateCategory(category._id, category).then(function(res) {
        load();
      });
    });
  };
  // deleteCategory
  $scope.deleteCategory = function(category) {
    categoriesService.deleteCategory(category._id).then(function(res) {
      load();
    });
  };
  // addSubCategory
  $scope.addSubCategory = function() {
    var addedSubCategory = {};
    addedSubCategory = $scope.addedSubCategory;
    Upload.upload({
      url: '/subCategory/uploadSubCategoryImage',
      file: $scope.addedSubCategory.logo
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      addedSubCategory.logo = data.path;
      addedSubCategory.category = $scope.selectedCategory._id;
      console.log(addedSubCategory);
      subCategoriesService.createSubCategory(addedSubCategory).then(function(res) {
        load();
      });
    });
  };
  // updateSubCategory
  $scope.updateSubCategory = function(subCategory) {
    subCategoriesService.updateSubCategory(subCategory._id, subCategory).then(function(res) {
      load();
    });
  };
  // deleteSubCategory
  $scope.deleteSubCategory = function(subCategory) {
    subCategoriesService.deleteSubCategory(subCategory._id, subCategory.category).then(function(res) {
      load();
    });
  };
  load();
}
