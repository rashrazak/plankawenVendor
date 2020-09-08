import React,{createContext, useState, useEffect, useContext} from 'react'
import LoginContext from './LoginContext'
import firebase from '../config/firebaseConfig'
import * as ls from 'local-storage'

export const serviceContext = createContext();

const serviceContextProvider = (props) => {
    const {user} = useContext(LoginContext)

    const services = ['Venue',
                    'Canopy',
                    'KadBanner',
                    'WeddingDress',
                    'Makeup',
                    'Photographer',
                    'Videographer',
                    'Pelamin',
                    'Caterer',
                    'Hantaran',
                    'Persembahan',
                    'DoorGift',
                    'Others']
    
    const [serviceList, setServiceList] = useState(null)

    useEffect(() => {
        if(!serviceList && ls('serviceList')){
            setServiceList(ls.get('serviceList'))
        }else if (!serviceList && user) {
            async function getData() {
                let result = []
                await services.map( async (val,index) => {
                    
                    var read = await firebase.checkServiceType(val, user.email)
                    read.forEach(function(doc) {
                        let x = doc.id;
                        let y = doc.data()
                        
                        let data = {...y, id:x}
                        console.log(data)
                        result = [...result, data]
                    })

                    if (index == (services.length - 1) ) {
                        setServiceList(result)
                        ls.set('serviceList',result)
                    }
                    
                    
                })
              
            }
            getData()
        }
    }, [serviceList, user])

    return (
        <serviceContext.Provider value={{serviceList}}>
            {props.children}
        </serviceContext.Provider>
    )
}

export default serviceContextProvider