cmake_minimum_required(VERSION 3.22)
project(paraswift_infra NONE)

set(DOCKER_COMPOSE_FILE "${CMAKE_SOURCE_DIR}/infra/docker/docker-compose.yml")
set(TF_DIR "${CMAKE_SOURCE_DIR}/infra/terraform")
set(TFVARS "terraform.tfvars")

add_custom_target(docker-build
  COMMAND docker compose -f "${DOCKER_COMPOSE_FILE}" build
  WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
)

add_custom_target(docker-up
  COMMAND docker compose -f "${DOCKER_COMPOSE_FILE}" up -d
  WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
)

add_custom_target(docker-down
  COMMAND docker compose -f "${DOCKER_COMPOSE_FILE}" down
  WORKING_DIRECTORY "${CMAKE_SOURCE_DIR}"
)

add_custom_target(terraform-init
  COMMAND terraform init
  WORKING_DIRECTORY "${TF_DIR}"
)

add_custom_target(terraform-plan
  COMMAND terraform plan -var-file=${TFVARS}
  WORKING_DIRECTORY "${TF_DIR}"
)

add_custom_target(terraform-apply
  COMMAND terraform apply -var-file=${TFVARS}
  WORKING_DIRECTORY "${TF_DIR}"
)

add_custom_target(terraform-destroy
  COMMAND terraform destroy -var-file=${TFVARS}
  WORKING_DIRECTORY "${TF_DIR}"
)
