const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
};

const getById = async (req, res) => {
    console.log(req.query.id);
    const userId = ObjectId.createFromHexString(req.query.id);
    console.log(userId);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
};

module.exports = {
    getAll,
    getById
}