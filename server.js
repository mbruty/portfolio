const express = require('express')
require('dotenv').config();
const path = require('path');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
var bodyParser = require('body-parser');
const Monk = require('monk')
const yup = require('yup');
const app = express();
const db = Monk(process.env.mongo_conn_string);
const urls = db.get('urls');

urls.createIndex({
		slug: 1
}, {
		unique: true
});

const schema = yup.object().shape({
	url: yup.string().trim().url().required(),
	slug: yup.string().trim().matches(/^[\w\-]+$/i).required(),
});

const notFoundPath = path.join(__dirname, '/public/404.html');

app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './build')));

app.get('/u/:slug', async (req, res) => {
	let slug = req.params.slug;
	//See if exists
	try {
		const entry = await urls.findOne({ slug });
		if (entry) {
			return res.redirect(entry.url);
		}
		return res.status(404).sendFile(notFoundPath);
	} catch (err) {
		console.log(err);
		return res.status(404).sendFile(notFoundPath);
	}
});

app.post('/api', slowDown({
    windowMs: 60 * 1000,
    delayAfter: 5,
    delayMs: 500
}), rateLimit({
    windowMs: 60 * 1000,
    max: 5,
}), async (req, res) => {
    let {
        url,
        slug
	} = req.body.data;
    try {
        slug = slug.toLowerCase();
        await schema.validate({
            url,
            slug,
        });
        // if slug exists
        if (await urls.findOne({
                slug
            })) {
            throw new Error('Slug in use');
        }

        res.json(await urls.insert({
            url,
            slug,
        }));
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});
app.get('/game', function (req, res) {
		res.sendFile(path.join(__dirname+'/public/GamePage.html'));
	})
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
		res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);