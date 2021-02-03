const express = require('express'),
    router = express.Router(),
    ceoModel = require('../models/ceoModel'),
    slugify = require('slugify');

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
    const { ceo_name, ceo_year } = req.body;
    const slug = slugify(ceo_name, {
        replacement: '_',
        lower: true,
        strict: true
    });
    const response = await ceoModel.addEntry(ceo_name, slug, ceo_year);
    if (response.rowCount >= 1) {
        res.redirect('/ceos')
    } else {
        res.sendStatus(500);
    }
});

router.post('/delete', async (req, res) => {
    const { ceo_id } = req.body;
    // new INSTANCE of the ceoModel
    const ceo = new ceoModel(ceo_id);
    const response = await ceo.deleteEntry();
    if (response.rowCount >= 1) {
        res.redirect('/ceos');
    } else {
        res.sendStatus(500);
    }
})

module.exports = router;
