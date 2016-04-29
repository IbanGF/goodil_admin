// Shop SERVICE
function bvService($http) {
    return {
        findAllBV: function (page) {
            return $http.get('/AllBV/' + page);
        },
        geocode: function () {
            return $http.get('/Geocode');
        }
    }
};