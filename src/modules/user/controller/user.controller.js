const UserService = require(`../service/user.service`);
const auth = require("../../../middleware/auth")

class UserController {

  async detailUser(req, res) {
    const data = await UserService.detailUser(req.body);

    res.json(data);
  }

  async login(req, res) {
    const data = await UserService.login(req.body);

    res.json(data);
  }

  async getAllUser(req, res) {
    const data = await UserService.getAllUser(req.body);

    res.json(data);
  }

  async findImage(req, res) {
    const data = await UserService.findImage(req.params.key);
    // console.log("dataCTRL", data)

    data.pipe(res);
  }

}

module.exports = new UserController();
