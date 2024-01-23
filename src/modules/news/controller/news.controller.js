const NewsService = require(`../service/news.service`);
const auth = require("../../../middleware/auth");
const NewsRepository = require("../repository/news.repository");
const ObjectID = require("mongodb").ObjectId;

class NewsController {
  async detailNews(req, res) {
    const data = await NewsService.detailNews(req.body);
    res.json(data);
  }

  async getAllNews(req, res) {
    const data = await NewsService.getAllNews(req);
    res.json(data);
  }

  async addNews(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        files: request.files,
        title: request.title,
        categories: request.categories,
        created_at: new Date(),
        created_by: ObjectID.createFromHexString(request.created_by),
        tags: request.tags,
        field_content: request.field_content,
      };
      await NewsRepository.create(objectParam);
      res.json({ message: "success create news" });
    } catch (err) {
      console.error('ERROR');
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateNews(req, res) {
    try {
      await NewsRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.news_id),
        },
        {
          files: req.body.files,
          title: req.body.title,
          categories: req.body.categories,
          tags: req.body.tags,
          field_content: req.body.field_content,
        }
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteNews(req, res) {
    try {
      await NewsRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.news_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new NewsController();
