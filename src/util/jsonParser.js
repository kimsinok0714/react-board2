export const jsonParser = (req, res, next) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            req.body = JSON.parse(data);
        } catch (err) {
            req.body = {};
        }
        next();
    });
};