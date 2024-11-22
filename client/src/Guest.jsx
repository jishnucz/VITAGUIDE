// src/components/GuestHomepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/bgr6.jpg'; // Replace with your image path
import arrowIcon from './assets/next.png'; // Add path to your arrow image

const GuestHomepage = () => {
    return (
        <div className="relative h-screen w-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-transparent p-8 text-center rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Vitaguide</h1>
                <p className="text-lg text-white mb-6">Explore important information about vitamins and their role in health.</p>
                <div className="flex flex-col space-y-4">
                    <Link to="/vitamin-information" className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded flex items-center justify-between hover:from-red-700 hover:to-red-800 transition duration-300 ease-in-out">
                        Vitamin Information
                        <img src={arrowIcon} alt="arrow" className="w-4 h-4 ml-2" />
                    </Link>
                    <Link to="/sideffects" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded flex items-center justify-between hover:from-blue-700 hover:to-blue-800 transition duration-300 ease-in-out">
                        Vitamin Side Effects
                        <img src={arrowIcon} alt="arrow" className="w-4 h-4 ml-2" />
                    </Link>
                    <Link to="/" className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded flex items-center justify-between hover:from-gray-700 hover:to-gray-800 transition duration-300 ease-in-out">
                        Back
                        <img src={arrowIcon} alt="arrow" className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GuestHomepage;
