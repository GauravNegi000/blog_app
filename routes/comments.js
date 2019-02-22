var express         = require("express"),
    router          = express.Router({mergeParams:true}),
    Blog            = require("../models/blog"),
    Comment         = require("../models/comment");


router.post("/",function(req, res){
    Blog.findById(req.params.id,function(err,blog){
        if(err) {
            req.flash("error", "Oops..Something went wrong..!!")
            res.redirect("/blogs/"+ req.params.id);
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
                    console.log(err);
                } else {                    
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blogs/"+ req.params.id);                    
                }
            });
        }
    });
});

router.delete("/:comment_id",isLoggedIn, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success","1 Comment deleted..!!");
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}

module.exports = router;