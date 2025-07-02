import { createParamDecorator } from '@nestjs/common';
export const CurrentSession = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.session;
});
