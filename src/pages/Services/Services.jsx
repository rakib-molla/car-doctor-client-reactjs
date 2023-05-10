import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    return (
        <div>
            <div className='text-center mt-4'>
                <h3 className='text-3xl text-orange-500 font-bold'>Our Services</h3>
                <h1 className="text-5xl font-bold mb-5">Our Services Area</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tempore id facilis cupiditate, reprehenderit nobis aperiam ut? Qui alias ipsam molestias recusandae quasi exercitationem omnis! Porro aperiam officiis quae sequi!</p>

                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <button className="btn btn-warning bg-orange-800 text-white border-none">Get More Info</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {services.map(service => <ServiceCard
                 service={service}
                 key={service._id}
                 ></ServiceCard>)}
            </div>
        </div>
    );
};

export default Services;