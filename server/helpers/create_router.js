const express = require(`express`);
const ObjectID = require(`mongodb`).ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.post(`/`, (req, res) => {
    const newData = req.body;
    collection
      .insertMany(newData)
      .then(() => {
        collection.find().toArray()
        .then((docs) => res.json(docs))
      })
  })

  return router;

}

module.exports = createRouter;
