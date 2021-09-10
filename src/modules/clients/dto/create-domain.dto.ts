import { ApiHideProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateDomainDto {
  @IsString()
  business_name: string;
  
  @IsString()
  name: string;

  @IsString()
  cloudfront_domain_name: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
