import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow/BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const [bookings, setBooking] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){

                    setBooking(data);
                }else{
                    navigate('/')
                }
            })
    }, [url, navigate])

    const handleDelete =(id)=>{
        const proceed = confirm('are you sure want to delete');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    alert('delete successful');
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBooking(remaining);
                }
            })
        }
    }

    const handleBookingConfirm=(id)=>{

        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // update status
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBooking = [updated, ...remaining];
                setBooking(newBooking);
            }
        })
    }

    return (
        <div>
            <h1>your bookings {bookings.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                   
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service Image</th>
                            <th>Title</th>
                            <th> Price </th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        bookings.map( booking => 
                            <BookingRow 
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>
                        )
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;