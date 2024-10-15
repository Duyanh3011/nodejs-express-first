const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;



const Course = new Schema({
  _id: {type: Number, },
  name: { type: String, maxLength: 255, required: true },
  description: { type: String, required: true },
  image: { type: String, maxLength: 255 },
  videoID: { type: String, maxLength: 255 },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true },
}, { 
  _id: false,
  timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { 
  overrideMethods: true, 
  deletedAt: true 
}) //Hien thi (override all), deleteAt: Time

//custom query
Course.query.sortable = function(req){
  if(req.query.hasOwnProperty('_sort')){
    const isvalidType = ['asc', 'desc'].includes(req.query.type)
    return this.sort({
        [req.query.column]: isvalidType? req.query.type : 'desc',
    })
}
return this
}

module.exports = mongoose.model('Course', Course); //mongoose auto chuyen thanh snakecase, so nhieu