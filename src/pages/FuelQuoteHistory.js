import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './FuelQuote.module.css';



function FuelQuoteHistory(){
    let navigate = useNavigate();
    const [Loading,setLoading] = useState(false)
    const [backendDetails, setBackendDetails] = useState({
        id: 0,
        username: "",
        password: ""
    })

    useEffect(() => {
        setLoading(false)
        fetch('http://localhost:5000/login_info')
        .then(res => {
            return res.json();
        })
        .then( data => {
            setBackendDetails(data.currentlyLoggedIn.at(0))
            setLoading(true);
        })
    },[]);

    useEffect(() =>{
        if(Loading && backendDetails === undefined){
            alert("Please Login");
            navigate('/LoginForm');
        }
    },[backendDetails])

    const [backendData, setBackendData] = useState([])
    const value = {backendDetails}
    
    useEffect(() => {
        fetch('http://localhost:5000/quote_info',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            //console.log(data)
            setBackendData(data.result)
        })
    },[backendDetails]);
    
   
    return(
        <div className="FuelQuoteHistory">
            <div className={styles.table_box}>
                <table className={styles.table}>
                <tr>
                    <th className={styles.th}>Delivery Date</th>
                    <th className={styles.th}>Delivery Address</th>
                    <th className={styles.th}>Gallons Requested</th>
                    <th className={styles.th}>Suggested Price/Gallons</th>
                    <th className={styles.th}>Total Amount</th>
                </tr>
            {backendData.map((val,key) =>{
                    return(
                        <tr key={val.key}>
                            <th className={styles.th}>{val.Deliver_Date}</th>
                            <th className={styles.th}>{val.Delivery_Address}</th>
                            <th className={styles.th}>{val.Gallons_Requested}</th>
                            <th className={styles.th}>{val.Suggested_Price}</th>
                            <th className={styles.th}>{val.Total_Amount}</th>
                        </tr>
                    );
                })} 
            </table>
            </div>
        </div>
    );
}

export default FuelQuoteHistory