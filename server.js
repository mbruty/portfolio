const express = require('express');
var nodemailer = require('nodemailer');
var cors = require('cors')
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

const whitelist = ['http://localhost:5000', 'bruty.net'];

var corsOptions = {
    origin: (origin, callback)  => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null,true);
        }
        else{
            callback('Route not allowed');
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
       user: process.env.email,
       pass: process.env.email_pass
    },
    debug: false,
    logger: true
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

// Use cors so that only mail sent from the website will be processed
app.post('/mail', cors(corsOptions), (req,res) =>{
    const {from, message, subject} = req.body;
    let msg = `From: ${from}\n\n Message: \n ${message}`;
    var mailOptions = {
        from: process.env.email,
        to: 'mike.bruty@yahoo.co.uk',
        subject: subject,
        text: msg
    };
    res.sendStatus(200);
    emailTransporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);