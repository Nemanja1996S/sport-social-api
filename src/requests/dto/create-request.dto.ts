import { User } from "src/users/entities/user.entity"

export class CreateRequestDto {
    toUser?: string
    fromUser?: string
}
