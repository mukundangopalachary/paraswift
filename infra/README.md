# Infrastructure Layout

This repository now contains infrastructure automation under `infra/`.

## Structure

- `infra/docker/`
- `infra/docker/backend.Dockerfile`
- `infra/docker/frontend.Dockerfile`
- `infra/docker/docker-compose.yml`
- `infra/terraform/`
- `infra/terraform/*.tf`

## Terraform Setup

1. Copy `infra/terraform/terraform.tfvars.example` to `infra/terraform/terraform.tfvars`.
2. Run:

```bash
make terraform-init
make terraform-plan
make terraform-apply
```

## Docker Setup

```bash
make docker-build
make docker-up
```

## CMake Alternative

```bash
cmake -S . -B build
cmake --build build --target docker-up
cmake --build build --target terraform-plan
```
