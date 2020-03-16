import React, {useState} from 'react'

function sideBarDash() {

    const [data, setdata] = useState(false)

    return (
        <div className={`sidebar-container`}>
            <div className={`jumlah-terkumpul-div`}>
                {
                    data == true ?

                    <React.Fragment>
                        <p>Jumlah terkumpul</p>
                        <h4 className={`jumlah-h4`}>MYR <span>00.00</span></h4>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h4 className={`jumlah-h4`}>MYR <span>00.00</span></h4>
                    </React.Fragment>
                }
                
            </div>
            <div className={`pemberitahuan-div`}>
                {
                    data == true ?
                    <React.Fragment>
                        <h4>Pemberitahuan</h4>
                        <div className={`card-pemberitahuan`}>
                            <table>
                                <tr>
                                    <td>Ali & Siti <br/> Dewan, pelamin</td>
                                    <td>15 Oct 2019</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className={`jumlah-td`}>RM 15,000</td>
                                </tr>
                            </table>
                        </div>
                        <div className={`card-pemberitahuan`}>
                            <table>
                                <tr>
                                    <td>Ali & Siti <br/> Dewan, pelamin</td>
                                    <td>15 Oct 2019</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className={`jumlah-td`}>RM 15,000</td>
                                </tr>
                            </table>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h4 className={`label-h4`}>Pemberitahuan</h4>
                        <p className={`label-p`}>Sebarang bentuk mesej dari bakal pengantin akan dikemukakan disini.</p>
                    </React.Fragment>
                }
            </div>

            <style jsx>{`
                .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
                .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
                .sidebar-container { float: right; width: 30%; display: inline-block; background-color: #F5F6FA; vertical-align: top; padding: 30px; border-radius: 5px; height: calc(100vh - 181px); overflow-y: scroll; margin-top: 53px;}
                .jumlah-terkumpul-div { text-align: center; margin-bottom:  10%;}
                .jumlah-terkumpul-div > p { color: #9B9B9B; font-size: 12px; font-weight: normal; margin: 0;}
                .pemberitahuan-div > h4 { color: #75848E; font-size: 14px; font-weight: normal;}
                .card-pemberitahuan { background-color: #FFF; box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; margin-top: 10px;}
                .card-pemberitahuan table { width: 100%;}
                .card-pemberitahuan td { font-size: 14px; color: #3E3E3E; font-weight: normal; padding:0; vertical-align: top;}
                .card-pemberitahuan td:last-child {text-align: right;}
                .jumlah-td { color: #47CBC4;}
                .jumlah-h4 { color: #9B9B9B; font-size: 22px; font-weight: normal; }
                .jumlah-h4 > span { color: #47CBC4; }
            `}</style>
        </div>
    )
}

export default sideBarDash
