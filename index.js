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
    res.render('index.ejs')
})

app.use('/records',router)
app.get('/task',async (req,res,next)=>{
    res.render('task.ejs',{info:" "})
})
app.post('/task',async (req,res,next)=>{
    try {
        const { startR, startC, endR, endC } = req.body;
        // Validate the request body
        if (!startR || !startC || !endR || !endC) {
            return res.status(400).render('task.ejs',{info:'Missing required fields'});
        }
        const newpoint = await prisma.points.create({
            data: {
                startR: parseInt(startR),
                startC: parseInt(startC),
                endR: parseInt(endR),
                endC: parseInt(endC),
            },
        });
        res.render('task.ejs',{info: "Done Succesully!"});
    } catch (error) {
        console.error('Error creating point:', error);
        next(error); // Pass the error to the error handler
    }
});
app.use((req,res)=>{
    res.status(404).render('404.ejs')
})
app.use((err,req,res,next)=>{
    console.error("Error Stack",err.stack);
    res.status(500).send('Somthing Is Broken');
})
app.listen(3400,()=>{
    console.log("link is http://localhost:3400")
})