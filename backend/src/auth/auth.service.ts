import {
    Injectable,
    Response,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        const user = await this.usersService.findByEmail(email);

        if (user) {
            throw new UnauthorizedException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        const accessToken = this.jwtService.sign(
            {
                sub: newUser.id,
                email: newUser.email,
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                sub: newUser.id,
                email: newUser.email,
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '30d',
            },
        );

        const { password: _, ...userWithoutPassword } = newUser;

        return { accessToken, refreshToken, user: userWithoutPassword };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = req.body;

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const accessToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '30d',
            },
        );

        return { accessToken, refreshToken, user };
    }

    logout(res: Response) {
        res.clearCookie('refresh-token', {
            path: '/auth/refresh',
        });

        return { message: 'Logged out successfully' };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findById(payload.sub);
            const newAccessToken = this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            );

            return { accessToken: newAccessToken };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
