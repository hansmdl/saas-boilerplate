import { Injectable } from '@nestjs/common';
import { PrismaService, User, OrganizationRole } from 'db';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    user: Omit<User, 'password'>,
  ) {
    const { name } = createOrganizationDto;

    const organization = await this.prisma.organization.create({
      data: {
        name,
        members: {
          create: {
            userId: user.id,
            role: OrganizationRole.OWNER,
          },
        },
      },
    });

    return organization;
  }

  async findAll(userId: string) {
    return this.prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.organization.findFirst({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
