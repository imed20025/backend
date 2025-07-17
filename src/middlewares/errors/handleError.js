
const handleError = (res, error, message, statusCode ) => {

    console.error(error);

    return res.status(statusCode).json({ message });

};

export default handleError