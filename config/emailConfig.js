import React from 'react'
import axios from 'axios'

const sendEmail = async (data) => {
    let {type, email, title, name, serviceType} = data || {}
    let res = null
    if(type == 'services-created-admin'){
        res = await axios.get(`https://us-central1-plankawen-19918.cloudfunctions.net/sendEmail?email=${email}&type=${type}&title=${title}&serviceType=${serviceType}`)
    }else if( type == 'package-created-admin'){
        res = await axios.get(`https://us-central1-plankawen-19918.cloudfunctions.net/sendEmail?email=${email}&type=${type}&title=${title}`)
    }else if( type == 'vendor-created-admin'){
        res = await axios.get(`https://us-central1-plankawen-19918.cloudfunctions.net/sendEmail?email=${email}&type=${type}&title=${title}`)
    }
    return res
}


const adminEmail = 'admin@plankawen.com'

export {sendEmail as default, adminEmail}