import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from './footer'; // Import the Footer component
import './home.css'; // Import the CSS file
import logo from './images/logo.jpg'; // Import the logo image
import jsPDF from 'jspdf'; // Import jsPDF

const Home = () => {
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://manufactur-backend.onrender.com/api/sizes');
                setSizes(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://manufactur-backend.onrender.com/api/sizes/${id}`);
            setSizes(sizes.filter(size => size._id !== id));
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    const handleDownload = (size) => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text('Size Details', 20, 20);

        const details = [
            `Date: ${new Date(size.date).toLocaleDateString()}`,
            `Grade: ${size.grade}`,
            `Size: ${size.size}`,
            `Weight Used in Production: ${size.weightUsed}`,
            `Inner Box Qty: ${size.innerBoxQty}`,
            `Weight Per Inner Box: ${size.weightPerInnerBox}`,
            `No of Boxes Packed: ${size.boxesPacked}`,
            `Loose Pcs: ${size.loosePcs}`,
            `Total No of Pcs Received for Packing: ${size.totalPcsReceived}`,
        ];

        details.forEach((line, index) => {
            doc.text(line, 20, 30 + (index * 10));
        });

        doc.save(`size_${size._id}.pdf`);
    };

    return (
        <div className="home-container">
            <div className="header" style={{display: "flex", alignItems: "center"}}>
                <img style={{height: '100px', marginRight: '20px'}} src={logo} alt="Logo" className="logo" />
                <h1 style={{textDecoration: "underline"}}>Ledger Report</h1>
            </div>
            <button className="add-entry-button" onClick={() => navigate('/size-form')}>Add New Entry</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Grade</th>
                            <th>Size</th>
                            <th>Weight Used in Production</th>
                            <th>Inner Box Qty</th>
                            <th>Weight Per Inner Box</th>
                            <th>No of Boxes Packed</th>
                            <th>Loose Pcs</th>
                            <th>Total No of Pcs Received for Packing</th>
                            <th>Actions</th> {/* New column for actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size) => (
                            <tr key={size._id}>
                                <td data-label="Date">{new Date(size.date).toLocaleDateString()}</td>
                                <td data-label="Grade">{size.grade}</td>
                                <td data-label="Size">{size.size}</td>
                                <td data-label="Weight Used in Production">{size.weightUsed} KGs</td>
                                <td data-label="Inner Box Qty">{size.innerBoxQty}</td>
                                <td data-label="Weight Per Inner Box">{size.weightPerInnerBox} KGs</td>
                                <td data-label="No of Boxes Packed">{size.boxesPacked}</td>
                                <td data-label="Loose Pcs">{size.loosePcs}</td>
                                <td data-label="Total No of Pcs Received for Packing">{size.totalPcsReceived}</td>
                                <td data-label="Actions">
                                    <button className="delete-button" onClick={() => handleDelete(size._id)}>Delete</button>
                                    <button className="download-button" onClick={() => handleDownload(size)}>Download</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer-container">
                <Footer /> {/* Add Footer component */}
            </div>
        </div>
    );
};

export default Home;
