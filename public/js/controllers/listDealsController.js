// listDeals CONTROLLER
function listDealsController($scope, $http, dealsService, categoriesService, brandsService) {
  $scope.title = "Lister et modifier les offres";

  $scope.getDealsInSubCategory = function(subCategory_id) {
    $scope.selected = {
      name: "subCategory",
      id: subCategory_id
    };
    dealsService.getDealsInSubCategory(subCategory_id).then(function(res) {
      $scope.deals = res.data;
    });
  };

  $scope.getDealsInShop = function(shop_id) {
    $scope.selected = {
      name: "shop",
      id: shop_id
    };
    dealsService.getDealsInSshop(shop_id).then(function(res) {
      $scope.deals = res.data;
    });
  };

  function load() {
    if ($scope.selected.name == 'subCategory') {
      dealsService.getDealsInSubCategory($scope.selected.id).then(function(res) {
        $scope.deals = res.data;
      });
    } else {
      dealsService.getDealsInSubCategory($scope.selected.id).then(function(res) {
        $scope.deals = res.data;
      });
    }
  }

  categoriesService.getCategories().then(function(res) {
    $scope.categories = res.data;
  });

  brandsService.getBrands().then(function(res) {
    $scope.brands = res.data;
    console.log($scope.brands);
  });

  $scope.delete = function(deal_id) {
    dealsService.deleteDeal(deal_id).then(function(res) {
      load();
    });
  };


}
