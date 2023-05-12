import { Link } from "react-router-dom";

const ServiceCard = ({service}) => {
    const {_id, title, img, price,} = service;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-actions flex items-center justify-between">
                    <p className="font-bold text-orange-300 ">Price: $ {price}</p>
                        <button className="btn btn-primary">
                            <Link to={`/book/${_id}`}>Book Now</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;