// const UserService = require(`../service/user.service`);
const ArticleService = require(`../service/article.service`);
const auth = require("../../../middleware/auth");
const ArticleRepository = require("../repository/article.repository");
const ObjectID = require("mongodb").ObjectId;
class ArticleController {
  async detailArticle(req, res) {
    const data = await ArticleService.detailArticle(req.body);
    res.json(data);
  }

  async getAllArticle(req, res) {
    const data = await ArticleService.getAllArticle(req);
    res.json(data);
  }

  async addArticle(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        title: request.title,
        categories: request.categories,
        files: request.files,
        created_at: new Date(),
        created_by: ObjectID.createFromHexString(request.created_by),
        tags: request.tags,
        field_content: request.field_content,
      };

      await ArticleRepository.create(objectParam);
      res.json({ message: "success create article" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateArticle(req, res) {
    try {
      let objectParam = {
        files: req.body.files,
        title: req.body.title,
        categories: req.body.categories,
        tags: req.body.tags,
        field_content: req.body.field_content,
      };
      await ArticleRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.article_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteArticle(req, res) {
    try {
      await ArticleRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.article_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new ArticleController();
