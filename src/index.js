const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();


const port = process.env.PORT

// app.use((req,res,next)=>{
//     res.status(500).send('service is under maintaince please try after some time')

// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// app.post('/users',async(req,res)=>{

//     const user = new User(req.body)
//     try {
//         await user.save()
//         console.log(user)
//         res.status(201).send(user)
//     } catch (error) {
//         console.log(error)
//         res.status(400).send(error)
 
//     }

//     // user.save().then(()=>{
//     //      console.log(user)
//     //      res.status(201).send(user)
//     // }).catch((err)=>{
//     //    console.log(err)
//     //    res.status(400).send(err)
//     // })

// })

// app.post('/tasks',async(req,res)=>{

//     const task = new Task(req.body)

//     try {
//        await task.save()
//        console.log(task)
//        res.status(201).send(task)
//     } catch (err) {
//         console.log(err)
//         res.status(400).send(err) 
//     }

//     // task.save().then(()=>{
//     //      console.log(task)
//     //      res.status(201).send(task)
//     // }).catch((err)=>{
//     //    console.log(err)
//     //    res.status(400).send(err)
//     // })

// })

// app.get('/users',async(req,res)=>{

//     try {
//        const users = await User.find({})
//        console.log(users)
//        res.send(users)
//     } catch (err) {
//         res.status(500).send()
//     }
 


//     // User.find({}).then((users)=>{
//     //     console.log(users)
//     //     res.send(users)

//     // }).catch(()=>{
//     //    res.status(500).send()
//     // })
// })

// app.get('/user/:user_id',async(req,res)=>{
//     const _id =req.params.user_id
//     console.log(_id)

//     try {

//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         console.log(user)
//         res.send(user)
        
//     } catch (err) {
//         res.status(500).send() 
//     }

//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     console.log(user)
//     //     res.send(user)

//     // }).catch(()=>{
//     //    res.status(500).send()
//     // })
// })

// app.patch('/user/:user_id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','age','email']
//     const isvalidUpdate = updates.every((key)=> allowedUpdates.includes(key))
//     if(!isvalidUpdate){
//         res.status(404).send('invaild fields in updates')
//     }
//     try {
//         const user = await User.findByIdAndUpdate(req.params.user_id,req.body,{new:true,runValidators:true})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
//     }

// })

// app.delete('/user/:user_id',async(req,res)=>{
//     try {
//        const user =await User.findByIdAndDelete(req.params.user_id)
//        if(!user){
//         return res.status(404).send() 
//        }
//        res.send(user)
//     } catch (error) {
//         res.status(500).send() 
//     }
// })

// app.get('/tasks',async(req,res)=>{

//     try {
//       const tasks =  await Task.find({})
//       console.log(tasks)
//       res.send(tasks)

//     } catch (err) {
//         res.status(500).send()
//     }

//     // Task.find({}).then((tasks)=>{
//     //     console.log(tasks)
//     //     res.send(tasks)

//     // }).catch(()=>{
//     //    res.status(500).send()
//     // })
// })

// app.get('/task/:task_id',async(req,res)=>{
//     const _id =req.params.task_id
//     console.log(_id)

//     try {
//         const task = await Task.findById(_id)
//         if(!task){
//             return res.status(404).send()
//         }
//         console.log(task)
//         res.send(task)
//     } catch (err) {
//         res.status(500).send()
//     }

//     // Task.findById(_id).then((task)=>{
//     //     if(!task){
//     //         return res.status(404).send()
//     //     }
//     //     console.log(task)
//     //     res.send(task)

//     // }).catch(()=>{
//     //    res.status(500).send()
//     // })
// })

// app.patch('/task/:task_id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description']
//     const isvalidUpdate = updates.every((key)=> allowedUpdates.includes(key))
//     if(!isvalidUpdate){
//         res.status(404).send('invaild fields in updates')
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.task_id,req.body,{new:true,runValidators:true})
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(500).send()
//     }

// })

// app.delete('/task/:task_id',async(req,res)=>{
//     try {
//        const task =await Task.findByIdAndDelete(req.params.task_id)
//        if(!task){
//         return res.status(404).send() 
//        }
//        res.send(task)
//     } catch (error) {
//         res.status(500).send() 
//     }
// })

// const main =async ()=>{
//         const user = await User.findById('62a7f0daf7f990e51627d139')
//         await user.populate('tasks')
//         console.log(user.tasks)
// }
// main()

app.listen(port || 3000,()=>{
    console.log(`server is on port ${port||3000}`)
})