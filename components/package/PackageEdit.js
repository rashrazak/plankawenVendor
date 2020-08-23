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
                        <td scope="row">{indexList+1}</td>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>Touchup: RM <input className="form-control form-control-edit" type="number" value={makeupTouchup} onChange={(e)=>setMakeupTouchup(e.target.value)} /> <br/> Full: RM <input className="form-control form-control-edit" type="number" value={makeupFull} onChange={(e)=>setMakeupFull(e.target.value)} /> </td>
                            :
                            <td>Touchup:RM {makeupTouchup} <br/> Full: {makeupFull}/</td>

                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}><img src="/images/icon/edit.svg"/></span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                    
                : (data.serviceType == 'KadBanner')?
                    <>
                        <td scope="row">{indexList+1}</td>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Kad: RM <input className="form-control form-control-edit" type="number" value={kadPrice} onChange={(e)=>setKadPrice(e.target.value)} /> 
                                <br/> 
                                {
                                    data.serviceDetails.banner == true && banner.map((v,i)=>{
                                        return(
                                            <React.Fragment key={i}>
                                                <p>{v.size}</p>
                                                <p><input className="form-control form-control-edit" type="number" placeholder={v.harga} onChange={(e)=>handleBanner(e.target.value, i, v.size)} /></p>
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
                                                <p className="kad-banner-p">{v.size}</p>
                                                <p className="kad-banner-p">Harga: RM {v.harga}</p>
                                            </>
                                        )
                                    })
                                }
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}><img src="/images/icon/edit.svg"/></span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>   
                : (data.serviceType == 'Hantaran' || data.serviceType == 'Caterer' || data.serviceType == 'DoorGift')?
                    <>
                        <td scope="row">{indexList+1}</td>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Price Per Person: RM <input className="form-control form-control-edit" type="number" value={randomPrice} onChange={(e)=>setRandomPrice(e.target.value)} /> 
                            </td>
                            :
                            <td>
                                Price Per Person: RM {randomPrice} 
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}><img src="/images/icon/edit.svg"/></span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                    
            
                : (data.serviceType == 'Photographer' || data.serviceType == 'Videographer' || data.serviceType == 'WeddingDress' || data.serviceType == 'Pelamin' || data.serviceType == 'Others')?
                    <>
                        <td scope="row">{indexList+1}</td>
                        <td>{data.serviceName}</td>
                        <td>{data.serviceType}</td>
                        {   edit == true?
                            <td>
                                Price Per Person: RM <input className="form-control form-control-edit" type="number" value={fixPrice} onChange={(e)=>setFixPrice(e.target.value)} /> 
                            </td>
                            :
                            <td>
                                Price Per Person: RM {fixPrice} 
                            </td>
                        }
                        <td>{edit == false ?<span onClick={()=>setEdit(!edit)}><img src="/images/icon/edit.svg"/></span>:<span onClick={()=>clickEdit()}>Save</span>}</td>
                    </>
                :null
            }
            <style jsx>{`
                td { font-size: 14px; font-weight: normal; color: #3E3E3E; padding: 10px; }
                th { font-size: 14px; font-weight: normal; color: #3E3E3E;}
                td:nth-child(2) { font-weight: bold;}
                td:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px;}
                td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px;}
                .kad-banner-p { font-size: 14px; font-weight: normal; color: #3E3E3E; margin-bottom: 0;}
                .form-control-edit { height: 40px;}
                td > span { cursor: pointer;}
                td > span > img:hover { color: red;}
            `}</style>
        </React.Fragment>
    )
}

export default PackageEdit
