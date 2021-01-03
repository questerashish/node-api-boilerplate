const Controller = require('./../controller-abstract');
const userService = require('./services/user.service');
class UserController extends Controller {

    async create(req, res, next) {
        try {
            this.handleRequestErrors(req);
            const { body } = req;
            let createdUser = await userService.create(body);
            return res.send(createdUser)
        } catch (error) {
            return this.handleFailure(res, error);
        }
    }
}

module.exports = new UserController();