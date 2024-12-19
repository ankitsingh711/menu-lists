import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  parentData: string;

  @IsInt()
  depth: number;

  @IsString()
  menuId: string
}
