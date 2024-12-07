import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/submit-form/', { data: formData })
            .then(response => {
                alert('Employee added successfully');
                setFormData({});
            })
            .catch(error => {
                console.error('Error adding employee', error);
            });
    };

    return (
        <div>
            <h3>Add New Employee</h3>
            <form onSubmit={handleSubmit}>
                <label>Data:</label>
                <input
                    type="text"
                    name="data"
                    value={formData.data || ''}
                    onChange={handleChange}
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;