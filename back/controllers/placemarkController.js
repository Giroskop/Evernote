const Placemark = require('../db/models/placemark')

class PlacemarkController {
  async create(req, res) {
    const {name, description, authorId} = req.body
    const placemark = Placemark.create({
      created: date.now(),
      author: authorId,
      name: name,
      description: description
    })
    res.json(placemark)
  }
  async getAll(req, res) {
    const placemarks = await Placemark.find()
    res.json(placemarks)

  }
  async getOne(req, res) {

  }
  async deleteOne(req, res) {
    const {id} = req.body
    await Placemark.deleteOne({_id: id})
    res.sendStatus(200)
  }
  async deleteMany(req, res) {
    const {idList} = req.body
    await Placemark.deleteOne({_id: {$in: idList}})
    res.sendStatus(200)
  }
  async updateOne(req, res) {
    const {id} = req.body
    await Placemark.findOneAndUpdate({_id: id}, {
      
    })
    res.sendStatus(200)
  }
  
}
module.exports = new PlacemarkController()
