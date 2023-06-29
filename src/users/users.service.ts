import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async verifyUserAccess(requestUserId: string, currentUserId: string) {
    if (requestUserId !== currentUserId) throw new ForbiddenException();
  }

  async getPartialUser(requestedUserId: string, currentUserId: string) {
    if (requestedUserId !== currentUserId) throw new ForbiddenException();

    const user = await this.prisma.user.findFirst({
      where: {
        id: requestedUserId,
      },
      select: {
        name: true,
        lastname: true,
        location: true,
        university: true,
        email: true,
        contact: true,
        about: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
