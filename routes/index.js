const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const { token } = req.query;
    const ip = req.ip.split(':').pop();

    if (!token) {
        return res.send('Erreur, le token doit être défini');
    }

    if (!req.app.locals.tokens) {
        req.app.locals.tokens = {};
    }

    const tokens = req.app.locals.tokens;

    if (!tokens[token]) {
        const response = await axios.get(`https://techover.fr/API/Security/${token}`);

        if (response.data === false) {
            return res.send('Erreur, le token est incorrect');
        } else {
            tokens[token] = [];
        }
    }

    if (!tokens[token].includes(ip)) {
        if (tokens[token].length >= 1) {
            return res.send('Erreur, trop d\'IP tournent déjà sur ce token');
        }

        tokens[token].push(ip);
    }

    console.log(tokens);
    res.send(`Bonjour ! Tu utilises le token : ${token} et ton IP est : ${ip}`);
});

module.exports = router;