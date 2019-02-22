var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    // expressSanitizer= require("express-sanitizer"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    moment          = require("moment"),
    flash           = require("connect-flash"),
    Blog            = require("./models/blog"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

 // requiring routes
 var blogRoutes     = require("./routes/blogs"),
     commentRoutes  = require("./routes/comments"),
     adminRoutes    = require("./routes/admin"),
     indexRoutes    = require("./routes/index");
 
 // APP congif. -

mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser: true});    
app.set("view engine", "ejs");    

app.use(express.static(__dirname + "/public"));
app.use("/blogs/uploads",express.static(__dirname + "/uploads"));
app.use("/blogs/:id/uploads",express.static(__dirname + "/uploads"));
app.use('/blogs', express.static(__dirname + "/public"));
app.use('/blogs/:id', express.static(__dirname + "/public"));
app.use('/admin', express.static(__dirname + "/public"));
app.use('/admin/allblogs', express.static(__dirname + "/public"));
app.use('/admin/allblogs/uploads', express.static(__dirname + "/uploads"));

app.use(bodyParser.urlencoded({extended:true}));
// app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.locals.moment = moment;
app.use(flash());



// Passport Config.
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success    = req.flash("success");
    res.locals.error    = req.flash("error");
    next();
});

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/admin", adminRoutes);




// Server Config.
// For Local
var server = app.listen(3000,function() {
    console.log("Server started at port %d",server.address().port);
});

// For General

// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("The Server Has Started");
// });