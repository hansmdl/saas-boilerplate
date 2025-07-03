import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ZodValidationPipe } from '../pipes/zod.pipe.js';
import {
  createOrganizationSchema,
  type CreateOrganizationDto,
} from './dto/create-organization.dto.js';
import { OrganizationService } from './organization.service.js';
import { CurrentUser } from '../auth/decorators/user.decorator.js';
import { User } from 'db';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createOrganizationSchema))
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @CurrentUser() user: Omit<User, 'password'>,
  ) {
    return this.organizationService.create(createOrganizationDto, user);
  }
}
