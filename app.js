const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const app = express()
const static = express.static(__dirname + "/public")
const upload = express.static(__dirname + "/site_content")

const configRoutes = require("./routes")
const exphbs = require("express-handlebars")

const data = require("./data")
const userData = data.users;

app.use("/public", static)
app.use("/site_content", upload)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// set session
app.use(session({
    secret: "This is my key",
    resave: false,
    saveUninitialized: true
}))

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await userData.getUserByUserName(username)
        if(!user || !await bcrypt.compare(password, user.password)) {
            return done(null, false, {message: "Username or password is not correct"})
        }
        return done(null ,user)
    } catch (error) {
        if(error === 'UserNotFoundException') {
            done(null, false)
        } else {
            return done(null, false, {message: "Username or password is not correct"})
        }
        
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    try {
        let user = await userData.getUserById(id)
        done(null, user)
    } catch (error) {
        if(error === 'UserNotFoundException') {
            done(null, false)
        } else {
            return done(new Error("Internal Error"))
        }
        
    }
})

app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars", exphbs({ defaultLayout : "main" }))
app.set("view engine", "handlebars")

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});