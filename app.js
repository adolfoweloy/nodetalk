var express = require('express'),
  load = require('express-load'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  methodOverride = require('method-override'),
  app = express();

/**
 * modules being used:
 * load: was used because of the book but the recommended package to use is consign.
 *       it allows to load scripts into Express by specifying directories.
 */
// app attributes
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// registering middlewares
app.use(cookieParser('nodetalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// not needed after using express-load
// in addition all the default routes were removed - home is the custom 
// app.use('/', routes);
// app.use('/users', users);

// the following directories have to be loaded in the following order
// since routes depends on controllers which depends on models.

// what load does that I can't load middleware?
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

// the same way I used to do with http module
app.listen(3000, function() {
  console.log('listening on port 3000');
});

module.exports = app;