const standardErr = (res,code, msg)=>{
   res.status(code).json({msg})
}

module.exports = {standardErr}