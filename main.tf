module "network" {
  source         = "git@github.com:Manoj1247/terraform-modules-network.git"
  vpc_cidr_block = var.vpc_cidr_block
}

module "ecr" {
  source        = "git@github.com:Manoj1247/terraform-modules-ecr.git"
  ecr_repo_name = local.ecr_repo_name
}

/*
module "database" {
  source      = "git@github.com:Manoj1247/terraform-modules-database.git?ref=0.0.3"
  subnet_a_id = module.network.subnet_a_id
  subnet_b_id = module.network.subnet_b_id
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
*/
#creating rdsa keys 

resource "aws_iam_user" "iam_users" {
for_each = {for user in local.users: user=>user}
name = each.key
}
resource "aws_iam_user" "iam_users_map" {
for_each = {for user, details in local.users_map: user=>details}
name = each.key
}

resource "aws_iam_user_policy" "user_policies" {
  for_each = { for user, details in local.users_map : user => details }

  name = each.key
  user = aws_iam_user.iam_users_map[each.key].name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      for policy_arn in each.value.attach_policy_arns : {
        Effect   = "Allow",
        Action   = "*",
        Resource = policy_arn,
      }
    ],
  })
}

resource "tls_private_key" "example" {
  algorithm = local.algorithm
  rsa_bits  = local.rsa_bits
}

resource "tls_private_key" "example2" {
  algorithm = local.algorithm
  rsa_bits  = local.rsa_bits
}
#creating a key pair using the rdsa keys we generated earlier
resource "aws_key_pair" "deployer" {
  key_name   = local.key_name
  public_key = tls_private_key.example.public_key_openssh
}

resource "aws_instance" "my_ec2_instance" {
  instance_type               = local.instance_type
  ami                         = local.ami
  key_name                    = local.key_name
  subnet_id                   = module.network.subnet_a_id # Replace with the desired subnet ID
  associate_public_ip_address = true
  user_data = templatefile("${path.module}/user_data_template.sh.j2",{
    public_key = tls_private_key.example2.public_key_openssh
  })
  tags = {
    Name = "MyEC2Instance"
  }

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

output "public_key" {
  value = tls_private_key.example2.public_key_openssh
}

output "private_key" {
  value     = tls_private_key.example2.private_key_pem
  sensitive = true
}