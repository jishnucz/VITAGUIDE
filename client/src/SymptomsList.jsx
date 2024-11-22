<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/l.png';
import img from './assets/kids6.jpg'; // Background image

const SymptomsList = () => {
  const [formData, setFormData] = useState({
    ageGroup: '',
    height: '',
    weight: '',
    signsSymptoms: {
      fatigue: false,
      moodChanges: false,
      poorAppetite: false,
      frequentColds: false,
      drySkin: false,
      hairLoss: false,
      slowGrowth: false,
      noWeightGain: false,
      paleSkin: false,
      diarrhea: false,
      constipation: false,
      delayedWalking: false,
      lowAttentionSpan: false,
      squinting: false,
      brittlenails: false,
      frequentheadaches: false,
      musclecramps: false,
      jointpain: false,
      paleconjunctiva: false,
      skinrashes: false,
      sensitivitytolight: false,
      restlesslegssyndrome: false,
      swollengums: false,
      frequentbruising: false,
      insomnia: false,
    },
    dentalIssues: '',
    bloodTest: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [deficiencies, setDeficiencies] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    setFormData(prevData => ({
      ...prevData,
      signsSymptoms: {
        ...prevData.signsSymptoms,
        [name]: e.target.checked,
      },
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const data = await response.json();
      alert(data.message);
      setDeficiencies(data.deficiencies);

      setTimeout(() => navigate('/dietplan'), 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data: ' + error.message);
    }
  };

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
      <div
        className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-xl p-8 m-4">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-teal-700">Health & Nutritional Assessment</h1>

          {currentStep === 0 && (
            <fieldset className="mb-6 space-y-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">General Information</h2>

              <label className="block">
                <span className="text-gray-700">Age group of Child</span>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border rounded shadow-sm"
                >
                  <option value="">Select</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-8 years">6-8 years</option>
                  <option value="9-13 years">9-13 years</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Height (cm)</span>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border rounded shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Weight (kg)</span>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border rounded shadow-sm"
                />
              </label>
            </fieldset>
          )}

          {currentStep === 1 && (
            <fieldset className="mb-6 space-y-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">Signs and Symptoms</h2>
              {Object.keys(formData.signsSymptoms).map(symptom => (
                <label key={symptom} className="block">
                  <input
                    type="checkbox"
                    name={symptom}
                    checked={formData.signsSymptoms[symptom]}
                    onChange={handleCheckboxChange}
                    className="mr-2 rounded border-gray-300"
                  />
                  {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </fieldset>
          )}

          {currentStep === 2 && (
            <fieldset className="mb-6 space-y-4">
              <label className="block">
                <span className="text-gray-700">Dental Issues (e.g., frequent cavities)</span>
                <select
                  name="dentalIssues"
                  value={formData.dentalIssues}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border rounded shadow-sm"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700">Blood Test Results (e.g., low iron)</span>
                <select
                  name="bloodTest"
                  value={formData.bloodTest}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full p-2 border rounded shadow-sm"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </fieldset>
          )}

          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Submit & Next
              </button>
            )}
          </div>

          {deficiencies.length > 0 && (
            <div className="mt-8 p-4 bg-teal-100 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-teal-700">Predicted Deficiencies:</h2>
              <ul className="list-disc pl-6 text-teal-800">
                {deficiencies.map((deficiency, index) => (
                  <li key={index}>{deficiency}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SymptomsList;
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/doctorchild.jpeg';
import doctorCheckingPatient from '../video/doctorcheckingpatient.mp4';

const SymptomsList = () => {
    const [formData, setFormData] = useState({
        ageGroup: '',
        height: '',
        weight: '',
        signsSymptoms: {
            fatigue: false,
            moodChanges: false,
            poorAppetite: false,
            frequentColds: false,
            drySkin: false,
            hairLoss: false,
            slowGrowth: false,
            noWeightGain: false,
            paleSkin: false,
            diarrhea: false,
            constipation: false,
            delayedWalking: false,
            lowAttentionSpan: false,
            squinting: false,
            brittlenails: false,
            frequentheadaches: false,
            musclecramps: false,
            jointpain: false,
            paleconjunctiva: false,
            skinrashes: false,
            sensitivitytolight: false,
            restlesslegssyndrome: false,
            swollengums: false,
            frequentbruising: false,
            insomnia: false,
        },
        dentalIssues: '',
        bloodTest: '',
    });

    const [deficiencies, setDeficiencies] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setFormData(prevData => ({
            ...prevData,
            signsSymptoms: {
                ...prevData.signsSymptoms,
                [name]: e.target.checked,
            },
        }));
    };

    const validateInputs = () => {
        const heightInput = document.querySelector('input[name="height"]');
        const weightInput = document.querySelector('input[name="weight"]');

        let isValid = true;

        if (heightInput.value <= 0) {
            heightInput.setCustomValidity('Height must be a positive number.');
            isValid = false;
        } else {
            heightInput.setCustomValidity('');
        }

        if (weightInput.value <= 0) {
            weightInput.setCustomValidity('Weight must be a positive number.');
            isValid = false;
        } else {
            weightInput.setCustomValidity('');
        }

        return isValid;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!validateInputs()) return;
        }
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/symptoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const data = await response.json();
            alert(data.message);
            setDeficiencies(data.deficiencies);

            setTimeout(() => navigate('/diet-plan'), 2000);
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting data: ' + error.message);
        }
    };

    return (
        <div 
            className="flex justify-center items-start min-h-screen relative w-screen overflow-hidden" 
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                marginTop: '64px',
                padding: '0',
            }}
        >
            {/* Overlay for brightness */}
            <div className="absolute inset-0 bg-white opacity-20"></div>
            <div className="flex w-full h-full relative z-10">
                <div className="flex-1 h-full">
                    <video width="100%" height="100%" controls autoPlay muted className="rounded-lg shadow-md h-full">
                        <source src={doctorCheckingPatient} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <form 
                    onSubmit={handleSubmit} 
                    className="flex-1 h-full max-w-lg mx-0 p-6 flex flex-col"
                >
                    <h1 className="text-5xl font-bold mb-8 text-white text-center shadow-lg">General Information</h1>

                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <fieldset className="mb-6 p-6 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg shadow-md flex-grow">
                            <label className="block mb-4 text-lg font-medium text-teal-600">
                                Age group of Child
                                <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} required className="mt-1 block w-full p-3 border border-teal-400 rounded shadow">
                                    <option value="">Select</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="6-8 years">6-8 years</option>
                                    <option value="9-13 years">9-13 years</option>
                                </select>
                            </label>
                            <label className="block mb-4 text-lg font-medium text-teal-600">
                                Height (cm):
                                <input 
                                    type="number" 
                                    name="height" 
                                    value={formData.height} 
                                    onChange={handleChange} 
                                    required 
                                    className="mt-1 block w-full p-3 border border-teal-400 rounded shadow" 
                                    min="1" 
                                />
                            </label>
                            <label className="block mb-4 text-lg font-medium text-teal-600">
                                Weight (kg):
                                <input 
                                    type="number" 
                                    name="weight" 
                                    value={formData.weight} 
                                    onChange={handleChange} 
                                    required 
                                    className="mt-1 block w-full p-3 border border-teal-400 rounded shadow" 
                                    min="1" 
                                />
                            </label>
                        </fieldset>
                    )}

                    {/* Step 2: Signs and Symptoms */}
                    {currentStep === 2 && (
                        <fieldset className="mb-6 p-6 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg shadow-md flex-grow">
                            <h3 className="text-2xl font-semibold mb-4 text-white">Signs and Symptoms</h3>
                            {Object.keys(formData.signsSymptoms).map(symptom => (
                                <label key={symptom} className="block mb-4 flex items-center text-lg text-teal-600">
                                    <input
                                        type="checkbox"
                                        name={symptom}
                                        checked={formData.signsSymptoms[symptom]}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 w-5 h-5"
                                    />
                                    {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace(/([A-Z])/g, ' $1')}?
                                </label>
                            ))}
                        </fieldset>
                    )}

                    {/* Step 3: Additional Questions */}
                    {currentStep === 3 && (
                        <fieldset className="mb-6 p-6 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg shadow-md flex-grow">
                            <label className="block mb-4 text-lg font-medium text-teal-600">
                                Does your child frequently have dental issues like cavities?
                                <select name="dentalIssues" value={formData.dentalIssues} onChange={handleChange} required className="mt-1 block w-full p-3 border border-teal-400 rounded shadow">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                            <label className="block mb-4 text-lg font-medium text-teal-600">
                                Has your child had any blood test that indicated low levels of iron, calcium, or other nutrients?
                                <select name="bloodTest" value={formData.bloodTest} onChange={handleChange} required className="mt-1 block w-full p-3 border border-teal-400 rounded shadow">
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                        </fieldset>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                        {currentStep > 1 && (
                            <button type="button" onClick={handleBack} className="py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg">
                                Back
                            </button>
                        )}
                        {currentStep < 3 ? (
                            <button type="button" onClick={handleNext} className="py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg">
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg">
                                Submit
                            </button>
                        )}
                    </div>

                    {/* Display predicted deficiencies */}
                    {deficiencies.length > 0 && (
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-teal-600">Predicted Deficiencies:</h2>
                            <ul className="list-disc pl-5">
                                {deficiencies.map((deficiency, index) => (
                                    <li key={index} className="text-lg text-gray-800">{deficiency}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SymptomsList;
>>>>>>> 5ad1062ccbd765ac5aae2f44ff64c08275050f4e
