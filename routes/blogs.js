var express     = require("express"),
    // moongoose   = require("mongoose"),
    router      = express.Router(),
    Blog        = require("../models/blog"),
    multer      = require("multer"),
    storage     = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, './uploads/');
        },
        filename: function(req, file, cb){
            cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
        }
    }),
    fileFilter  = (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    upload      = multer({
        storage: storage,
        fileFilter: fileFilter
    });
    // upload      = multer({dest: "uploads/"});

//Index - to show index blogs
router.get("/",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err){
            console.log("Error");
        }else {
            res.render("client/index",{blogs: allBlogs});
        }
    });
});

// SHOW all - to show all posts
router.get("/all",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err){
            console.log("Error");
        }else {
            res.render("client/allblogs",{blogs: allBlogs});
        }
    });
});

// Create - to create new blog
router.post("/",upload.single("image"),isLoggedIn ,function(req,res){
    // req.body.description = req.sanitize(req.body.description) ;
    var name = req.body.name;
    var image = req.file.path;
    var description = req.body.description;

    var newBlog = {name: name, description: description, image: image};
    Blog.create(newBlog, function(err,newlyCreated){
        if(err) {
            req.flash("error", "Oops Something Went Wrong..!!");
            res.redirect("/admin/allblogs");
            console.log("error");
        } else {
            req.flash("success","New Blog - "+ name +" Successfully Created..!!");
            res.redirect("/admin/allblogs");
        }
    });
  
});
// NEW - form to new blog
router.get("/new",isLoggedIn, function(req,res){
    res.render("admin/createblog");
});

// SHOW - to show a particular blog
router.get("/:id",function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            Blog.find({},function(err,allBlogs){
                if(err) console.log(err)
                else    res.render("client/showblog",{blog: foundBlog,blogs: allBlogs});
            })

        }
    });

});

// EDIT - edit blog form
router.get("/:id/edit",isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            console.log(err);
        } else {
            res.render("admin/editblog",{blog: foundBlog});
        }
    });
});

// UPDATE - to update a particular blog
router.put("/:id",upload.single("image"),isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.file.path;
    var description = req.body.description;
    var editedBlog = {name: name, description: description, image: image};
    Blog.findByIdAndUpdate(req.params.id,editedBlog,function(err,updatedBlog){
        if(err){
            req.flash("error", "Oops Something Went Wrong..!!");
            res.redirect("/admin/allblogs");
        }  else {
            req.flash("success", name + " Successfully Updated");
            res.redirect("/admin/allblogs");
        }
    });
});

// DELETE - to delete a blog
router.delete("/:id",isLoggedIn, function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            req.flash("error", "Oops Something Went Wrong..!!");
            res.redirect("/admin/allblogs");
        } else {
            foundBlog.status = 0;
            foundBlog.save();
            req.flash("success", foundBlog.name + " Successfully deleted");
            res.redirect("/admin/allblogs");
        }
    })
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    req.flash("error", "Sorry..You don't have permssion to do that..!!");
    res.redirect("/blogs");
}

module.exports = router;