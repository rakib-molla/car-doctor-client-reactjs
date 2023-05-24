import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

    const [asc, setAcc] = useState(true)
    const [services, setServices] = useState([]);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${asc ? "asc" : "desc"}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [asc, search])

    const handleSearch=(event)=>{
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
    }
    return (
        <div>
            <div className='text-center mt-4'>
                <h3 className='text-3xl text-orange-500 font-bold'>Our Services</h3>
                <h1 className="text-5xl font-bold mb-5">Our Services Area</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tempore id facilis cupiditate, reprehenderit nobis aperiam ut? Qui alias ipsam molestias recusandae quasi exercitationem omnis! Porro aperiam officiis quae sequi!</p>




                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                <br />
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <button onClick={() => setAcc(!asc)} className="btn"> {asc ? "high to low " : " low to high"} </button>

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