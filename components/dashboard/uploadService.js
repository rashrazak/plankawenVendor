import React, {useState} from 'react'

function uploadService() {

    const [data, setdata] = useState(false)
    return (
        <div className={`upload-service-container`}>
            {
                data == true ?
                <React.Fragment>
                <h4>Service Anda</h4>
                <div className={`card-flex`}>
                    <div className={`card-service`}>
                        <img src="/images/placeholder/service-placheholder.png"/>
                        <p><span><img src="/images/icon/ico-venue-black.png"/> Dewan</span></p>
                    </div>
                    <div className={`card-service`}>
                        <img src="/images/placeholder/service-placheholder.png"/>
                        <p><span><img src="/images/icon/ico-venue-black.png"/> Dewan</span></p>
                    </div>
                    <div className={`card-service`}>
                        <img src="/images/placeholder/service-placheholder.png"/>
                        <p><span><img src="/images/icon/ico-venue-black.png"/> Dewan</span></p>
                    </div>
                    <div className={`card-service`}>
                        <img src="/images/placeholder/service-placheholder.png"/>
                        <p><span><img src="/images/icon/ico-venue-black.png"/> Dewan</span></p>
                    </div>
                    <div className={`card-service card-service-add`}>
                       
                    </div>
                </div>
                </React.Fragment>

                :
                <React.Fragment>
                <h4 className={`label-h4`}>Service Anda</h4>
                <div className={`upload-service`}>
                    <span></span>
                    <p><span><img src="/images/icon/arrow-left.png"/></span>Klik disini untuk memasukkan servis pertama anda</p>
                </div>
                </React.Fragment>

            }
            
            <style jsx>{`
                h4 { color: #75848E; font-size: 14px; font-weight: normal;}
                .upload-service-container { margin-bottom: 15%;}
                .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
                .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
                .upload-service { display: flex; align-items: center;}
                .upload-service > span { display: block; width: 100px; height: 70px; background-image: url(/images/icon/plus-circle.png); background-repeat: no-repeat; background-position: center; background-size: 24px; background-color: #FFF; border-radius: 5px; border: 1px solid #BABABA; margin-right: 10px; cursor: pointer;}
                .upload-service p { margin: 0; font-size: 12px; color: #3E3E3E;}
                .upload-service p > span { margin-right: 5px;}
                .card-flex { display: flex; flex-wrap: wrap;}
                .card-service { border-radius: 5px; width: 150px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.2); margin-right: 10px; margin-bottom: 20px;}
                .card-service > img { object-fit: cover; width: 100%;} 
                .card-service p { background-color: #FFF; margin: 0; padding: 10px; border-radius: 0px 0px 5px 5px;}
                .card-service p span img { margin-right: 10px;}
                .card-service-add { width: 100px; background-color: #EBF9F8;}
                .card-service-add p { background-color: transparent;}
                .card-service-add { background-image: url(/images/icon/plus-circle-dark.png); background-repeat: no-repeat; background-position: center 40%;}
            `}</style>
        </div>
    )
}

export default uploadService
