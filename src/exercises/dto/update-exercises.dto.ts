import { PartialType } from '@nestjs/mapped-types';
import { CreateExercisesDto } from './create-exercises.dto';

export class UpdateExercisesDto extends PartialType(CreateExercisesDto) {}
