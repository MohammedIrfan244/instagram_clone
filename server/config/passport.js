import passport from "passport";
import FacebookStrategy from "passport-facebook";
import dotenv from 'dotenv';
import User from "../models/userModel.js";

dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            return done(null, user);
        } else {
            const newUser = await User.create({
                username: profile.displayName,
                fullname: `user_${profile.id}`,
                email: profile.emails[0].value,
                profile: profile.photos[0].value,
                password: profile.id
            });
            return done(null, newUser);
        }
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
