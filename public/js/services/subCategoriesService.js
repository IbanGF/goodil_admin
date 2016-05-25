// Brand CATEGORY
function subCategoriesService($http) {
    return {
        getSubCategories: function () {
            return $http.get('/subCategory');
        },
        updateSubCategory: function (id, data) {
            return $http.put('/subCategory/' + id, data);
        },
        createSubCategory: function (data) {
            return $http.post('/subCategory', data);
        },
        deleteSubCategory: function (id, category_id) {
            return $http.delete('/subCategory/' + id + '/' + category_id);
        }
    };
}
