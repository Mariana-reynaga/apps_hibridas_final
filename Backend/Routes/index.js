const usersRouter = require('./usersRouter');
const catsRouter = require('./catsRouter');
const colorsRouter = require('./colorsRouter');

function routerAPI(app){
    // Endpoints
    app.use('/api/users', usersRouter);

    app.use('/api/cats', catsRouter);

    app.use('/api/colors', colorsRouter);

};

module.exports = routerAPI;