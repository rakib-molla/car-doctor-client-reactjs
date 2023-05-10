import About from "../About/About";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <h1 className="bg-gray-500">this is home</h1>
        </div>
    );
};

export default Home;