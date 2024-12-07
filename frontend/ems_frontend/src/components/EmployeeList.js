import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    
    useEffect(() => {
        axiosInstance.get('/employees/')
            .then(response => {
                console.log('Fetched employees:', response.data); 
                setEmployees(response.data);
                setFilteredEmployees(response.data); 
            })
            .catch(error => {
                console.error('Error fetching employees', error);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee => 
                Object.values(employee.data).some(value =>
                    value.toString().toLowerCase().includes(query)
                )
            );
            setFilteredEmployees(filtered);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axiosInstance.delete(`/employees/${id}/`)
                .then(() => {
                    alert('Employee deleted successfully');
                    setEmployees(employees.filter(emp => emp.id !== id));
                    setFilteredEmployees(filteredEmployees.filter(emp => emp.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting employee', error);
                    alert('Error deleting employee');
                });
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Employee List</h2>
            <input
                type="text"
                placeholder="Search employees"
                value={searchQuery}
                onChange={handleSearch}
                style={styles.searchInput}
            />
            {filteredEmployees.length === 0 ? (
                <p style={styles.noData}>No employees found.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.tableHeaderCell}>ID</th>
                            <th style={styles.tableHeaderCell}>Employee Details</th>
                            <th style={styles.tableHeaderCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{employee.id}</td>
                                <td style={styles.tableCell}>
                                    {employee.data && typeof employee.data === 'object' ? (
                                        Object.entries(employee.data).map(([key, value]) => (
                                            <div key={key} style={styles.dataEntry}>
                                                <strong>{key}:</strong> {value}
                                            </div>
                                        ))
                                    ) : (
                                        <div>No form data available</div>
                                    )}
                                </td>
                                <td style={styles.tableCell}>
                                    <button 
                                        style={styles.deleteButton} 
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        width: '80%',
        overflowX: 'auto',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
        color: '#333',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    noData: {
        textAlign: 'center',
        color: '#777',
        fontSize: '18px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    tableHeaderCell: {
        padding: '10px',
        textAlign: 'center',
        border: '1px solid #ddd',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    dataEntry: {
        marginBottom: '5px',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#FF4B5C',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EmployeeList;
