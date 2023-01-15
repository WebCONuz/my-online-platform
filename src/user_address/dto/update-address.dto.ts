import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create-address.dto';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
