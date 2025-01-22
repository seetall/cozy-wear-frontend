import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Quiz.css';
import UserNavbar from '../../components/user_navbar/UserNavbar';

const Quiz = () => {
  const [answers, setAnswers] = useState({
    category: '',
    clothType: '',
    color: '',
  });

  const navigate = useNavigate();

  // Handle change in selection
  const handleChange = (question, value) => {
    setAnswers({
      ...answers,
      [question]: value
    });
  };

  // Handle form submission and redirect to results
  const handleSubmit = () => {
    console.log('User answers:', answers);
    navigate(`/quiz-results?category=${answers.category}&clothType=${answers.clothType}&color=${answers.color}`);
  };

  return (
    <div>
      <UserNavbar /> 

      <div className="quiz-container">
        <h2>Personalized Clothing Quiz</h2>

        {/* Question 1: Category */}
        <div className="quiz-question">
          <label>1. Which category are you choosing?</label>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                value="Men"
                checked={answers.category === 'Men'}
                onChange={() => handleChange('category', 'Men')}
              />
              Men
            </label>
            <label>
              <input
                type="radio"
                value="Women"
                checked={answers.category === 'Women'}
                onChange={() => handleChange('category', 'Women')}
              />
              Women
            </label>
          </div>
        </div>

        {/* Question 2: Cloth Type */}
        <div className="quiz-question">
          <label>2. What type of clothing are you looking for?</label>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                value="Skirt"
                checked={answers.clothType === 'Skirt'}
                onChange={() => handleChange('clothType', 'Skirt')}
              />
              Skirt
            </label>
            <label>
              <input
                type="radio"
                value="Jeans"
                checked={answers.clothType === 'Jeans'}
                onChange={() => handleChange('clothType', 'Jeans')}
              />
              Jeans
            </label>
            <label>
              <input
                type="radio"
                value="T-shirt"
                checked={answers.clothType === 'T-shirt'}
                onChange={() => handleChange('clothType', 'T-shirt')}
              />
              T-shirt
            </label>
            <label>
              <input
                type="radio"
                value="Jacket"
                checked={answers.clothType === 'Jacket'}
                onChange={() => handleChange('clothType', 'Jacket')}
              />
              Jacket
            </label>
          </div>
        </div>

        {/* Question 3: Color */}
        <div className="quiz-question">
          <label>3. What color do you prefer?</label>
          <div className="quiz-options">
            <label>
              <input
                type="radio"
                value="Red"
                checked={answers.color === 'Red'}
                onChange={() => handleChange('color', 'Red')}
              />
              Red
            </label>
            <label>
              <input
                type="radio"
                value="Blue"
                checked={answers.color === 'Blue'}
                onChange={() => handleChange('color', 'Blue')}
              />
              Blue
            </label>
            <label>
              <input
                type="radio"
                value="Green"
                checked={answers.color === 'Green'}
                onChange={() => handleChange('color', 'Green')}
              />
              Green
            </label>
            <label>
              <input
                type="radio"
                value="Black"
                checked={answers.color === 'Black'}
                onChange={() => handleChange('color', 'Black')}
              />
              Black
            </label>
          </div>
        </div>

        <button onClick={handleSubmit} className="submit-btn">Search</button>
      </div>
    </div>
  );
};

export default Quiz;
