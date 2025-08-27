import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        const result = await this.authService.register(registerDto);

        res.cookie('refresh-token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/auth/refresh',
        });

        return { accessToken: result.accessToken, user: result.user };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(loginDto);

        res.cookie('refresh-token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/auth/refresh',
        });

        return { accessToken: result.accessToken, user: result.user };
    }

    @Post('logout')
    logout(@Body() body: any) {
        return this.authService.logout(body);
    }

    @Post('refresh')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refresh-token'];
        return this.authService.refreshToken(refreshToken);
    }
}
