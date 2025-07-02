import { Inject, Injectable } from '@nestjs/common';
import type { Lucia } from 'lucia';

@Injectable()
export class AuthService {
  constructor(@Inject('LUCIA') private readonly lucia: Lucia) {}

  // Business logic for authentication will go here
}
