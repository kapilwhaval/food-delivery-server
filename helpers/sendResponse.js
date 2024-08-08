exports.sendResponse = ({ res, status, message = "success", data = {} }) => {
    res.status(status).send({
        status: { code: status, message },
        data
    });
}