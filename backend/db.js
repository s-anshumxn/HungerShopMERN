const mongoose = require('mongoose');

const mongoURI = 'mongodb://mesinghanshuman:anshuman@cluster0-shard-00-00.j6rgw.mongodb.net:27017,cluster0-shard-00-01.j6rgw.mongodb.net:27017,cluster0-shard-00-02.j6rgw.mongodb.net:27017/HungerShop?ssl=true&replicaSet=atlas-zqud8w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async()=> {
    await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, async(err,result)=>{
        if(err)
            console.log("error",err)
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                else{
                    global.food_items = data
                    global.foodCategory = catData
                }
                })    
            })
        }});
}

module.exports = mongoDB();
