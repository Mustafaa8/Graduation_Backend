const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
const router = require('./routers/api.js')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
app.set('views','./views')
app.set('view engine','ejs')
app.disable('X-Powered-By');
app.get('/',(req,res,next)=>{
    res.render('index.ejs')
})

app.use('/records',router)
app.post('/records',async (req,res,next)=>{
    // await prisma.points.deleteMany({})
    const newpoint = await prisma.points.create({data:{
        startR:parseInt(req.body['start row']),
        startC:parseInt(req.body['start column']),
        endR:parseInt(req.body['end row']),
        endC:parseInt(req.body['end column'])
    },
})
    res.json(await prisma.points.findMany({}))
    

})
app.use((req,res)=>{
    res.status(404).render('404.ejs')
})
app.listen(3400,()=>{
    console.log("link is http://localhost:3400")
})