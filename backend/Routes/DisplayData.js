const express = require('express')
const router = express.Router()

router.post('/fooditem',(req,res)=>{
    try {
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error!")
    }
})

module.exports = router