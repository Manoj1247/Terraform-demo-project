locals {
  ecr_repo_name = "my-first-repo"
  ami           = "ami-0e731c8a588258d0d"
  instance_type = "t3.nano"

  my_app_cluster_name          = "my-app-cluster"
  my_app_task_famliy           = "my-app-task"
  container_port               = 80
  my_app_task_name             = "my-app-task"
  ecs_task_execution_role_name = "my-app-task-execution-role"

  application_load_balancer_name = "cc-my-app-alb"
  target_group_name              = "cc-my-alb-tg"
  
  users = ["user7", "user2", "user1", "user4", "user5", "user6", "user3", "user8", "user9", "user10"]
  users_map = {
    user11 = {
      attach_policy_arns = ["arn:aws:iam::aws:policy/AlexaForBusinessFullAccess", "arn:aws:iam::aws:policy/AlexaForBusinessGatewayExecution"]
    },
    user12 = {
      attach_policy_arns = ["arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator", "arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess"]
    },
    user13 = {
      attach_policy_arns = ["arn:aws:iam::aws:policy/AmazonAppFlowFullAccess", "arn:aws:iam::aws:policy/service-role/AmazonAppStreamPCAAccess"]
    }
  }
  my_app_service_name = "cc-my-app-service"
  key_name            = "my_key_pair1"
  public_key          = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCU38qJRRw1WuPxkldWTAV9xn1bQNHQtr4emHU2L0zmsGISNAaJ1NX2aYKwtroh8SbSbrbdOMPTKLqKHBoOsSaeGnnw+IsB0u2ZFsDrLPHxu1wxBHb6zNlvvydRbE4Ffcjrd0KAvNP+8zE6HQJMF0oM3sCy4jsIYibtLBvra2x6aV47vLmOpB0bGzgrgBF8gKyLcQ+mZ/s6HmK8BD2If25YzMJH9lQeJ4FTzuY+Z18RGPUU7IE78opl/yzmoPmtnUaXvvCj9w9XdjvK7Kc1ymdAt5/7cNUWoaHNdniprRd/TnbfVRA7wGZSf8e8iMdWU4u+1BERllxeubtUXQo0e0sStKhGgVHcOK5Ijr52eJ3N+BjKDHc0mPlfguaRyMWoTkaZ10VLV9kFbXMRIc8Gct10RadVMVLPWkI1EbvH3xvkMnuTeWZgF1nzXPe8e7b5/r3/SXk1UrIeoBTeW2EoyXY6A3P7Z7zXhPOv+6M4fYtx1LwFsZ+Hdr48iQLUO4MZkU0= manojkalaganti@ITSloan-PF2M5AMP"
  algorithm           = "RSA"
  rsa_bits            = 2048

}
