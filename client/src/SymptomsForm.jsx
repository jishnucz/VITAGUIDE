import React, { useState } from 'react';

const SymptomsForm = () => {
  const [formData, setFormData] = useState({
    symptoms: '',
    diet: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let deficiencies = [];

    if (formData.symptoms.toLowerCase().includes('night blindness')) {
      deficiencies.push('Vitamin A');
    }
    if (formData.symptoms.toLowerCase().includes('fatigue')) {
      deficiencies.push('Vitamin B1 (Thiamine), Vitamin B6, Vitamin B12, Folic Acid');
    }
    if (formData.symptoms.toLowerCase().includes('cracked lips')) {
      deficiencies.push('Vitamin B2 (Riboflavin)');
    }
    if (formData.symptoms.toLowerCase().includes('anemia')) {
      deficiencies.push('Vitamin B6, Vitamin B12, Folic Acid');
    }
    if (formData.symptoms.toLowerCase().includes('bleeding gums')) {
      deficiencies.push('Vitamin C');
    }
    if (formData.symptoms.toLowerCase().includes('bone pain')) {
      deficiencies.push('Vitamin D');
    }
    if (formData.symptoms.toLowerCase().includes('muscle weakness')) {
      deficiencies.push('Vitamin D, Vitamin E');
    }

    if (formData.diet.toLowerCase().includes('no fruits')) {
      deficiencies.push('Vitamin C, Vitamin A, Folic Acid');
    }
    if (formData.diet.toLowerCase().includes('no dairy')) {
      deficiencies.push('Vitamin D, Vitamin B2 (Riboflavin)');
    }
    if (formData.diet.toLowerCase().includes('no meat')) {
      deficiencies.push('Vitamin B12, Vitamin B6');
    }
    if (formData.diet.toLowerCase().includes('low healthy fats')) {
      deficiencies.push('Vitamin E, Vitamin K');
    }
    if (formData.diet.toLowerCase().includes('no leafy greens')) {
      deficiencies.push('Vitamin K, Folic Acid (Vitamin B9)');
    }
    if (formData.diet.toLowerCase().includes('low protein')) {
      deficiencies.push('Vitamin B6, Vitamin B3 (Niacin)');
    }
    if (formData.diet.toLowerCase().includes('low whole grains')) {
      deficiencies.push('Vitamin B1 (Thiamine), Vitamin B2');
    }

    deficiencies = [...new Set(deficiencies)];

    setResult(deficiencies.length > 0 ? deficiencies.join(', ') : 'No deficiencies found based on the given information');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Check Your Vitamin Deficiency</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="symptoms">
            Symptoms (e.g., fatigue, bone pain):
          </label>
          <input
            type="text"
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="diet">
            Dietary Habits (e.g., no meat, low healthy fats):
          </label>
          <input
            type="text"
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-10 p-6 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Vitamin Deficiency Result:</h3>
          <p className="text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomsForm;
