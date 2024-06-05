import { useEffect } from 'react';
import axios from 'axios';

const Callback = () => {
    useEffect(() => {
        const fetchToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            console.log('Authorization code:', code);

            try {
                const response = await axios.post('http://localhost:3001/api/token', { code });
                console.log('Token Response:', response.data);
            } catch (error) {
                console.error('Error fetching token:', error.response ? error.response.data : error.message);
            }
        };

        fetchToken();
    }, []);

    return (
        <div>
            Callback Component
        </div>
    );
};

export default Callback;
