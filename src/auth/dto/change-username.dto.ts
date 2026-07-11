import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangeUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message:
      "Le nom d'utilisateur ne peut contenir que lettres, chiffres, points, tirets et underscores",
  })
  username: string;
}
