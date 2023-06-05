import React from 'react';
import './styles/home.css';
import AuthComponent from './authComponent';


const Home = () => {

    return (
        <div>
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="mainArea">
                        <div className="mainContent">
                            {/* Logo */}
                            <div>
                        <img src="/frontLogo.jpeg" height="50px" width="50px" alt="frontLogo"/>      
                            </div>
                            {/* Welcome Text */}
                            <div className="welcomeText">
                                <div className="heading"><h3>Welcome Back</h3></div>
                                <div className="subHeading"><p>Welcome Back , Please Enter Your Details</p></div>
                            </div>
                            {/* Login / Signup Component */}
                            <div>
                                <AuthComponent />
                            </div>

                            <div className="footer mt-4">
                                <div className="mainFooter">
                                    Lorem ipsum dolor sit amet consectetur, architecto corrupti, maxime numquam obcaecati animi eos delectus quaerat, temporibus deserunt incidunt libero mollitia nesciunt!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="imageArea">
                        <img src="/example.jpeg" height="100%" width="100%"  alt="imagearea"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;