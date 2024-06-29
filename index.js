const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
const router = require('./routers/api.js')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
app.set('views','./views')
app.set('view engine','ejs')
app.disable('x-powered-by');
app.get('/',async (req,res,next)=>{
    allpoints = await prisma.points.findMany({})
    res.render('index.ejs',)
})

app.use('/records',router)
app.post('/',async (req,res,next)=>{
    allpoints = await prisma.points.findMany({})
    const newpoint = await prisma.points.create({
    data:{
        startR:parseInt(req.body['startR']),
        startC:parseInt(req.body['startC']),
        endR:parseInt(req.body['endR']),
        endC:parseInt(req.body['endC'])
    },
})
    res.render("index.ejs",)
})
app.use((req,res)=>{
    res.status(404).render('404.ejs')
})
app.listen(3400,()=>{
    console.log("link is http://localhost:3400")
})