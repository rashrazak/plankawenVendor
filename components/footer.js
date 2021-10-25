import React from 'react'
import Link from  'next/link'
import '../css/footer.css'

function footer() {
    return (
        <div className={`container-footer`}>
            <div className={`footer-logo`}>
                <img src="/images/logos/logo-official.png"/>
                <p>© Copyright PlanKawen 2019 <br/> Kuala Lumpur, Malaysia</p>
            </div>
            <div className={`footer-link`}>
                <a href="https://plankawen.wixsite.com/website/hubungi-kami"><p>Tentang Kami</p></a>
                <a href="https://plankawen.wixsite.com/website/tentang-kami"><p>Hubungi Kami</p></a>
                <a href="https://plankawen.wixsite.com/website/blog"><p>Blog</p></a>
                <a href="https://www.facebook.com/Plankawen-745730829103427/"><img className={`fb-icon`} src="/images/icon/s-facebook.png"/></a>
                <a href="https://www.instagram.com/plankawen_/"><img className={`insta-icon`} src="/images/icon/s-instagram.png"/></a>
            </div>
            <style jsx>{`   
                .container-footer { display: flex; justify-content: space-between; align-items: center; padding: 0 60px; margin: 50px 0 20px 0;}
                .footer-logo { display: flex; align-items: center; justify-content: space-between; width: 40%;}
                .footer-logo > img { width: 50%;}
                .footer-link { display: flex; align-items: center; justify-content: space-between; width: 35%; flex-wrap: wrap;}
                .footer-logo > p { color: #BABABA; font-size: 12px; font-weight: 100; margin: 0;}
                .footer-link > a > p { display: inline-block; color: #3E3E3E; font-weight: 600; font-size: 14px; margin: 0; cursor: pointer; padding-left: 10px;}
                .footer-link > a > img { padding-left: 10px;}
                .fb-icon { width: 10px; cursor: pointer;}
                .insta-icon { width: 20px; cursor: pointer;}
                @media screen and ( max-width: 480px ) {
                    .footer-link { width: 100%:}
                    .fb-icon, .insta-icon { width: 20px; }
                    .container-footer { position: unset;}
                }
            `}</style>
        </div>
    )
}

export default footer
