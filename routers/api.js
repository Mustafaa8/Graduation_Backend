const { Router } = require('express')

const { PrismaClient } = require('@prisma/client')
const router = new Router()
const prisma = new PrismaClient()
router.get('/',async (req,res)=>{
    allPoints = await prisma.points.findMany()
    res.json(allPoints)
})

router.get('/first',async(req,res)=>{
    firstpoint = await prisma.points.findFirst({})
    await prisma.points.delete({
        where:{
            id:firstpoint['id'],
        },
    },
)
    res.json(firstpoint)
})


module.exports = router