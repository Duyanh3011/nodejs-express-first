
const newsRouter = require('./news')

function route(app){
    app.use('/news', newsRouter)

 app.get('/', (req, res) =>  {
    // var a = 1
    // var b = 2
    // var c = a + b
    //     return res.send(
    //         '<h1 style="color: red">hello world!</h1>'
    //     )
        res.render('home')
    })
    
    
    app.get('/search', (req, res) => {
        console.log(req.query.q)
        res.render('search')
    })
    
    app.post('/search', (req, res) => {
        console.log(req.body)
        res.send("")
    })
}

module.exports = route;