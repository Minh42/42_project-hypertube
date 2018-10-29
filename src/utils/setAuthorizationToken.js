import axios from 'axios';

export default function setAuthorizationToken(xsrfToken) {
    if (xsrfToken) {
        axios.defaults.headers.common['X-CSRF-Token'] = xsrfToken;
    } else {
        delete axios.defaults.headers.common['X-CSRF-Token'];
    }
}