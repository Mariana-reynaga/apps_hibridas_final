const usersRouter = require('./usersRouter');
const catsRouter = require('./catsRouter');
const colorsRouter = require('./colorsRouter');
const lengthRouter = require('./lengthRouter');
const statusRouter = require('./statusRouter');

function routerAPI(app){
    // Endpoints
    app.use('/api/users', usersRouter);

    app.use('/api/cats', catsRouter);

    app.use('/api/colors', colorsRouter);

    app.use('/api/lengths', lengthRouter);

    app.use('/api/status', statusRouter);
};

module.exports = routerAPI;