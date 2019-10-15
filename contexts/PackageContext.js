import React,{createContext, useState} from 'react'
export const PackageContext = createContext();

const PackageContextProvider = (props) => {
    const [packageName, setpackageName] = useState('');
    const [created, setcreated] = useState(false);
    const [serviceListPackage, setserviceListPackage] = useState([]) // [{ serviceId, serviceType, serviceName, serviceDetails, newServiceDetails }]
    const [totalPrice, settotalPrice] = useState(100)
    const [oldPrice, setoldPrice] = useState(0)

    const packageNameFunction = (data) => {
        setpackageName(data);
    }

    const isCreated = () => {
        setcreated((old)=> !old)
    }

    const serviceListFunction = (data) => {
        setserviceListPackage( (old) => [...old, data]);
    }

    const totalPriceFunction = (price) => {
        settotalPrice((old) => price + old);
    }

    const oldPriceFunction = (price) => {
        setoldPrice((old) => price + old);
    }

    return (
        <PackageContext.Provider value={{packageName, packageNameFunction, created, isCreated, serviceListPackage, serviceListFunction, totalPrice, totalPriceFunction, oldPrice, oldPriceFunction}}>
            {props.children}
        </PackageContext.Provider>
    )
}

export default PackageContextProvider