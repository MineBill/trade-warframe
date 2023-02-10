import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const i = 'jwt-node'
const s = 'jwt-node'
const a = 'jwt-node'

const verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '8784h',
    algorithm: ['RS256'],
}


type Payload = {
    exp?: number
    data: any
};

export const generateJWT = (payload: Payload) => {
    const signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "8784h",
        algorithm: "RS256" as jwt.Algorithm,
    }

    const options = signOptions
    if (payload && payload.exp) {
        delete options.expiresIn
    }
    const secret = process.env.JWT_PRIVATE_KEY;
    return jwt.sign(payload, secret, options);
}

export const verifyJWT = (payload: any) => {
    return jwt.verify(payload, `${process.env.JWT_PUBLIC_KEY}`, verifyOptions);
}

export function hashPassword(password: string, salt?: string): { hash: string, salt: string } {
    if (salt == null) {
        salt = bcrypt.genSaltSync(10);
    }
    return { hash: bcrypt.hashSync(password, salt), salt: salt };
}

export function comparePasswords(hashed: string, password: string, salt: string): boolean {
    return hashed == hashPassword(password, salt).hash;
}
