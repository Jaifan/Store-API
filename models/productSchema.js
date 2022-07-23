const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxlength : [20,'Not more than 20 characters']
    },
    featured : {
        type : Boolean,
        default : false
    },
    price : {
        type : Number,
        required : [true, 'Price is must']
    },
    rating : {
        type : Number,
        default: 4.2
    },
    company : {
        type: String,
        required : true,
        enum : {
            values : ['apple','samsung','oneplus','vivo'],
            message : `{VALUE} is not supported`
        }
    }
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);