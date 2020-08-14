import React, {useContext, useState, useEffect} from 'react'
import { Button} from 'reactstrap';
import Router from 'next/router';
import {PackageContext} from '../../contexts/PackageContext'
import Filebase64 from 'react-file-base64'
import * as ls from 'local-storage'


//pending patot ada image compressor
    
function PackageUpload({pagex}) {

    const {images, setImages} = useContext(PackageContext);
    const [imageLimit, setimageLimit] = useState(3)
   
    const uploadOnDone = (file) => {
        let f = file.file;
        let iL = imageLimit
        if (f.size > 300000) {
            alert('Limit saiz gambar hanya 300kb sahaja untuk satu gambar, sila compress gambar anda')
            return false
        }
        if (iL == 0) {
            alert('Limit upload maximum hanya 3')
            return false
        }
        setimageLimit((old) => old - 1 )
        setImages((old) => [...old, file])

    }

    const deleteImage = (index) => {
        let im = images;
        im.splice(index, 1);
        setImages([...im]);
        setimageLimit((old)=> old + 1)
    }
    
    const submitServiceUpload = () => {
        ls.set('packageImages', images)
        Router.push('/package/add/review')
    }
    return (
        <div className="form-service form-service-height">
            <div className="form-section">
                <h4>Upload Gambar Servis Anda. Maximum gambar adalah 3 ({imageLimit})</h4>
                <Filebase64 multiple={ false } onDone={(x) => uploadOnDone(x) } />
            </div>
            <div className="form-section">
                {images.map((val,index) => {
                    let b64 = val.urlStorage || val.base64
                    return(
                        <div key={index} className="img-section">
                            <img src={b64} alt=""/>
                            <div className="delete-image" onClick={() => deleteImage(index)}>X</div>
                        </div>
                    )
                })}
            </div>
            <div className="form-button">
                <Button  className="btn-cancel" onClick={() => Router.back()}>Back</Button>{' '}
                <Button  className="btn-next" onClick={() => submitServiceUpload()}>Next</Button>{' '}
            </div>
            <style jsx>{`
                .form-button { display: flex; justify-content: space-between; }
                .form-service-height { height: calc(100vh - 350px);}
                .checkbox-type { display: flex; justify-content:space-around; align-item: center; }
                p {font-weight:400; color: #3e3e3e; font-size: 14px; }
                .form-section { margin: 20px 0; }
                h4 { text-align: center; font-weight: 400; color: #75848E; font-size: 16px; margin-bottom: 10px; }
                .area-covered-div { display: inline-block; margin-right: 10px; }
                .area-covered-div > label { font-weight: 400; color: #3E3E3E; font-size: 14px;}
                .area-covered-div > label > input { margin-right: 5px; }
                .img-section { display: inline-block; width: 150px; height: 150px; position:relative; margin-right: 10px;}
                .img-section > img { width: 150px; height: 150px; object-fit: cover; border: 2px solid #EAEAEA;}
                .delete-image { position: absolute; top: -5px; right: -5px; background-color: red; cursor: pointer; height: 18px; width: 18px; border-radius: 25px; text-align: center; font-size: 13px; color: #FFF;}
            `}</style>
        </div>
    )
}

export default PackageUpload
