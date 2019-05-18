'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var expect = require('chai').expect;
var cors = require('cors');
var hbs = require('express-handlebars').create({ defaultLayout: null });
var routes = require('./routes/api.js');
var fccTestingRoutes = require('./routes/fcctesting.js');
var runner = require('./test-runner');
var port = process.env.PORT || 3000;
var helmet = require('helmet');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only
// app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

// express-handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/').get(function(req, res) {
  res.render('index');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
app.use(routes);

//404 Not Found Middleware
app.get('/*', (req, res) => {
  res
    .status(404)
    .type('text')
    .send('Resource not found');
});

//Start our server and tests!
app.listen(port, function() {
  console.log('Listening on port ' + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
