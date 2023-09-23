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
    const digitRegex = /[0-9]/;
    const specialRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    if(!password) {
        setPasswordError('Password is required.');
    } else if(password.length < 5 || password.length > 15) {
        setPasswordError('Password should have min and max length between 5-15.')
    } else if(!digitRegex.test(password)){
        setPasswordError('Password should contain atleast one number.')
    } else if(!specialRegex.test(password)) {
        setPasswordError('Password should contain atleast one special character.')
    } else {
        setPasswordError('');
    }
};

export function validateFirstname (firstname, setFirstnameError) {
    if(!firstname) {
        setFirstnameError('First name is required.');
    } else {
        setFirstnameError('');
    }
};

export function validateLastname (lastname, setLastnameError) {
    if(!lastname) {
        setLastnameError('Last name is required.');
    } else {
        setLastnameError('');
    }
};

export function validatePhone (phone, setPhoneError) {
    const phoneRegex = /^[6789]\d{9}$/;
    // const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phone) {
        setPhoneError('Phone number is required.');
    } else if(phone.length < 10 || phone.length > 10) {
        setPhoneError('Phone number should be 10 digits.')
    } else if(!phoneRegex.test(phone)) {
        setPhoneError('Invalid phone number.')
    } else {
        setPhoneError('');
    }
};