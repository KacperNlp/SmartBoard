import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    Get,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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

        res.json({ accessToken: result.accessToken, user: result.user });
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

        res.cookie('access-token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',
            path: '/',
        });

        res.json({
            user: result.user,
            accessToken: result.accessToken,
        });
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

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return { user: req.user };
    }
}
