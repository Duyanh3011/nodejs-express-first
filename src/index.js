const express = require('express')
const path = require('path')
var morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000
//HTTP logger
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))

//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
//  console.log("xxxxxxxxxxxxxxxxx",path.join(__dirname, 'resources/views'))


 app.get('/', (req, res) =>  {
// var a = 1
// var b = 2
// var c = a + b
//     return res.send(
//         '<h1 style="color: red">hello world!</h1>'
//     )
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})

app.listen(port, () => console.log(`Example app listen at http://localhost:${port}`))