import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SizeForm from './components/SizeForm';
import Home from './components/home';


const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/size-form" element={<SizeForm />} />
                    {/* Additional routes */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
