// listDeals CONTROLLER
function listDealsController($scope, $http, dealsService, categoriesService, brandsService) {
  $scope.title = "Lister et modifier les offres";

  $scope.getDealsInSubCategory = function(subCategory_id) {
    dealsService.getDealsInSubCategory(subCategory_id).then(function(res) {
      $scope.dealsInSubCategory = res.data;
      console.log(dealsInSubCategory);
    });
  };

  $scope.getDealsInShop = function(shop_id) {
    dealsService.getDealsInSshop(shop_id).then(function(res) {
      $scope.dealsInShop = res.deal;
      console.log('dealsInShop' + $scope.dealsInShop);
    });
  };

  categoriesService.getCategories().then(function(res) {
    $scope.categories = res.data;
  });

  brandsService.getBrands().then(function(res) {
    $scope.brands = res.data;
    console.log($scope.brands);
  });


}
