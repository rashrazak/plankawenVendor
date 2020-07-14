import React,{createContext, useState} from 'react'
export const PackageContext = createContext();

const PackageContextProvider = (props) => {
    const [serviceListSelected, setServiceListSelected] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coveredArea, setCoveredArea] = useState([])
    const [quantity, setQuantity] = useState(0)


   

    return (
        <PackageContext.Provider value={{serviceListSelected, setServiceListSelected, title, setTitle, description, setDescription, coveredArea, setCoveredArea}}>
            {props.children}
        </PackageContext.Provider>
    )
}

export default PackageContextProvider