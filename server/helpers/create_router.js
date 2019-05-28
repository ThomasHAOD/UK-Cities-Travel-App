const express = require(`express`);
const ObjectID = require(`mongodb`).ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then(docs => res.json(docs))
  })

  router.get('/:region', (req, res) => {
    const region = req.params.region;
    collection.find({region: region}).toArray()
    .then(docs => res.json(docs))
  })

  router.post(`/`, (req, res) => {
    const newData = req.body;
    collection
    .insertMany(newData)
    .then(() => {
      collection.find().toArray()
      .then((docs) => res.json(docs))
    })
  })

  router.post(`/:city`, (req, res) => {
    const newData = req.body;
    collection
    .insertOne(newData)
    .then(() => {
      collection.find().toArray()
      .then((docs) => res.json(docs))
    })
  })

  router.patch('/:id', (req, res) => {
    const id = req.params.id
    const review = req.body.review
    const rating = req.body.rating
    const reviewed = req.body.reviewed
    collection
    .updateOne(
      {_id: ObjectID(id)},
      {$set: {review: review,
        rating: rating,
        reviewed: reviewed}
      }
    )
    .then(() => collection.find().toArray())
    .then(docs => res.json(docs))
  })

  return router;

}

module.exports = createRouter;
