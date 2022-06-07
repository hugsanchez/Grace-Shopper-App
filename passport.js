const GoogleStrategy = require("passport-google-oauth20").Strategy;
//From passport for google  oauth
const db = require("./server/db/db");
const Users = require("./server/db/model/Users");
const axios = require("axios");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.CLIENT_ID,
                //created from google cloud
                clientSecret: process.env.CLIENT_SECRET,
                //created from google cloud
                callbackURL: "/api/auth/google/callback",
                //where it goes to for authentication
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                const { familyName, givenName } = profile.name;
                const newUser = {
                    googleId: profile.id,
                    username: profile.displayName,
                    firstName: givenName,
                    lastName: familyName,
                    email: profile.emails[0].value,
                    password: "default_",
                    userType: "USER",
                };
                //create a new user with all the data provided by google
                try {
                    let user = await Users.findOne({
                        where: {
                            googleId: profile.id,
                        },
                    });
                    //if the user exists find it and then send it in the done function

                    if (!user) {
                        user = await Users.create(newUser);
                    }
                    //if it does Not exist the user create one and then send it in the done function

                    // Ends the authentication thingy
                    done(null, user);
                } catch (err) {
                    console.error(err);
                }
            },
        ),
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    /*
        Each subsequent request will not contain credentials, but rather the unique cookie that
            identifies the session.
                In order to support login sessions, Passport will serialize and deserialize (user) instances
                    to and from the session
     */

    passport.deserializeUser((id, done) => {
        Users.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                console.error(err);
            });
    });
};
