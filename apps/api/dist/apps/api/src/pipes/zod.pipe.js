import { BadRequestException } from '@nestjs/common';
export class ZodValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        try {
            this.schema.parse(value);
        }
        catch (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}
