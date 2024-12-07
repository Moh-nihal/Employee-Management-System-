import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../services/axiosInstance';

const DynamicForm = () => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        axiosInstance.get('/form-fields/').then((response) => {
            setFields(response.data);
        });
    }, []);

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
                alert('Form submitted successfully');
                console.log(response.data);
                navigate('/employees'); 
            })
            .catch(error => {
                alert('Error submitting form');
                console.error(error);
            });
    };

    const goToEmployeeList = () => {
        navigate('/employees');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div style={styles.formGroup} key={field.id}>
                            <label style={styles.label}>{field.label}</label>
                            <input
                                style={styles.input}
                                type={field.field_type}
                                name={field.label}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" style={styles.button}>Submit</button>
                </form>
                <button onClick={goToEmployeeList} style={styles.secondaryButton}>
                    View Employee List
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '500px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    secondaryButton: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default DynamicForm;
