import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestDatabaseConnection: React.FC = () => {
    const [data, setData] = useState<string>('Loading...');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/test-connection`)
            .then(response => {
                setData(`Success: ${JSON.stringify(response.data)}`);
            })
            .catch(error => {
                setData(`Error: ${error.message}`);
            });
    }, []);

    return (
        <div className='mb-12'>
            <h1>Database Connection Test</h1>
            <p>{data}</p>
        </div>
    );
};

export default TestDatabaseConnection;
