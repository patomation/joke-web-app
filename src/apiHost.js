let apiUrl = null;

switch (process.env.NODE_ENV) {
  case 'development':
    apiUrl = 'http://localhost:4000/api';
    break;
  case 'production':
    apiUrl = 'https://jokes.patomation1.now.sh/api';
    break;
  default:
    apiUrl = 'API_URL_ERROR_NODE_ENV_NOT_SET';
    break;
}

export default apiUrl;
