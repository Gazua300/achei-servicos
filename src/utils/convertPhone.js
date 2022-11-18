export const convertPhone = (phone)=>{
    const num = String(phone)
    const ddd = num.substring(0,2)
    const prefix = num.substring(2,7)
    const sufix = num.substring(7,11)
  
    return `${ddd} ${prefix}-${sufix}`
  }
