const getMe = async(req,res)=>{
try {
    res.status(200).json({success:true,user:req.user})
} catch (error) {
    console.log("Some error occured",error)
    res.status(500).json({success:false, message: "Server error"})
}
}

module.exports = {getMe}