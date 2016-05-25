// Brand CATEGORY
function categoriesService($http) {
    return {
        getCategories: function () {
            return $http.get('/category');
        },
        updateCategory: function (id, data) {
            return $http.put('/category/' + id, data);
        },
        createCategory: function (data) {
            return $http.post('/category', data);
        },
        deleteCategory: function (id) {
            return $http.delete('/category/' + id);
        }
    };
}
