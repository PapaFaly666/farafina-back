import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { username: dto.username.trim() },
    });
    if (!admin) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const valid = await bcrypt.compare(dto.password, admin.password);
    if (!valid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const token = await this.jwt.signAsync({
      sub: admin.id,
      username: admin.username,
    });

    return {
      accessToken: token,
      admin: { id: admin.id, username: admin.username, name: admin.name },
    };
  }

  async me(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) {
      throw new UnauthorizedException('Compte introuvable');
    }
    return { id: admin.id, username: admin.username, name: admin.name };
  }

  async changePassword(adminId: string, dto: ChangePasswordDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) {
      throw new UnauthorizedException('Compte introuvable');
    }

    const valid = await bcrypt.compare(dto.currentPassword, admin.password);
    if (!valid) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashed },
    });
    return { ok: true };
  }

  async changeUsername(adminId: string, username: string) {
    const normalized = username.trim();
    const existing = await this.prisma.admin.findUnique({
      where: { username: normalized },
    });
    if (existing && existing.id !== adminId) {
      throw new ConflictException("Ce nom d'utilisateur est déjà pris");
    }

    const updated = await this.prisma.admin.update({
      where: { id: adminId },
      data: { username: normalized },
    });

    const token = await this.jwt.signAsync({
      sub: updated.id,
      username: updated.username,
    });
    return { username: updated.username, accessToken: token };
  }
}
