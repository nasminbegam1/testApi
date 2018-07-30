var category 	= require('../models/category');

var HomeController = {
    index  : function(req, res){
        category.index().forge().fetchAll().then(function(category) {
            res.send({'ResultCode': '200', 'categories' : category.toJSON()});
        }).catch(function(err) {
            res.send({'ResultCode': '200', 'categories' : []});
        });
        
    },
    edit  : function(req, res){
        var id          = req.params.id;
        category.index().where('id', id).fetch().then(function(category) {
            res.send({'ResultCode': '200', 'categories' : category.toJSON()});
        }).catch(function(err) {
            res.send({'ResultCode': '200', 'categories' : []});
        });
        
    },
    update : function(req, res, nexts){
        req.checkBody('name', 'Name is required').notEmpty().isName(req.body.name).withMessage('Name already exists');
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('status', 'Status is required').notEmpty();
        
        var id     = req.params.id;
        var errors = req.validationErrors();
        if (errors) {
            res.send({'ResultCode': '200', 'ResultMessage' : errors});
        }else{
            var data = {  
                name: req.body.name,
                description: req.body.description,
                status: req.body.status
            }
            
            category.index().forge({id: id}).fetch({require: true})
            .then(function (user) {
              user.save(data)
            });
            res.send({'ResultCode': '200', 'ResultMessage' : 'Category updated successfully!'});
        }
        
    },
    create : function(req, res, nexts){
        req.checkBody('name', 'Name is required').notEmpty().isName(req.body.name).withMessage('Name already exists');
        req.checkBody('description', 'Description is required').notEmpty();
        req.checkBody('status', 'Status is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.send({'ResultCode': '200', 'ResultMessage' : errors});
        }else{
            var data = {  
                name: req.body.name,
                description: req.body.description,
                status: req.body.status
            }

            category.index().forge(data).save().then(function (category) {
                res.send({'ResultCode': '200', 'ResultMessage' : 'Category added successfully!'});
            }).catch(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            }); 
        }
        
    },
    delete : function(req, res){
        var id     = req.params.id;
        category.index().forge({id: id}).fetch({require: true}).then(function (cat) {
            cat.destroy().then(function () {
                res.send({'ResultCode': '200', 'ResultMessage' : 'Category successfully deleted'});
            }).catch(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
        }).catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    }
    
}
module.exports = HomeController;