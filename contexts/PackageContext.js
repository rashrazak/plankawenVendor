import React,{createContext, useState} from 'react'
export const PackageContext = createContext();

const PackageContextProvider = (props) => {
    const [serviceListSelected, setServiceListSelected] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tnc, setTnc] = useState('')
    const [coveredArea, setCoveredArea] = useState([])
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1000)
    const [discount, setDiscount] = useState(0)
    const [oriPrice, setOriPrice] = useState(0)
    const [price, setPrice] = useState(null)





   

    return (
        <PackageContext.Provider value={{serviceListSelected, setServiceListSelected, 
        title, setTitle, description, setDescription, coveredArea, setCoveredArea,
         quantity, setQuantity, tnc, setTnc, images, setImages,discount, setDiscount, oriPrice, setOriPrice, price, setPrice}}>
            {props.children}
        </PackageContext.Provider>
    )
}

export default PackageContextProvider