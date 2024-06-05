import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
console.log('Loaded Environment Variables:', process.env);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/token', async (req, res) => {
    const { code } = req.body;
    console.log('Received code:', code);

    const clientId = process.env.VITE_DEXCOM_CLIENT_ID;
    const clientSecret = process.env.VITE_DEXCOM_CLIENT_SECRET;
    const redirectUri = process.env.VITE_DEXCOM_REDIRECT_URI;

    console.log('Client ID:', clientId);
    console.log('Client Secret:', clientSecret);
    console.log('Redirect URI:', redirectUri);

    if (!clientId || !clientSecret || !redirectUri) {
        return res.status(500).json({ error: 'Missing environment variables' });
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);

    console.log('Request Params:', params.toString());

    try {
        const response = await axios.post('https://sandbox-api.dexcom.com/v2/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Token Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
