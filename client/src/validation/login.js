export function validateEmail (email, setEmailError) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!email) {
        setEmailError('Email address is required.');
    } else if(!emailRegex.test(email)) {
        setEmailError('Invalid email address.');
    } else {
        setEmailError('');
    }
};

export function validatePassword (password, setPasswordError) {
    if(!password) {
        setPasswordError('Password is required.');
    } else {
        setPasswordError('');
    }
}