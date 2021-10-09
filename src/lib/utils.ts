import jsonwebtoken from 'jsonwebtoken';

function issueJWT(user: any, key: any) {
    const data = user;

    const expiresIn = '3d';

    const payload = {
        data: data,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, key, {
        expiresIn: expiresIn
    });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn
    };
}

export default issueJWT;
