// Shop SERVICE
function shopsService($http) {
    return {
        getShops: function () {
            return $http.get('/shop');
        },
        createShop: function (data) {
            return $http.post('/shop', data);
        },
        // shopLinkBrand: function (id, brand){
        //     return $http.put('/shopLinkBrand/' + id, brand);
        // },
        updateShop: function (id, data) {
            return $http.put('/shop/' + id, data);
        },
        deleteShop: function (id) {
            return $http.delete('/shop/' + id);
        }
    };
}
