import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {

    const {signIn} = useContext(AuthContext);
    
    const from = location.state?.from?.pathname || '/' ;
    const navigate = useNavigate()
    const handleLogin =(event)=>{
        event.preventDefault();
        const form  = event.target
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(result => {
            const user = result.user;
            const loggedUser = {
                email: user.email
            }
            console.log(loggedUser);
            
            fetch('http://localhost:5000/jwt',{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log('jwt response', data);
                // Warning: local storage is not the best (second best place ) to store access token 
                localStorage.setItem('car-access-token', data.token);
                navigate(from, {replace: true})
            })
            

        })
        .catch((error)=>{
            console.log(error.message);
        })
        
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-3xl text-center font-bold">Login now!</h1>
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="text" placeholder="password" name='password' className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className='btn btn-primary' value="Login" />
                                </div>
                            </form>
                            <p className='my-4 text-center'>New to Car Doctors <Link to="/signup" className='text-orange-600 font-bold'>Signup</Link></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;