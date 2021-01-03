const axios = require('axios');
const Controller = require("../controller-abstract");
const authService = require('./services/auth.service');
const userService = require('./../users/services/user.service');
const authHelper = require('./AuthenticationHelper');

const { UnauthorizedException } = require("../errors/invalid-request");

class AuthController extends Controller {

    async login(req, res, next) {
        try {
            this.handleRequestErrors(req);
            let { body } = req;
            let userInstance = await authService.login(body.email, body.password);
            await authHelper.attachToken(res, userInstance);
            return this.handleSuccess(res, userInstance);
        } catch (error) {
            this.handleFailure(res, error);
        }
    }

    async sessionData(req, res, next) {
        try {
            if (req.session)
                return this.handleSuccess(res, req.session)
            else
                throw new UnauthorizedException('Not authorized');
        } catch (error) {
            return this.handleFailure(res, error);
        }
    }

    async loginWithGoogleToken(req, res, next) {
        try {
            let { body } = req;
            let { accessToken } = body;
            if (!accessToken)
                throw new Error(`Invalid request`);

            let details = await authService.getUserDetailWithGoogleAccessToken(accessToken);
            let createdUser = await userService.findOrCreateUser(details);
            let tokenUser = authService.sanitizeUser(createdUser);
            let userToken = await authHelper.attachToken(res, tokenUser);
            this.successHandle(res, { ...tokenUser, token: userToken })
        } catch (error) {
            return this.failureHandle(res, error);
        }
    }

    async attachTokenWithOauthFlow(req, res, next) {
        try {
            if (req.user) {
                await authHelper.attachToken(res, req.user);
                // this.successHandle(res, { ...req.user, token });
                return res.render('post-oauth.ejs');
            } else {
                throw new UnauthorizedException('Invalid request');
            }
        } catch (error) {
            this.failureHandle(res, error);
        }
    }

}

module.exports = new AuthController();