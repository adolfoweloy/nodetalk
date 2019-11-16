// constants used to share session between http and socket.io
const KEY = "nodetalk.sid",
  SECRET = "nodetalk";

var express = require("express"),
  load = require("express-load"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  methodOverride = require("method-override"),
  error = require("./middlewares/errors"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io")(server),
  cookie = cookieParser(SECRET),
  store = new expressSession.MemoryStore();

// app attributes
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// registering middlewares
app.use(cookie);
app.use(
  expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// session share/validation for socket.io
io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error("access denied"));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

// what load does that I can't load middleware?
load("models").then("controllers").then("routes").into(app);

load("sockets").into(io);

app.use(error.notFound);
app.use(error.serverError);

// the same way I used to do with http module
server.listen(3000, function() {
  console.log("listening on port 3000");
});
