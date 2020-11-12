let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let router = require('./router');

let app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

let listenner = app.listen(process.env.PORT || 8080, () => {
    console.log('Server start at port:', listenner.address().port);
});

module.exports = app;