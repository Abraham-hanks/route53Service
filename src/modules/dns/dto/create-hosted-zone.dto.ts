import { ApiHideProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateHostedZoneDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  private_zone?: boolean = false;
}
