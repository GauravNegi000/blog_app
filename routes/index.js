var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

router.get("/",function(req,res){
    res.redirect("/blogs");
})


// about page
router.get("/about",function(req,res){
    res.render("client/about");
});

//Sign up page
router.get("/register", function(req,res){
    res.render("admin/register");
}); 

//Handle SignUp logic here
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Successfully Logged in as "+ user.username);
            res.redirect("/admin");
        });
    });
});

//login page
router.get("/login", function(req,res){
    res.render("admin/login");
});    

// Handle login logic here
router.post("/login",passport.authenticate("local",{
    successRedirect: "/admin",
    successFlash: "Successfully Logged In..!!",
    failureRedirect: "/login",
    failureFlash: true
    }),function(req,res){
});

//Handle logout logic here
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "Successfuly Logged Out..!");
    res.redirect("/blogs");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");
}


module.exports = router;