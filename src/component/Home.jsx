import React from 'react';
import '../Home.css'

const Home = () => {
    return (
        <div className="hero">
            <div className="card text-bg-dark border-0">
                <img src="assets/bg.jpg" className="card-img hero-img" alt="Background" height="500px" />
                    <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON <br/>ARRIVALS</h5>
                    <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
            </div>
        </div>
    )
}

export default Home;