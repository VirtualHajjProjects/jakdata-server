const UserService = require(`../service/user.service`);
const auth = require("../../../middleware/auth");
const UserRepository = require("../repository/user.repository");
const ObjectID = require("mongodb").ObjectId;
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

  async addSuperadmin(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        username: request.username,
        display_name: request.display_name,
        email: request.email,
        password: request.password,
        created_date_user: new Date(),
        role_id: "64c62b92d6e8dbf721f303de",
        status_user: "1",
      };

      await UserRepository.create(objectParam);
      res.json({ message: "success add super admin" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async addAdmin(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        username: request.username,
        display_name: request.display_name,
        email: request.email,
        password: request.password,
        created_date_user: new Date(),
        role_id: "64c62b78d6e8dbf721f303dd",
        status_user: request.status_user,
      };

      await UserRepository.create(objectParam);
      res.json({ message: "success add admin" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateAdmin(req, res) {
    try {
      let objectParam = {
        email: req.body.email,
        username: req.body.username,
        display_name: req.body.display_name,
        status_user: req.body.status_user,
      };
      await UserRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.user_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteAdmin(req, res) {
    try {
      await UserRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.user_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new UserController();
