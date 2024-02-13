module "network" {
  source         = "git@github.com:Manoj1247/terraform-modules-network.git"
  vpc_cidr_block = var.vpc_cidr_block
}

module "database" {
  source      = "git@github.com:Manoj1247/terraform-modules-database.git?ref=0.0.3"
  subnet_a_id = module.network.subnet_a_id
  subnet_b_id = module.network.subnet_b_id
}

module "ecr" {
  source        = "git@github.com:Manoj1247/terraform-modules-ecr.git"
  ecr_repo_name = local.ecr_repo_name
}

module "ecs" {
  source                         = "git@github.com:Manoj1247/terraform-modules-ecs.git"
  my_app_cluster_name            = local.my_app_cluster_name
  my_app_task_famliy             = local.my_app_task_famliy
  container_port                 = local.container_port
  my_app_task_name               = local.my_app_task_name
  ecs_task_execution_role_name   = local.ecs_task_execution_role_name
  application_load_balancer_name = local.application_load_balancer_name
  target_group_name              = local.target_group_name
  my_app_service_name            = local.my_app_service_name
  subnet_a_id                    = module.network.subnet_a_id
  subnet_b_id                    = module.network.subnet_b_id
  ecr_repository_url             = module.ecr.ecr_repo_url
  vpc_id                         = module.network.vpc_id
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

output "ecr_repo_url" {
  value = module.ecr.ecr_repo_url
}
