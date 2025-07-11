const router = require('express').Router();

router.use('/contacts', require('./contacts.js'));

router.use('/', require('./swagger.js'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello']
    res.send('Hello World!');
});

module.exports = router;