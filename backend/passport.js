import passport from 'passport';
import JWTStratedy from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest : JWTStratedy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'woueBzjj6LRAuBXL8apor51yLFrLHuPl'
}

const verifyUser = (payload, done) => {

}

passport.use(new JWTStratedy(jwtOptions, verifyUser));