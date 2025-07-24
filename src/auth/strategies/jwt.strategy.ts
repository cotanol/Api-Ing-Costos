import { PassportStrategy } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayLoad } from '../interfaces/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET!, // TODO: ConfigService para una mejor configuracion
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayLoad): Promise<User> {
    const { id } = payload;

    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        nombres: true,
        apellidos: true,
        isActive: true,
        roles: true,
      },
    });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive) throw new UnauthorizedException('User inactive');

    return user;
  }
}
