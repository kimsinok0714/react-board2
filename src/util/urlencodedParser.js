import querystring from 'querystring';

export const urlencodedParser = (req, res, next) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        req.body = querystring.parse(data);
        next();
    });
};