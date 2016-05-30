// AddDeal CONTROLLER
function addDealController($scope, $http, Upload, shopsService, categoriesService, subCategoriesService, brandsService, bvService, dealsService, NgMap) {
  $scope.title = "Add a Deal";
  $scope.deal = {};
  $scope.centerMap = 'current-location';

  shopsService.getShops().then(function(res) {
    $scope.shops = res.data;
  });

  brandsService.getBrands().then(function(res) {
    $scope.brands = res.data;
  });

  subCategoriesService.getSubCategories().then(function(res) {
    $scope.subCategories = res.data;
  });

  categoriesService.getCategories().then(function(res) {
    $scope.categories = res.data;
  });

  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });

  $scope.changePlace = function() {
    setTimeout($scope.centerMap = $scope.deal.shop.point.coordinates, 1);
  };

  $scope.upload = function(file) {
    console.log(file);
    Upload.upload({
      url: '/deal/uploadDealImage',
      file: file
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      $scope.deal.image = data.path;
    });
  };

  $scope.addShop = function() {
    var addedShop = {};
    addedShop.name = $scope.addedShop.details.name;
    addedShop.address = $scope.addedShop.details.formatted_address.split(',');
    addedShop.logo = $scope.addedShop.logo;
    addedShop.brand = $scope.selectedBrand;
    addedShop.catchment_area_radius = $scope.addedShop.catchment_area_radius;
    addedShop.point = {};
    $scope.queryError = {};

    bvService.findOneBV($scope.addedShop.details.address_components[$scope.addedShop.details.address_components.length - 1].short_name).then(function(res) {
      addedShop.bassinDeVie = res.data;
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
          addedShop.address + '&key=AIzaSyCzGZv5NhDcGeAHRo-YSb2Lx0byBLpZNgc')
        .then(function(_results) {
            addedShop.point = {
              type: "Point",
              coordinates: [_results.data.results[0].geometry.location.lat, _results.data.results[0].geometry.location.lng]
            };
            $scope.deal.shop = _.clone(addedShop);
            console.log('bassin de vie last: ' + addedShop.bassinDeVie.BVName);
            console.log('$scope.deal: ' + $scope.deal);
            console.log('addedShop: ' + addedShop);
            addedShop.bassinDeVie = addedShop.bassinDeVie._id;
            addedShop.brand = $scope.selectedBrand._id;
            shopsService.createShop(addedShop).then(function(res) {
              shopsService.getShops().then(function(res) {
                $scope.shops = res.data;
              });
            });
          },
          function error(_error) {
            $scope.queryError = _error;
          });
    });
    $scope.addedShop = "";
  };

  $scope.addSubCategory = function() {
    $scope.deal.subCategory = $scope.addedSubCategory;
    $scope.addedSubCategory.category_id = $scope.selectedCategory._id;
    subCategoriesService.createSubCategory($scope.addedSubCategory).then(function(res) {
      subCategoriesService.getSubCategories().then(function(res) {
        $scope.subCategories = res.data;
      });
    });
    $scope.addedSubCategory = {};
  };

  $scope.addDeal = function(deal) {
    var createdDeal = deal;
    createdDeal.subCategory = deal.subCategory._id;
    createdDeal.shop = deal.shop._id;
    console.log(createdDeal);
    dealsService.createDeal(createdDeal).then(function(res) {
      console.log('deal created');
    });
  };

  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  $scope.monthShort = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  $scope.weekdaysLetter = ['L', 'M', 'Me', 'J', 'V', 'S', 'D'];
  $scope.disable = [false, 1, 7];
  $scope.today = 'Aujourd\'hui';
  $scope.clear = 'Rafraichir';
  $scope.close = 'Fermer';
  $scope.minDate = $scope.deal.start_date;

}
