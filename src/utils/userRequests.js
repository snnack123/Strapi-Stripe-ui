const sendConfirmationToken = async (email) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
        redirect: 'follow'
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/email-confirmation`, requestOptions)
        .then(response => response.json())
}

const getUserData = async (jwt) => {
    try {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${jwt}`);

        const requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-data`, requestOptions)
            .then(response => response.json())

        if (result.error.status === 401) {
            return { error: true, message: result.error.message, data: {}, confirmationMailSent: result.confirmationMailSent };
        } else {
            return { error: false, message: '', data: result.data, confirmationMailSent: result.confirmationMailSent };
        }
    } catch (error) {
        console.log(error);
    }
}

const getStripeUserId = async (jwt, email) => {
    try {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${jwt}`);

        let formData = new FormData();
        formData.append('email', email);

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: formData,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/find-stripe-user`, requestOptions)
            .then(response => response.json())

        return result;

    } catch (error) {
        console.log(error);
    }
}

const sendResetPasswordEmail = async (email) => {
    try {
        let formData = new FormData();
        formData.append('email', email);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-reset-password-email`, requestOptions)
            .then(response => response.json())

        return result;
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (token) => {
    try {
        let formData = new FormData();
        formData.append('token', token);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-reset-password-token`, requestOptions)
            .then(response => response.json())

        return result;
    } catch (error) {
        console.log(error);
    }
}

const verifyConfirmAccountToken = async (token) => {
    try {
        let formData = new FormData();
        formData.append('token', token);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify-confirm-account-token`, requestOptions)
            .then(response => response.json())

        return result;
    } catch (error) {
        console.log(error);
    }
}

const resetUserPassword = async (password, confirmPassword, token) => {
    try {
        let formData = new FormData();
        formData.append('password', password);
        formData.append('passwordConfirmation', confirmPassword);
        formData.append('code', token);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, requestOptions)
            .then(response => response.json())

        return result;
    } catch (error) {
        console.log(error);
    }
}

const subscribeUser = async (email, type, jwt) => {
    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${jwt}`);

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email: email, subscriptionType: type }),
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/subscribe`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (!data.state) {
                    return { error: false, url: data.url, endDate: null };
                }

                return { error: true, url: null, periodEnd: data.periodEnd };
            });

        return result;
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (username, email, name, password) => {
    try {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ username: username, email: email, name: name, password: password }),
            redirect: 'follow'
        };

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/local/register`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    return { error: true, message: data.error.message, data: {} };
                }

                return { error: false, message: '', data: data };
            });

        return result;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendConfirmationToken,
    getUserData,
    getStripeUserId,
    sendResetPasswordEmail,
    verifyToken,
    resetUserPassword,
    verifyConfirmAccountToken,
    subscribeUser,
    registerUser
}