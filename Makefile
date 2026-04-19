DOCKER_COMPOSE_FILE := infra/docker/docker-compose.yml
TF_DIR := infra/terraform
TFVARS := terraform.tfvars

.PHONY: help docker-build docker-up docker-down docker-logs terraform-init terraform-plan terraform-apply terraform-destroy terraform-fmt

help:
	@echo "Available targets:"
	@echo "  docker-build        Build Docker images"
	@echo "  docker-up           Start Docker services"
	@echo "  docker-down         Stop Docker services"
	@echo "  docker-logs         Tail Docker logs"
	@echo "  terraform-init      Initialize Terraform"
	@echo "  terraform-plan      Plan Terraform changes"
	@echo "  terraform-apply     Apply Terraform changes"
	@echo "  terraform-destroy   Destroy Terraform resources"
	@echo "  terraform-fmt       Format Terraform files"

docker-build:
	docker compose -f $(DOCKER_COMPOSE_FILE) build

docker-up:
	docker compose -f $(DOCKER_COMPOSE_FILE) up -d

docker-down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

docker-logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

terraform-init:
	terraform -chdir=$(TF_DIR) init

terraform-plan:
	terraform -chdir=$(TF_DIR) plan -var-file=$(TFVARS)

terraform-apply:
	terraform -chdir=$(TF_DIR) apply -var-file=$(TFVARS)

terraform-destroy:
	terraform -chdir=$(TF_DIR) destroy -var-file=$(TFVARS)

terraform-fmt:
	terraform -chdir=$(TF_DIR) fmt -recursive
