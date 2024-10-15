const express = require('express');
const path = require('path');
var morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db')
var methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/sortMiddleware')
// Connect to database
db.connect();

// Set up application, ports
const app = express();
const port = 3000;

//HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handelbars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views')); //chay prj => vao file layout trong views
//khai bao static file in public
app.use(express.static(path.join(__dirname, 'public')));

//middleware cho request body - method POST
app.use( //Thu vien Body parser
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))

app.use(SortMiddleware)
//Routes init
route(app);

app.listen(port, () =>
    console.log(`App listen at http://localhost:${port}`),
);
