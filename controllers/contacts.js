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
    const contactId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.aknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    console.log(req.params.id);
    console.log("------------------------------------------");
    console.log(req);
    console.log("==========================================");
    const contactId = ObjectId.createFromHexString(req.params.id);
    console.log(req.body);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    const contactId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getById,
    createContact,
    updateContact,
    deleteContact
}