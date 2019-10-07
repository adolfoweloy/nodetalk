var express = require('express'),
  load = require('express-load'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  app = express();

// app attributes
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// registering middlewares
app.use(cookieParser('nodetalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// not needed after using express-load
// in addition all the default routes were removed - home is the custom 
// app.use('/', routes);
// app.use('/users', users);

// organise the loading method to avoid confusion and loading modules multiple time
// needs to be loaded in the correct order (arff)
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

// the same way I used to do with http module
app.listen(3000, function() {
  console.log('listening on port 3000');
});

module.exports = app;