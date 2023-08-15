// const UserService = require(`../service/user.service`);
const ArticleService = require(`../service/article.service`);
const auth = require("../../../middleware/auth")

class ArticleController {

  async detailArticle(req, res) {
    const data = await ArticleService.detailArticle(req.body);

    res.json(data);
  }

  async getAllArticle(req, res) {
    const data = await ArticleService.getAllArticle(req.body);

    res.json(data);
  }

}

module.exports = new ArticleController();