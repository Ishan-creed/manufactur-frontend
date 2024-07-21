import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from './footer'; // Import the Footer component
import './SizeForm.css'; // Import the CSS file
import logo from './images/logo.jpg'; // Import the logo image

const SizeForm = () => {
    const [formData, setFormData] = useState({
        grade: '',
        size: '',
        weightUsed: '',
        innerBoxQty: '',
        weightPerInnerBox: '',
        boxesPacked: '',
        loosePcs: '',
        date: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://manufactur-backend.onrender.com/api/sizes/create', formData);
            alert('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    return (
        <div className="form-container">
            <header className="header" style={{display:"flex"}}>
                <img style={{height:'100px'}} src={logo} alt="Logo" className="logo" />
                <h1>Enter Product Details</h1>
            </header>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="grade" placeholder="Grade" onChange={handleChange} />
                <input type="text" name="size" placeholder="Size" onChange={handleChange} />
                <input type="number" name="weightUsed" placeholder="Weight Used in Production" step="0.01" onChange={handleChange} />
                <input type="number" name="innerBoxQty" placeholder="Inner Box Quantity" onChange={handleChange} />
                <input type="number" name="weightPerInnerBox" placeholder="Weight Per Inner Box" step="0.001" onChange={handleChange} />
                <input type="number" name="boxesPacked" placeholder="Number of Boxes Packed" onChange={handleChange} />
                <input type="number" name="loosePcs" placeholder="Loose Pieces" onChange={handleChange} />
                <input type="date" name="date" placeholder="Date" onChange={handleChange} />
                <button type="submit">Submit</button>
                <button type="button" className="see-records-button" onClick={() => navigate('/')}>See Records</button>
            </form>
            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default SizeForm;
