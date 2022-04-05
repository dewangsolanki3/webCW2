if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod')
    console.log("mongo db connected production");
} else{
    module.exports = require('./keys_dev')
    console.log("mongo db connected development");
}