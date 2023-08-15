// const UserService = require(`../service/user.service`);
// const ArticleService = require(`../service/article.service`);
const NewsService = require(`../service/news.service`);
const auth = require("../../../middleware/auth")

class NewsController {

  async detailNews(req, res) {
    const data = await NewsService.detailNews(req.body);

    res.json(data);
  }

  async getAllNews(req, res) {
    const data = await NewsService.getAllNews(req.body);

    res.json(data);
  }

}

module.exports = new NewsController();