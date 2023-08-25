// const UserService = require(`../service/user.service`);
const JournalService = require(`../service/journal.service`);
const JournalRepository = require(`../repository/journal.repository`);
const auth = require("../../../middleware/auth");
const ObjectID = require("mongodb").ObjectId;

class JournalController {
  async detailJournal(req, res) {
    const data = await JournalService.detailJournal(req.body);

    res.json(data);
  }

  async getAllJournal(req, res) {
    const data = await JournalService.getAllJournal(req.body);

    res.json(data);
  }

  async addJournal(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        files: request.files,
        title: request.title,
        created_at: new Date(),
        created_by: ObjectID.createFromHexString(request.created_by),
      };

      await JournalRepository.create(objectParam);
      res.json({ message: "success create news" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateJournal(req, res) {
    try {
      let objectParam = {
        files: req.body.files,
        title: req.body.title,
      };
      await JournalRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.journal_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteJournal(req, res) {
    try {
      await JournalRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.journal_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new JournalController();
