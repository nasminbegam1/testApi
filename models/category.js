var CategoryModel = {
    index  : function(request, response){
        return global.bookshelf.Model.extend({
            tableName: 'categories'
        });
    }
}
module.exports = CategoryModel;