const mongoose = require('mongoose')
const validator = require('validator')


//single db connection
// mongoose.connect(process.env.MONGODB_URL,{
//     useNewUrlParser:true
// })

//multiple db connection
const makeNewConnection = (uri) =>{
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        mongoose.set('debug', function (col, method, query, doc) {
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}

module.exports = {makeNewConnection}

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('invalid email')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('age must be positive number')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minLength:7,
//         validate(value){
//            if(value.toLowerCase().includes('password')){
//                 throw new Error('password should not contain password word in it')
//             }
//         }
//     }
// })

// const me = new User({
//     name:'Raghu',
//     email:'RAGHU@gmail.com',
//     password:'reyeut67876'
// })

// me.save().then(()=>{
//   console.log(me)
// }).catch((error)=>{
//  console.log(error)
// })

// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const courses =  new Task({
//     description:'      notes learning     ', 

// })

// courses.save().then(()=>{
//     console.log(courses)
// }).catch((error)=>{
//    console.log('error',error)
// })