import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyfeatureDto } from './create-propertyfeature.dto';

export class UpdatePropertyfeatureDto extends PartialType(
  CreatePropertyfeatureDto,
) {}
