
const BookingRow = ({ booking, handleDelete, handleBookingConfirm}) => {
    const { service, date, price, img, _id, status } = booking;

    
    return (

        <tr>
            <th>
                <label>
                    <button onClick={ () => handleDelete(_id) } className="btn btn-sm btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td> ${price}</td>
            <td> {date}</td>
            <th>
                { status === 'confirm' ? <span className="font-bold text-primary">Confirmed</span> :
                    <button className="btn btn-ghost btn-xs" onClick={()=>handleBookingConfirm(_id)}>Please Confirm</button>}
            </th>
        </tr>
    );
};

export default BookingRow;