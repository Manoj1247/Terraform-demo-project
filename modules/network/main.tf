resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"

  tags = {
    Name = "main"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id # Reference the VPC created above
}

resource "aws_subnet" "main_subnet" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "${join(".", slice(split(".", var.vpc_cidr_block), 0, 2))}.0.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "main-subnet"
  }
}
