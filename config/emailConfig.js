import axios from 'axios'


const sendEmail = (params) =>{
    axios.get('https://us-central1-plankawen-19918.cloudfunctions.net/sendEmail',{params}).then(function(response){
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    })
}

const adminEmail = 'admin@plankawen.com'

export {sendEmail as default, adminEmail}