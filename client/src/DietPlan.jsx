<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/l.png';

const DietPlan = () => {
    const [formData, setFormData] = useState({
        vitaminDeficiency: '',
        foodFrequency: {
            fruits: '',
            vegetables: '',
            dairy: '',
            meat: '',
            fish: '',
            eggs: '',
        },
        waterIntake: '',
    });
    const [step, setStep] = useState(1);
    const [dietPlan, setDietPlan] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.foodFrequency) {
            setFormData((prevData) => ({
                ...prevData,
                foodFrequency: {
                    ...prevData.foodFrequency,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleNextStep = () => setStep((prev) => prev + 1);
    const handlePrevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/diet-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit data');

            const data = await response.json();
            alert(data.message);
            setDietPlan(data.dietPlan);
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting data: ' + error.message);
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="" className="flex items-center">
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
            <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Dietary Habits Form</h1>

                {/* Step Indicator */}
                <div className="flex justify-between items-center mb-8">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className={`w-full h-2 rounded-full ${step >= index ? 'bg-blue-500' : 'bg-gray-300'} transition-all duration-300`}
                        ></div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Specify the type of vitamin deficiency:
                            </label>
                            <select
                                name="vitaminDeficiency"
                                value={formData.vitaminDeficiency}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select an option</option>
                                <option value="Vitamin A">Vitamin A</option>
                                <option value="Vitamin B1 (Thiamine)">Vitamin B1 (Thiamine)</option>
                                <option value="Vitamin B2 (Riboflavin)">Vitamin B2 (Riboflavin)</option>
                                <option value="Vitamin B3 (Niacin)">Vitamin B3 (Niacin)</option>
                                <option value="Vitamin B6">Vitamin B6</option>
                                <option value="Vitamin B12">Vitamin B12</option>
                                <option value="Vitamin C">Vitamin C</option>
                                <option value="Vitamin D">Vitamin D</option>
                                <option value="Vitamin E">Vitamin E</option>
                                <option value="Vitamin K">Vitamin K</option>
                                <option value="Iron">Iron Deficinecy</option>
                                <option value="Fiber Deficinecy">Fiber Deficiency</option>
                                <option value="Omega-3 Fatty Acids Deficiency">Omega-3 Fatty Acids Deficiency</option>
                                <option value="Magnesium Deficiency">Magnesium Deficiency</option>
                                <option value="Other">Other</option>
                            </select>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Frequency</h3>
                            {['fruits', 'vegetables', 'dairy', 'meat', 'fish', 'eggs'].map((food) => (
                                <div key={food} className="mb-4">
                                    <label className="block text-gray-700 mb-1 capitalize">{food}</label>
                                    <select
                                        name={food}
                                        value={formData.foodFrequency[food]}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Occasionally">Occasionally</option>
                                        <option value="Never">Never</option>
                                    </select>
                                </div>
                            ))}
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md shadow hover:bg-gray-400 transition-all"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Water Intake (per day in cups)
                            </label>
                            <select
                                name="waterIntake"
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select amount</option>
                                <option value="Less than 2 cups">Less than 2 cups</option>
                                <option value="2-4 cups">2 - 4 cups</option>
                                <option value="4-6 cups">4 - 6 cups</option>
                                <option value="More than 7 cups">More than 7 cups</option>
                            </select>

                            <button
                                type="submit"
                                className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </form>

                {/* Display Diet Plan if Available */}
                {dietPlan && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Suggested Diet Plan</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Day</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Morning</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Afternoon</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Night</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dietPlan.map((day) => (
                                        <tr key={day.day} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm text-gray-700">{day.day}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{day.meals.morning}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{day.meals.afternoon}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{day.meals.night}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default DietPlan;
=======
import React, { useState } from 'react';

const DietPlan = () => {
    const [formData, setFormData] = useState({
        vitamins: '',
        vitaminDeficiency: '',
        foodFrequency: {
            fruits: '',
            vegetables: '',
            dairy: '',
            meat: '',
            fish: '',
            eggs: '',
        },
        favoriteFood: '',
        packagedFood: '',
        sweetsPreference: '',
        mealsPerDay: '',
        variedDiet: '',
        waterIntake: '',
        foodIntolerances: '',
        foodRefusal: '',
        parentalConcerns: '',
        changesInHabits: '',
    });
    const [dietPlan, setDietPlan] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.foodFrequency) {
            setFormData(prevData => ({
                ...prevData,
                foodFrequency: {
                    ...prevData.foodFrequency,
                    [name]: value,
                },
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const renderFoodFrequencyOptions = (food) => (
        <label key={food} className="block mb-4">
            {food.charAt(0).toUpperCase() + food.slice(1)}:
            <select 
                name={food} 
                value={formData.foodFrequency[food]} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full p-3 border border-gray-300 rounded"
            >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="1-2">1 - 2</option>
                <option value="3-4">3 - 4</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
            </select>
        </label>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/diet-plan', {
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
            setDietPlan(data.dietPlan); // Set the diet plan from the response

        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting data: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-teal-300 to-cyan-400 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-8 mt-10 text-white text-center">Dietary Habits</h1>
            <label className="block mb-4">
                Please specify the type of vitamin deficiency:
                <select 
                    name="vitaminDeficiency" 
                    value={formData.vitaminDeficiency} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full p-3 border border-gray-300 rounded"
                >
                    <option value="">Select</option>
                    <option value="Vitamin A">Vitamin A</option>
                    <option value="Vitamin B1 (Thiamine)">Vitamin B1 (Thiamine)</option>
                    <option value="Vitamin B2 (Riboflavin)">Vitamin B2 (Riboflavin)</option>
                    <option value="Vitamin B3 (Niacin)">Vitamin B3 (Niacin)</option>
                    <option value="Vitamin B6">Vitamin B6</option>
                    <option value="Vitamin B12">Vitamin B12</option>
                    <option value="Vitamin C">Vitamin C</option>
                    <option value="Vitamin D">Vitamin D</option>
                    <option value="Vitamin E">Vitamin E</option>
                    <option value="Vitamin K">Vitamin K</option>
                    <option value="Iron">Iron Deficinecy</option>
                    <option value="Fiber Deficinecy">Fiber Deficiency</option>
                    <option value="Omega-3 Fatty Acids Deficiency">Omega-3 Fatty Acids Deficiency</option>
                    <option value="Magnesium Deficiency">Magnesium Deficiency</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <h3 className="text-xl font-semibold mb-4 text-teal-600">How often does your child eat the following foods?</h3>
            {['fruits', 'vegetables', 'dairy', 'meat', 'fish', 'eggs'].map(renderFoodFrequencyOptions)}
            <label className="block mb-4">
                What is your child's favorite food?
                <input type="text" name="favoriteFood" value={formData.favoriteFood} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded" />
            </label>
            <label className="block mb-4">
                Does your child eat packaged foods or outside foods? How many times a day and what kind?
                <input type="text" name="packagedFood" value={formData.packagedFood} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded" />
            </label>
            <label className="block mb-4">
                Does your child like to eat sweets? If yes, please specify (homemade sweets, store-bought sweets, chocolates).
                <input type="text" name="sweetsPreference" value={formData.sweetsPreference} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded" />
            </label>
            <fieldset className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <label className="block mb-4">
                    How many meals does your child eat daily?
                    <select name="mealsPerDay" onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="1-2">1 - 2</option>
                        <option value="3-4">3 - 4</option>
                        <option value="5 or more">5 or more</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Does your child eat a varied diet that includes foods of different colors?
                    <select name="variedDiet" onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label className="block mb-4">
                    How much water does your child drink per day? (1 cup = 200 mL)
                    <select name="waterIntake" onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Less than 2 cups">Less than 2 cups</option>
                        <option value="2-4 cups">2 - 4 cups</option>
                        <option value="4-6 cups">4 - 6 cups</option>
                        <option value="More than 7 cups">More than 7 cups</option>
                    </select>
                </label>
            </fieldset>
            <fieldset className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <label className="block mb-4">
                    Does your child have any food intolerances or food allergies?
                    <select name="foodIntolerances" value={formData.foodIntolerances} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Yes - what and treatment">Yes - what and treatment</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Does your child refuse to eat any of the following?
                    <select name="foodRefusal" value={formData.foodRefusal} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="green leafy vegetables">Green leafy vegetables</option>
                        <option value="dairy products">Dairy products</option>
                        <option value="meat">Meat</option>
                        <option value="eggs">Eggs</option>
                        <option value="whole grains">Whole grains</option>
                        <option value="fish or seafood">Fish or seafood</option>
                        <option value="nuts or grains">Nuts or grains</option>
                    </select>
                </label>
            </fieldset>
            <fieldset className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <label className="block mb-4">
                    Are you concerned about any aspect of your child's diet?
                    <select name="parentalConcerns" value={formData.parentalConcerns} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Yes - pls specify">Yes - pls specify</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Is your child having any vitamins or food supplements?
                    <select name="vitamins" value={formData.vitamins} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Yes - Please specify">Yes - Please specify</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <label className="block mb-4">
                    Have you noticed any changes in your child's eating habits or health recently?
                    <select name="changesInHabits" value={formData.changesInHabits} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded">
                        <option value="">Select</option>
                        <option value="Yes - pls specify">Yes - pls specify</option>
                        <option value="No">No</option>
                    </select>
                </label>
            </fieldset>
            <button type="submit" className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300">Submit</button>
            
            {dietPlan && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-teal-600">Your 10-Day Diet Plan:</h2>
                    {dietPlan.map((day) => (
                        <div key={day.day} className="mb-4">
                            <h3 className="text-xl">{day.day}</h3>
                            <p>Morning: {day.meals.morning}</p>
                            <p>Afternoon: {day.meals.afternoon}</p>
                            <p>Night: {day.meals.night}</p>
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default DietPlan;
>>>>>>> 5ad1062ccbd765ac5aae2f44ff64c08275050f4e
