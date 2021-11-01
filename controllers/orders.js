const Order = require("../models/orders");
const createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        const order_status = await order.save();
        var success = {status: true, message: "Order created",order_status, duplicate:false}
        statusResponse(200,success,res);
    } catch (error) {
      validateError(error,res);
    }
  };
  
  function statusResponse(status,obj,res){
    return  res.status(status).json(obj);
  }

  function validateError(error,res){
    if(error.message.includes('order_id_1')){
        var order_duplicate = { status: false, duplicate:true,message: `Requested order is already exists.` }    
          statusResponse(400,order_duplicate,res);
    }
    else{
      var error_message = { status: false, message:error.message }
      statusResponse(500,error_message,res);
    } 
  }

  const updateOrder = async  (req, res) => {
    try{
      const response = await Order.updateOne({ _id: req.query.id },{$set: req.body });
       if(response){
        const order_update_success = {status: true,duplicate:false,count:response.nModified,message: "Order updated successfully!"};
        statusResponse(200,order_update_success,res);
      }
      else{
        const order_update_failed = {status: false,duplicate:true,count:response.nModified,message: "Failed to update order!"}
        statusResponse(400,order_update_failed,res);
      }
     }
     catch(error){
      validateError(error,res);
     }
   
};
  const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        var success = {status: true, orders}
        statusResponse(200,success,res);   
    } catch (error) {
        var fail = {status: false, message: error.message, status_code: 403 };
        statusResponse(403,fail,res);   
    }
  };

  const getSpecificOrder = async (req, res) => {
    try {
        const orders = await Order.find({order_id:req.query.order_id});
        var success = {status: true, orders}
        statusResponse(200,success,res);   
    } catch (error) {
        var fail = {status: false, message: error.message, status_code: 403 };
        statusResponse(403,fail,res);   
    }
  };

  const removeSpecificOrder = async (req, res) => {
    const { order_id } = req.query;
    try {
        const remove_order = await Order.remove({ order_id: order_id })
        if (!remove_order) {
            var order_not_exists = {status: false, message: "Order doesn't exists or have been already removed."}
            statusResponse(200,order_not_exists,res)
        } else {
            var removed_order = { status: false,message: "Successfully removed order." }
            statusResponse(200,removed_order,res)
        }

    } catch (err) {
        var fail = { status: false,message: err.message }
        statusResponse(403,fail,res)

    }
};
  module.exports = {
    createOrder,
    getOrders,
    getSpecificOrder,
    removeSpecificOrder,
    updateOrder
  };