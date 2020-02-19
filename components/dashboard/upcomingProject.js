import React, {useState} from 'react'



function upcomingProject() {

    const [data, setdata] = useState(false)
    return (
        <div>
            {
                data == false ?
                <div>
                    <h4 className={`label-h4`}>Projek akan datang</h4>
                    <p className={`label-p`}>Anda belum mengesahkan sebarang projek</p>
                </div>
                :
                <div className={`table-upcoming-project`}>
                    <h4>Projek akan datang</h4>
                    <table className={`table table-stripped`}>
                        <tbody>
                            <tr>
                                <td>Fiona</td>
                                <td>15 Oct 2019</td>
                                <td>Dewan, Pelamin</td>
                                <td>RM 15,000</td>
                            </tr>
                            <tr>
                                <td>Fiona</td>
                                <td>15 Oct 2019</td>
                                <td>Dewan, Pelamin</td>
                                <td>RM 15,000</td>
                            </tr>
                            <tr>
                                <td>Fiona</td>
                                <td>15 Oct 2019</td>
                                <td>Dewan, Pelamin</td>
                                <td>RM 15,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            <style jsx>{`
                .label-h4 { color: #3E3E3E; font-size: 16px; font-weight: normal;}
                .label-p { color: #9B9B9B; font-size: 12px; font-weight: normal;}
                .table-upcoming-project > h4 { color: #75848E; font-size: 14px; font-weight: normal;}
                td { color: #3E3E3E; font-size: 14px; font-weight: normal; border-top: 0;}
                td:last-child { color: #47CBC4;}
                tr:nth-child(odd) { background-color: #FFF;}
                tr:nth-child(even) { background-color: #EAEAEA;}

            `}</style>
        </div>
    )
}

export default upcomingProject
