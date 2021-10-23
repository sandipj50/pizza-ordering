const Order = require('../../../models/order');
function statusController(){
    return {
        update(req,res){
            Order.updateOne({_id:req.body.orderId},{status : req.body.status},(err,data)=>{
                if(err){
                    console.log(err);
                    return res.redirect('back');
                }
                //Emit event
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated',{id:req.body.orderId, status:req.body.status}) 
                return res.redirect('back');
            });

        }
    }
}

module.exports = statusController;