// Brand SERVICE
function brandsService($http) {
    return {
        getBrands: function () {
            return $http.get('/brand');
        },
        updateBrand: function (id, brand) {
            return $http.put('/brand/' + id, brand);
        },
        createBrand: function (brand) {
            return $http.post('/brand', brand);
        },
        deleteBrand: function (id) {
            return $http.delete('/brand/' + id);
        }
    };
}
