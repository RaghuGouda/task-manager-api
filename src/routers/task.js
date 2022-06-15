const express = require('express')
const Task = require('../models/task')
const {auth} = require('../middleware/auth')
const router = new express.Router()



router.post('/tasks',auth,async(req,res)=>{

    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try {
       await task.save()
       console.log(task)
       res.status(201).send(task)
    } catch (err) {
        console.log(err)
        res.status(400).send(err) 
    }

    // task.save().then(()=>{
    //      console.log(task)
    //      res.status(201).send(task)
    // }).catch((err)=>{
    //    console.log(err)
    //    res.status(400).send(err)
    // })

})

router.get('/tasks',auth,async(req,res)=>{
       const match = {}
       const sort = {}

       if(req.query.completed){
           match.completed = req.query.completed === 'true'
       }

       if(req.query.sortBy){
           const parts = req.query.sortBy.split(':')
           sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
       }

    try {
    //   const tasks =  await Task.find({})
      await req.user.populate({
          path:'tasks',
          match,
          options:{
              limit:parseInt(req.query.limit),
              skip:parseInt(req.query.skip),
              sort
          }
      })
      console.log(req.user.tasks)
      res.send(req.user.tasks)

    } catch (err) {
        res.status(500).send()
    }

    // Task.find({}).then((tasks)=>{
    //     console.log(tasks)
    //     res.send(tasks)

    // }).catch(()=>{
    //    res.status(500).send()
    // })
})


router.get('/task/:task_id',auth,async(req,res)=>{
    const _id =req.params.task_id
    console.log(_id)

    try {
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        console.log(task)
        res.send(task)
    } catch (err) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     console.log(task)
    //     res.send(task)

    // }).catch(()=>{
    //    res.status(500).send()
    // })
})

router.patch('/task/:task_id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isvalidUpdate = updates.every((key)=> allowedUpdates.includes(key))
    if(!isvalidUpdate){
        res.status(404).send('invaild fields in updates')
    }
    try {
        const task = await Task.findOne({_id:req.params.task_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.task_id,req.body,{new:true,runValidators:true})
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

})

router.delete('/deletetask/:task_id',async(req,res)=>{
    try {
       const task =await Task.findByIdAndDelete(req.params.task_id)
       if(!task){
        return res.status(404).send() 
       }
       res.send(task)
    } catch (error) {
        res.status(500).send() 
    }
})

router.delete('/task/:task_id',auth,async(req,res)=>{
    try {
       const task =await Task.findOneAndDelete({_id:req.params.task_id,owner:req.user._id})
       if(!task){
        return res.status(404).send() 
       }
       res.send(task)
    } catch (error) {
        res.status(500).send() 
    }
})

module.exports = router