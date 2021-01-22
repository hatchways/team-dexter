const handleAuthErrors = (err, setErrors) => {
    if (err && err.data && err.data.response) {
        if (err.status === 400) {
            const errors = {};
            err.data.response.forEach(param => {
                errors[param] = 'Invalid ' + param;
            });
            setErrors(errors);
        } else if (err.status === 401) {
            setErrors({password: 'Invalid password'});
        } else if (err.status === 404) {
            setErrors({email: 'User with email not found'});
        } else if (err.status === 409) {
            setErrors({email: 'Email already in use'});
        }
    }
};

export default handleAuthErrors;
