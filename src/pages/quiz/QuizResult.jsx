import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuizResult.css';

const QuizResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const color = queryParams.get('color');
  const style = queryParams.get('style');
  const size = queryParams.get('size');

  useEffect(() => {
    // Here you can process the data and fetch products based on the user's answers
    // For now, we mock the result fetching logic based on the quiz answers
    fetchResults(color, style, size);
  }, [color, style, size]);

  const fetchResults = (color, style, size) => {
    // Simulate fetching results from an API based on the user's quiz answers
    setTimeout(() => {
      const mockResults = [
        {
          productName: 'Casual Red T-Shirt',
          productCategory: 'Casual Wear',
          productPrice: 500,
          productImage: 'https://via.placeholder.com/150',
        },
        {
          productName: 'Sporty Blue Hoodie',
          productCategory: 'Sport Wear',
          productPrice: 1000,
          productImage: 'https://via.placeholder.com/150',
        },
      ];
      setResults(mockResults);
    }, 1000);
  };

  return (
    <div className="results-container">
      <h2>Your Personalized Results</h2>
      {error && <p>{error}</p>}
      <div className="products">
        {results.length > 0 ? (
          results.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.productImage} alt={product.productName} />
              <h4>{product.productName}</h4>
              <p>{product.productCategory}</p>
              <p>NPR. {product.productPrice}</p>
            </div>
          ))
        ) : (
          <p>No products found based on your preferences.</p>
        )}
      </div>
    </div>
  );
};

export default QuizResults;
