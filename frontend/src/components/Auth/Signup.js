import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    [cite_start]// Name validation [cite: 63]
    if (formData.name.length < 20 || formData.name.length > 60) {
      newErrors.name = 'Name must be between 20 and 60 characters.';
    }

    [cite_start]// Email validation [cite: 67]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    [cite_start]// Address validation [cite: 64]
    if (formData.address.length > 400) {
      newErrors.address = 'Address cannot exceed 400 characters.';
    }
    
    [cite_start]// Password validation [cite: 65]
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be 8-16 characters, with one uppercase letter and one special character.';
    }

    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If validation passes, submit the data to the backend API
      console.log('Form is valid. Submitting...', formData);
      // TODO: Add API call here
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
        </div>
         <div>
          <label>Address:</label>
          <textarea name="address" onChange={handleChange} required></textarea>
          {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;