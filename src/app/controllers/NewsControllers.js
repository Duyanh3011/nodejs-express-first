
class NewsController{

    index(req,res){
        res.render("news");
    }

    //get news/:slug
    show(req, res){
        res.send("New Details");
    }
}

module.exports = new NewsController;

