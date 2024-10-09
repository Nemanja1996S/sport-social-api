import { PartialType } from '@nestjs/mapped-types';
import { CreateReactionDto, ReactionEnum } from './create-reaction.dto';

export class UpdateReactionDto extends PartialType(CreateReactionDto) {
    reactionEnum: ReactionEnum
}
