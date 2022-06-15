const {MongoClient,ObjectId} = require('mongodb')

const connectionURL = process.env.MONGODB_URL

const databaseName = 'task-manager'

// const id = new ObjectId()

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if(error){
        return console.log(error)
    }
    console.log('Connected Successfully')

   const db = client.db(databaseName)
   
//Create data into db
    // db.collection('users').insertOne({
    //     name:'Raghu',
    //     age: 27
    // },(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.insertedId)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         name:'nodes app',
    //         description:'read and write doc',
    //         completed:true
    //     },
    //     {
    //         name:'weather app',
    //         description:'get weather by seraching location',
    //         completed:true
    //     },
    //     {
    //         name:'mongodb',
    //         description:'basics of mongodb',
    //         completed:false
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.insertedIds)
    // })

//Read data from db    
    // db.collection('users').findOne({ _id: new ObjectId('6285d16a84ded728bd4fc890')},(error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })
    // db.collection('tasks').findOne({ _id: new ObjectId('6285e2d246e3e526ac4f67a5')},(error,task)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(task)
    // })
    // db.collection('users').find({age:27}).toArray((error,users)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(users)
    // })
    // db.collection('tasks').find({completed:true}).toArray((error,tasks)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(tasks)
    // })

 //Update data into db   
    // db.collection('users').updateOne({
    //     _id:ObjectId('6285ddcfd7c85bc21904db3c')
    // },{
    //     $set:{
    //         name:'Mike'
    //     },
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     description:'mongodb tutorial'
    // },{
    //     $set:{
    //         description:'mongodb tutorials' 
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

//delete data from db    
    // db.collection('users').deleteOne({
    //     _id:ObjectId('6285ddfccabde06b8551cfaf')
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age:27
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})