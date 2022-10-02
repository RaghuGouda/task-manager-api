const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const {auth} = require('../middleware/auth')
const {ImageUpload} = require('../middleware/fileUploads')
const router = new express.Router()


router.post('/users',async(req,res)=>{

    const user = new User(req.body)
    try {
        await user.save()
        console.log(user)
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
 
    }

    // user.save().then(()=>{
    //      console.log(user)
    //      res.status(201).send(user)
    // }).catch((err)=>{
    //    console.log(err)
    //    res.status(400).send(err)
    // })

})

router.post('/user/sign-up',async(req,res)=>{

    const user = new User(req.body)
    try {
        await user.save()
        console.log(user)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
 
    }
})

router.post('/user/login',async(req,res)=>{
    try {
        const user = await User.findByCredential(req.body.email,req.body.password)
        console.log("user.getPublicProfile()")
        const token = await user.generateAuthToken()
        res.send({user,token})     
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/user/log-out',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
               return token.token !== req.token
        })
        await req.user.save()
        res.send()  
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/user/logout-all',auth,async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()  
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/users',async(req,res)=>{

    try {
       const users = await User.find({})
       console.log(users)
       res.send(users)
    } catch (err) {
        res.status(500).send()
    }
 


    // User.find({}).then((users)=>{
    //     console.log(users)
    //     res.send(users)

    // }).catch(()=>{
    //    res.status(500).send()
    // })
})

router.get('/user/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.get('/user/:user_id',async(req,res)=>{
    const _id =req.params.user_id
    console.log(_id)

    try {

        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        console.log(user)
        res.send(user)
        
    } catch (err) {
        res.status(500).send() 
    }

    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     console.log(user)
    //     res.send(user)

    // }).catch(()=>{
    //    res.status(500).send()
    // })
})

// router.patch('/user/:user_id',async(req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','age','email','password']
//     const isvalidUpdate = updates.every((key)=> allowedUpdates.includes(key))
//     if(!isvalidUpdate){
//         res.status(404).send('invaild fields in updates')
//     }
//     try {
//         const user = await User.findById(req.params.user_id)
//         updates.forEach((update)=>user[update]=req.body[update])
//         await user.save()
//         // const user = await User.findByIdAndUpdate(req.params.user_id,req.body,{new:true,runValidators:true})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
//     }

// })

router.patch('/user/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','email','password']
    const isvalidUpdate = updates.every((key)=> allowedUpdates.includes(key))
    if(!isvalidUpdate){
        res.status(404).send('invaild fields in updates')
    }
    try {
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }

})

// router.delete('/user/:user_id',async(req,res)=>{
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

router.delete('/user/me',auth, async(req,res)=>{
    try {
       await req.user.remove()    
       res.send(req.user)
    } catch (error) {
        res.status(500).send() 
    }
})

router.post('/user/me/avatar',ImageUpload.single('fileUpload'),auth,async(req,res)=>{
    req.user.avatar =await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer() 
    await req.user.save()
    res.send()
},
(error,req,res,next)=>{
    res.status(400).send({error:error.message})
}
)

router.delete('/user/me/avatar',auth, async(req,res)=>{
    try {
        req.user.avatar = undefined
       await req.user.save()    
       res.send(req.user)
    } catch (error) {
        res.status(500).send() 
    }
})

router.get('/user/:user_id/avatar',async(req,res)=>{

    try {
       const user = await User.findById(req.params.user_id)

       if(!user){
           throw new Error()
       }
       res.set('Content-Type','image/png')
       res.send(user.avatar)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router