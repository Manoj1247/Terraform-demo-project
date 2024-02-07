terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

    backend "s3" {
    bucket         = "terraform-demo1-s3-bucket-name"  # Adjust the bucket name
    key            = "terraform.tfstate"
    region         = "us-east-1"  # Adjust the region as needed
    encrypt        = true
  }
}

variable "create_internet_gateway_attachment" {
  description = "Flag to determine whether to create an internet gateway attachment"
  type        = bool
  default     = true
}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC and Subnet"
  type = string
  default = "10.0.0.0/16"
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}

resource aws_internet_gateway "main"{
  vpc_id = aws_vpc.main.id  # Reference the VPC created above
}

resource "aws_subnet" "main_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.vpc_cidr_block
  availability_zone       = "us-east-1a"    

  tags = {
    Name = "main-subnet"
  }
}


