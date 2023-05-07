const User = require("../model/user");
const JwtStrategy = require("passport-jwt").Strategy;

const passport = require("passport");
ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("jwt_payload", jwt_payload);
    User.findOne({ email: jwt_payload.email })
      .exec()
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
