import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User, RegisterUserData } from '../types/user.types';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: RegisterUserData) {
        return this.prisma.user.create({
            data: user,
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
