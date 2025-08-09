const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // 8-16 chars, at least one uppercase, one special character
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{8,16}$/;
    return re.test(password);
};

const validateName = (name) => {
    return name.length >= 20 && name.length <= 60;
};

const validateAddress = (address) => {
    return address.length > 0 && address.length <= 400;
};

const signupValidator = (req, res, next) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!validateName(name)) {
        return res.status(400).json({ message: 'Name must be between 20 and 60 characters.' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be 8-16 characters long and include at least one uppercase letter and one special character.' });
    }
    if (!validateAddress(address)) {
        return res.status(400).json({ message: 'Address must be less than 400 characters.' });
    }

    next();
};

module.exports = { signupValidator };