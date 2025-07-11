const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getById);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

// router.get('/id', (req, res) => {res.send('This ran');});

module.exports = router;