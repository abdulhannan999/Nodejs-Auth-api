const { default: mongoose } = require('mongoose');

async function DbConnection(params) {
    await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(response=>{
        console.log('MongoDB Connection Succeeded.')
    }).catch(error=>{
        console.log('Error in DB connection: ' + error)
    });
    
}
module.exports={DbConnection}