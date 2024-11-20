terraform {
  backend "s3" {
    bucket  = "terraform-demo1-s3-bucket-name" # Adjust the bucket name
    key     = "terraform.tfstate"
    region  = "us-east-1" # Adjust the region as needed
    encrypt = true
  }
}




