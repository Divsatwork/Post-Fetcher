var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var saveRouter = require('./routes/save_post');
var upvoteRouter = require('./routes/upvote');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/save', saveRouter);
app.use('/upvote', upvoteRouter);

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
    res.json({ error: err });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

module.exports = app;