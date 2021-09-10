import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSubdomainDto {
  @IsString()
  business_name: string;
  
  @IsUrl()
  name: string;
  
  @IsString()
  cloudfront_domain_name: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  hosted_zone_id: string;
}
