terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket  = "terraform-demo1-s3-bucket-name" # Adjust the bucket name
    key     = "terraform.tfstate"
    region  = "us-east-1" # Adjust the region as needed
    encrypt = true
  }
}

variable "create_internet_gateway_attachment" {
  description = "Flag to determine whether to create an internet gateway attachment"
  type        = bool
  default     = true
}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC and Subnet"
  type        = string
  default     = "10.0.0.0/16"
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


module "network" {
  source         = "git@github.com/Manoj1247/terraform-modules-network.git"
  vpc_cidr_block = var.vpc_cidr_block
}

module "database" {
  source      = "git@github.com/Manoj1247/terraform-modules-database.git"
  subnet_a_id = module.network.subnet_a_id
  subnet_b_id = module.network.subnet_b_id
}

output "vpc_id" {
  value = module.network.vpc_id
}

output "subnet_a_id" {
  value = module.network.subnet_a_id
}

output "subnet_b_id" {
  value = module.network.subnet_b_id
}
