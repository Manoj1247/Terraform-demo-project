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

