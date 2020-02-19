import React from 'react'

function uploadService() {
    return (
        <div className={`upload-service-container`}>
            <h4 className={`label-h4`}>Service Anda</h4>
            <div className={`upload-service`}>
                <span></span>
                <p><span><img src="static/images/icon/arrow-left.png"/></span>Klik disini untuk memasukkan servis pertama anda</p>
            </div>
            <style jsx>{`
                .upload-service-container { margin-bottom: 15%;}
                .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
                .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
                .upload-service { display: flex; align-items: center;}
                .upload-service > span { display: block; width: 100px; height: 70px; background-image: url(static/images/icon/plus-circle.png); background-repeat: no-repeat; background-position: center; background-size: 24px; background-color: #FFF; border-radius: 5px; border: 1px solid #BABABA; margin-right: 10px;}
                .upload-service p { margin: 0; font-size: 12px; color: #3E3E3E;}
                .upload-service p > span { margin-right: 5px;}
            `}</style>
        </div>
    )
}

export default uploadService
