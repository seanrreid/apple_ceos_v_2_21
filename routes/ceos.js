const express = require('express'),
    router = express.Router(),
    ceoModel = require('../models/ceoModel');

const slugify = require('slugify');

router.get('/', async (req, res) => {
    const ceosData = await ceoModel.getAll();

    res.render('template', {
        locals: {
            title: 'List of Apple CEOs',
            data: ceosData,
        },
        partials: {
            body: 'partials/ceo-list',
        },
    });
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const executive = await ceoModel.getBySlug(slug);

    if (executive) {
        res.render('template', {
            locals: {
                title: `Apple CEO: ${executive.name}`,
                executive,
            },
            partials: {
                body: 'partials/ceo-details',
            },
        });
    } else {
        res.status(404).send(`No CEO found that matches slug, ${slug}`);
    }
});

router.post('/', async (req, res) => {
    const { ceo_name, year } = req.body;
    const slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const response = await ceoModel.addEntry(ceo_name, slug, year);
    console.log("post data response is: ", response);
    res.sendStatus(200);
});

router.post('/delete', async (req, res) => {
    const { id, ceo_name, slug, year } = req.body;
    const ceo = new ceoModel(id, ceo_name, slug, year);
    const response = await ceo.deleteEntry();
    console.log("delete response is: ", response);
    res.sendStatus(200);
})

module.exports = router;
