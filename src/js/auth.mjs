// auth.js
export default class Auth {
    constructor() {
        this.loggedIn = false; // default: not authenticated
        this.user = null;
    }

    login(username, password) {
        // Example: simple static check 
        if (username === 'admin' && password === 'password') {
            this.loggedIn = true;
            this.user = { name: username };
            return true;
        } else {
            this.loggedIn = false;
            this.user = null;
            return false;
        }
    }

    logout() {
        this.loggedIn = false;
        this.user = null;
    }

    isAuthenticated() {
        return this.loggedIn;
    }
}
