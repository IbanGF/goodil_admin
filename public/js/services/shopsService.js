// Shop SERVICE
function shopsService($http) {
    return {
        getShops: function () {
            return $http.get('/shop');
        },
        updateShop: function (id, data) {
            return $http.put('/shop/' + id, data);
        },
        createShop: function (data) {
            return $http.post('/shop', data);
        },
        deleteShop: function (id) {
            return $http.delete('/shop/' + id);
        }
    }
};