var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const options = require('./knexfile.js');
const knex = require('knex')(options);
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const helmet = require('helmet');
const cors = require('cors');

// const fs = require('fs');
// const https = require('https');
// const privateKey = fs.readFileSync('./sslcert/cert.key','utf8');
// const certificate = fs.readFileSync('./sslcert/cert.pem','utf8');
// const credentials = {
//  key: privateKey,
//  cert: certificate
// };

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(logger('common'));
app.use(helmet());
app.use(cors());


// Knex
app.use((req, res, next) => {
  req.db = knex
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)) // Swagger

// Logger
logger.token('req', (req, res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
  const headers = {}
  res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
  return JSON.stringify(headers)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const server = https.createServer(credentials,app);
// server.listen(443); 

module.exports = app;