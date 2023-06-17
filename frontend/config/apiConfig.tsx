// differentiate api url based on dev vs prod environment
interface apiConfig {
    url: string;
}

const apiConfig: apiConfig = {
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api.ourstoryapp.org'
}

export default apiConfig;