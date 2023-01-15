import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCardDto } from './create-card.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {}
