  exports.isStringInUTCDateFormat=(inputDateString)=>{
    let regexp=/\d{4}-\d{2}-\d{2}/;
    return regexp.test(inputDateString);
  }  

  exports.isStringInUnixMsDateFormat=(inputDateString)=>{
   return /^\d{5,}$/.test(inputDateString);
  }  


exports.stringHasInvalidDateFormat=(inputDateString)=>{
   let dateObject = new Date(inputDateString);
  /*
  if((/\d{4}-\d{2}-\d{2}|(^\d{5,}$)/.test(inputDateString)))
    return false;
   
   return true;
  */
    return !(/\d{4}-\d{2}-\d{2}|(^\d{5,}$)/.test(inputDateString));
    
  }  