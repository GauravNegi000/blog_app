var express     = require("express"),
    router      = express.Router(),
    Blog        = require("../models/blog"),
    Comment     = require("../models/comment");

// ADMIN ROUTES
router.get("/",isLoggedIn, function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err) {
            console.log(err);
        } else {
            Comment.find({},function(err,allcomments) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("admin/index",{blogs: allBlogs, comments: allcomments});
                }
            });
        }
    });
 });
 
 router.get("/allblogs",isLoggedIn, function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err) {
            console.log(err);
        } else {
            res.render("admin/allblogs",{blogs: allBlogs});         
        }
    });
 });


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}

module.exports = router;


    