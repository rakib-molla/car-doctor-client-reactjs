import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const BookService = () => {
    const services = useLoaderData();
    const {title, _id, price, img} = services;

    const {user} = useContext(AuthContext)

    const handleBookServices = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName : name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }

        console.log(booking);

        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                alert('service book successfully')
            }
        })

    }
    return (
        <div>
            <h1 className="text-center font-bold text-xl">Book Service: {title}</h1>
            <div className="card-body">
                <form onSubmit={handleBookServices}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" defaultValue={user?.displayName} name="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" defaultValue={user?.email} name="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" defaultValue={'$ '+ price} placeholder="password" className="input input-bordered" />
                            
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary btn-block" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookService;