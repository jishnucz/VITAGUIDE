import React from 'react';
import { Link } from 'react-router-dom';
import bg from './assets/bg.jpg'; // Background image
import vitamin from './assets/file.png'; // Example image for services
import logo from './assets/l.png';

function ServicePage() {
  return (
    <>
     <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
          </div>
          
        </div>
      </nav>
      {/* Hero Section */}
      <header
        className="hero-section text-center bg-cover bg-center text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Our Services</h1>
          <p className="text-xl mb-8">
            Personalized solutions to help your child’s health and nutrition needs.
          </p>
          
        </div>
      </header>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Explore VitaGuide's Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Service 1: Personalized Health & Nutrition Insights */}
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={vitamin}
              alt="Personalized Health & Nutrition"
              className="w-32 h-32 mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Personalized Health & Nutrition Insights
            </h3>
            <p className="text-gray-600 mb-4">
              We provide tailored health and nutrition insights based on your
              child's specific needs, helping you ensure their optimal growth and
              well-being.
            </p>
            
          </div>

          {/* Service 2: Vitamin Deficiency Diagnosis */}
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={vitamin}
              alt="Vitamin Deficiency Diagnosis"
              className="w-32 h-32 mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Vitamin Deficiency Diagnosis
            </h3>
            <p className="text-gray-600 mb-4">
              With our easy-to-use symptom form, identify potential vitamin
              deficiencies in your child and receive expert dietary advice to
              address the issues.
            </p>
           
          </div>

          {/* Service 3: Interactive Quizzes */}
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={vitamin}
              alt="Interactive Quizzes"
              className="w-32 h-32 mb-6 rounded-full shadow-md"
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Interactive Quizzes
            </h3>
            <p className="text-gray-600 mb-4">
              Engage with fun, educational quizzes to test your knowledge on
              health, nutrition, and child development.
            </p>
            
          </div>
        </div>
      </section>

     {/* Why Choose VitaGuide Section */}
<section className="bg-blue-50 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-12">
      Why Choose VitaGuide?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {/* Feature 1 */}
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          Personalized Health Insights
        </h3>
        <p className="text-gray-600">
          Receive tailored health and nutrition advice based on your child's specific needs, ensuring the best care for their growth.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          Easy-to-Use Vitamin Deficiency Detection
        </h3>
        <p className="text-gray-600">
          Quickly assess potential vitamin deficiencies in your child with our simple yet accurate symptom-based diagnostic tool.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          Fun & Educational Quizzes
        </h3>
        <p className="text-gray-600">
          Engage your child with interactive quizzes to help them learn about health, nutrition, and overall well-being in a fun way.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="VitaGuide Logo" className="h-12 mr-3" />
              <span className="text-2xl font-semibold text-white">VitaGuide</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering parents with the best insights on children's nutrition
              and health.
            </p>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            <p>&copy; {new Date().getFullYear()} VitaGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ServicePage;
