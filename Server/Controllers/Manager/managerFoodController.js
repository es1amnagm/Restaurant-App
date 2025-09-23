const Food=require('../../Data/FoodData');
const {SUCCESS,FAIL,ERROR}=require('../../middlewares/requestHandler');
const handle = require('../../middlewares/responseHandler');


const showMales  = async (req,res)=>{
    try {
        const males= await Food.find();
        if(males.length===0)
          return handle(res, 200, FAIL, "no data to show");

      return handle(res, 200, SUCCESS, males);


    } catch (error) {
     return handle(res, 500, ERROR, error);
    }
};


const selectMale  = async (req,res)=>{
      try {
        const maleId = req.params.maleId;
        const maleFounded = await Food.findOne({ _id: maleId });
        if (!maleFounded)
          return handle(res, 404, FAIL, "this male not exist");

        return handle(res, 200, SUCCESS, maleFounded);
      } catch (error) {
        return handle(res, 500, ERROR, error);
      }


};


const addMale = async (req,res)=>{
   try {
   const body=req.body;
     const newMale = await new Food(body);
     await newMale.save();
     return handle(res,201,SUCCESS,newMale);
   } catch (error) {
     return handle(res, 500, ERROR, error);
}
};


const deleteMale = async (req,res)=>{
    try {
        const maleId = req.params.maleId;
         const maleFounded = await Food.findOne({ _id: maleId });
        if (!maleFounded)
          return handle(res, 404, FAIL, "please enter correct ID");

        const deletedMale = await Food.deleteOne({ _id: maleId });
        return handle(res, 200, SUCCESS, "male is deleted successfully");
    
    } catch (error) {
     return handle(res, 500, ERROR, error);
    }

    
};


const updateMale = async (req,res)=>{

       try {
         const maleId = req.params.maleId;
         const maleFounded = await Food.findOne({ _id: maleId });
         if (!maleFounded)
           return handle(res, 404, FAIL, "this male not found please enter correct ID");

         const updatedMale = await Food.updateOne( {_id: maleId},{$set:req.body} );
         return handle(res, 200, SUCCESS, "male is updated successfully");
       } catch (error) {
         return handle(res, 500, ERROR, error);
       }
    
    
};






module.exports={
    addMale,
    deleteMale,
    updateMale,
    showMales,
    selectMale
}