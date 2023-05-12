import About from "../About/About";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Services></Services>
            <h1 className="bg-gray-500">Home Section </h1>
        </div>
    );
};

export default Home;