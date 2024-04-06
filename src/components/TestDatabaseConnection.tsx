import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestDatabaseConnection: React.FC = () => {
    const [data, setData] = useState<string>('Loading...');

    useEffect(() => {
        // Replace URL with your actual backend endpoint that tests the database connection
        const testDbConnectionUrl = 'http://localhost:5000/test-connection';

        axios.get(testDbConnectionUrl)
            .then(response => {
                setData(`Success: ${JSON.stringify(response.data)}`);
            })
            .catch(error => {
                setData(`Error: ${error.message}`);
            });
    }, []);

    return (
        <div>
            <h1>Database Connection Test</h1>
            <p>{data}</p>
        </div>
    );
};

export default TestDatabaseConnection;
