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
router.post('/',async (req,res)=>{
    const newpoint = await prisma.points.create({
    data:{
        startR:parseInt(req.body['start row']),
        startC:parseInt(req.body['start column']),
        endR:parseInt(req.body['end row']),
        endC:parseInt(req.body['end column'])
    },
})
});
router.delete('/:id/delete',async(req,res)=>{
    const id = req.params
    let deletion = await prisma.points.delete({where:{id:id}})
})

module.exports = router;