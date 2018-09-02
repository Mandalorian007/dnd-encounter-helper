let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === '35.224.244.25') {
    backendHost = 'http://35.224.244.25';
} else {
    backendHost = 'http://localhost:8080';
}

export const API_ROOT = `${backendHost}`;