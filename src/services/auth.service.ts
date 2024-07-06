import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from './../../utils/config/index';
import { PersonService } from "../services/person.service";
import { TypePerson } from '../../utils/types';

interface User {
    username: string;
    password: string;
    data: {
        _id: string;
        person: {
            firstname: string;
        };
        username: string;
        role: number;
        state: string;
    };
}

interface SignupData {
    username: string;
    userpass: string;
}

interface AuthResponse {
    success: boolean;
    user?: {
        documentnumber: string;
        name: string;
        lastname: string;
    };
    token?: string;
    message?: string;
}

class AuthService {
    private async encrypt(string: string): Promise<string | undefined> {
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(string, salt);
            return hash;
        } catch (error) {
            console.log('Error AuthService_Encrypt: ', error);
            return undefined
        }
    }

    private async compare(pass: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(pass, hash);
        } catch (error) {
            return false;
        }
    }

    private async generateToken(payload: JwtPayload): Promise<string> {
        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '7d',
        });
        return token;
    }

    private async getUserData(user: TypePerson): Promise<AuthResponse> {
        const userData = {
            documentnumber: user.documentnumber,
            name: user.personname,
            lastname: user.personlastname,
        };
        const token = await this.generateToken(userData);
        return {
            success: true,
            user: userData,
            token,
        };
    }

    public async login(user: { username: string; userpass: string }): Promise<AuthResponse> {
        const { username, userpass } = user;
        if (!username || !userpass) {
            return {
                success: false,
                message: 'Las credenciales son incorrectas',
            };
        }
        const userServ = new PersonService();
        const { success, data } = await userServ.getByUsername(username);
        console.log("🚀 ~ AuthService ~ login ~ success, data:", success, data)
        if (success && data) {
            console.log("0")
            if (Array.isArray(data)) {
                console.log("1")
                return {
                    success: false,
                    message: 'Comunicarse con el administrador del sistema.',
                };
            }
            if (data && await this.compare(userpass, data.userpass)) {
                console.log("2")
                return this.getUserData(data);
            }
            console.log("3")
            return {
                success: false,
                message: 'Las credenciales son incorrectas',
            };
        }
        console.log("11")
        return {
            success: false,
            message: 'Las credenciales son incorrectas',
        };
    }

    public async signup(data: TypePerson): Promise<AuthResponse> {

        if (data && data.userpass) {
            try {
                const encrypted = await this.encrypt(data.userpass);
                if (encrypted) {
                    data.userpass = encrypted
                }
            } catch (error) {
                return { success: false }
            }
        }
        const userServ = new PersonService();
        const userCreated = await userServ.create(data);
        if (!userCreated.success) {
            return {
                success: false,
                message: userCreated.message,
            };
        }
        if (!userCreated.data || Array.isArray(userCreated.data)) {
            return { success: false }
        }
        return this.getUserData(userCreated.data);
    }
}

export default AuthService;
