const Product = require('../models/productSchema');


const getAllProduct = async(req,res) => {
    const {
        id ,
        name, 
        featured, 
        company, 
        sort , 
        fields, 
        numericFilters,
        page,
        limit
    } = req.query;

    const objecctQuery = {};
    if(id) objecctQuery._id = id;
    if(featured) objecctQuery.featured = featured === 'true' ? true : false;
    if(company) objecctQuery.company = company;
    if(name) objecctQuery.name = { $regex: name , $options: 'i'};
    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=':'$gte',
            '=':'$e',
            '<':'$lt',
            '<=':'$lte',
        };
        const regex = /\b(<|>|>=|<=|=)\b/g;
        let filters = numericFilters.replace(regex, (match)=> `-${operatorMap[match]}-`);
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=> {
            const [field,operator,value] = item.split('-');
            if(options.includes(field)) {
            objecctQuery[field] = {[operator]: Number(value)}
            console.log(objecctQuery[field]);
            }
        })
    }
    let result = Product.find(objecctQuery);
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('updatedAt');
    }

    if(fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skipNumber =  (pageNumber-1)* limitNumber;

    result = result.skip(skipNumber).limit(limitNumber);

    const product = await result;
    res.status(200).json({nHit: product.length,product});
}

const createProduct = async(req,res) => {
    const product = await Product.create(req.body);
    res.status(200).json({product});
}


module.exports = {
    getAllProduct,
    createProduct
};