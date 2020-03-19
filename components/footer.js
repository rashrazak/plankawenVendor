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
                <Link href="https://plankawen.wixsite.com/website/hubungi-kami"><a><p>Tentang Kami</p></a></Link>
                <Link href="https://plankawen.wixsite.com/website/tentang-kami"><a><p>Hubungi Kami</p></a></Link>
                <Link href="https://plankawen.wixsite.com/website/blog"><a><p>Blog</p></a></Link>
                <Link href="https://www.facebook.com/Plankawen-745730829103427/"><a><img className={`fb-icon`} src="/images/icon/s-facebook.png"/></a></Link>
                <Link href="https://www.instagram.com/plankawen_/"><a><img className={`insta-icon`} src="/images/icon/s-instagram.png"/></a></Link>
            </div>
            <style jsx>{`   
                .container-footer { display: flex; justify-content: space-between; align-items: center; padding: 0 60px; margin: 50px 0 20px 0;}
                .footer-logo { display: flex; align-items: center; justify-content: space-between; width: 30%;}
                .footer-logo > img { width: 50%;}
                .footer-link { display: flex; align-items: center; justify-content: space-between; width: 35%;}
                .footer-logo > p { color: #BABABA; font-size: 12px; font-weight: 100; margin: 0;}
                .footer-link > a > p { display: inline-block; color: #3E3E3E; font-weight: 600; font-size: 14px; margin: 0; cursor: pointer;}
                .fb-icon { width: 10px; cursor: pointer;}
                .insta-icon { width: 20px; cursor: pointer;}
            `}</style>
        </div>
    )
}

export default footer
