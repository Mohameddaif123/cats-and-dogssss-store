import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend endpoint for sending emails
      const response = await axios.post('http://localhost:8000/send_email/', formData);
      console.log(response.data); // Log response from backend
      // Optionally, display a success message to the user
    } catch (error) {
      console.error('Error sending email:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 20, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Send Email</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recipient">Recipient:</label>
            <input 
              type="email" 
              id="recipient" 
              name="recipient" 
              value={formData.recipient} 
              onChange={handleChange} 
              style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }} 
              required 
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }} 
              required 
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }} 
              required 
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: 10, backgroundColor: '#007bff', color: '#fff', borderRadius: 5, border: 'none', cursor: 'pointer' }}>Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
