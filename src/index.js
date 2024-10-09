const express = require('express')
const path = require('path')
var morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes')


const app = express()
const port = 3000
//HTTP logger
app.use(morgan('combined'))
//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); //chay prj => vao file layout trong views
//khai bao static file in public
app.use(express.static(path.join(__dirname, 'public')))

//middleware cho request body 
app.use(express.urlencoded({
    extends: true
}))
app.use(express.json())

//Route init
route(app);

app.listen(port, () => console.log(`Example app listen at http://localhost:${port}`))