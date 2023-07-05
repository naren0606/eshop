import React from 'react';
import '../Home.css'

const Home = () => {
    return (
        <div className="hero">
            <div className="card text-bg-dark border-0">
               <span><h1 style={{fontSize:'85px'}}>Welcome to <br/>our site</h1></span> 
                <img src="assets/bg.jpg" className="card-img hero-img" alt="Background"/>
            </div>
        </div>
    )
}

export default Home;