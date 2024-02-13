locals {
  ecr_repo_name                = "my-first-repo"
  my_app_cluster_name          = "my-app-cluster"
  my_app_task_famliy           = "my-app-task"
  container_port               =  80
  my_app_task_name             = "my-app-task"
  ecs_task_execution_role_name = "my-app-task-execution-role"

  application_load_balancer_name = "cc-my-app-alb"
  target_group_name              = "cc-my-alb-tg"

  my_app_service_name = "cc-my-app-service"
}
