module "network" {
  source         = "git@github.com:Manoj1247/terraform-modules-network.git"
  vpc_cidr_block = var.vpc_cidr_block
}

module "database" {
  source      = "git@github.com:Manoj1247/terraform-modules-database.git?ref=0.0.2"
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
