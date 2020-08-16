import React,{useState, useEffect} from 'react'

function PackageEdit({returnValue, data, indexList}) {
const [edit, setEdit] = useState(false)

const [makeupFull, setMakeupFull] = useState(0)
const [makeupTouchup, setMakeupTouchup] = useState(0)
const [kadPrice, setKadPrice] = useState(0)
const [banner, setBanner] = useState(null)
const [fixPrice, setFixPrice] = useState(0)
const [randomPrice, setRandomPrice] = useState(0)


useEffect(() => {
    if (data) {
        if (data.serviceType == 'Makeup') {
            setMakeupTouchup(parseFloat(data.serviceDetails.hargaTouchup))
            setMakeupFull(parseFloat(data.serviceDetails.hargaFull))
            
        }else if (data.serviceType == 'KadBanner'){
            setKadPrice(parseFloat(data.serviceDetails.hargaPerPerson))
            if (data.serviceDetails.banner == true) {
                setBanner(data.serviceDetails.bannerDesc.bannerSize)
            }
        }else if (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift'){
            setRandomPrice(parseFloat(data.serviceDetails.hargaPerPerson))
    
        }else if (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others'){
            setFixPrice(parseFloat(data.serviceDetails.harga))
        }
    }
}, [data])

const clickEdit = () =>{

    let price = {}

    if (data.serviceType == 'Makeup') {
        price.hargaTouchup = makeupTouchup
        price.hargaFull = makeupFull
        
    }else if (data.serviceType == 'KadBanner'){
        price.hargaPerPerson = kadPrice
        if (data.serviceDetails.banner == true) {
            price.banner = banner
        }
    }else if (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift'){
        price.hargaPerPerson = randomPrice

    }else if (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others'){
        price.harga = fixPrice
    }

    returnValue(data, indexList, price)

    setEdit(!edit)
}

const handleBanner = (v, i, size) =>{
    let ban = banner
    ban[i] = {harga:v,size}
    setBanner([...ban])
}
    return (
        <React.Fragment key={indexList}>
            {
                data.serviceType == 'Makeup' ?
                    <>
                        <th scope="row">{indexList+1}</th>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>Touchup: RM <input type="number" value={makeupTouchup} onChange={(e)=>setMakeupTouchup(e.target.value)} /> <br/> Full: RM <input type="number" value={makeupFull} onChange={(e)=>setMakeupFull(e.target.value)} /> </td>
                            :
                            <td>Touchup:RM {makeupTouchup} <br/> Full: {makeupFull}/</td>

                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}>Edit</span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                    
                : (data.serviceType == 'KadBanner')?
                    <>
                        <th scope="row">{indexList+1}</th>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Kad: RM <input type="number" value={kadPrice} onChange={(e)=>setKadPrice(e.target.value)} /> 
                                <br/> 
                                {
                                    data.serviceDetails.banner == true && banner.map((v,i)=>{
                                        return(
                                            <React.Fragment key={i}>
                                                <p>{v.size}</p>
                                                <p><input type="number" placeholder={v.harga} onChange={(e)=>handleBanner(e.target.value, i, v.size)} /></p>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </td>
                            :
                            <td>
                                Kad: RM {kadPrice} 
                                <br/> 
                                {
                                    data.serviceDetails.banner == true && banner && banner.length >= 1 && banner.map((v,i)=>{
                                        return(
                                            <>
                                                <p>{v.size}</p>
                                                <p>Harga: RM {v.harga}</p>
                                            </>
                                        )
                                    })
                                }
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}>Edit</span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>   
                : (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift')?
                    <>
                        <th scope="row">{indexList+1}</th>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Price Per Person: RM <input type="number" value={randomPrice} onChange={(e)=>setRandomPrice(e.target.value)} /> 
                            </td>
                            :
                            <td>
                                Price Per Person: RM {randomPrice} 
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}>Edit</span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                    
            
                : (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others')?
                    <>
                        <th scope="row">{indexList+1}</th>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Price Per Person: RM <input type="number" value={fixPrice} onChange={(e)=>setFixPrice(e.target.value)} /> 
                            </td>
                            :
                            <td>
                                Price Per Person: RM {fixPrice} 
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}>Edit</span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                :null
            }
            
        </React.Fragment>
    )
}

export default PackageEdit
