provider "docker" {}

resource "docker_image" "backend" {
  name = "${var.project_name}-backend:latest"
  build {
    context    = "${path.module}/../../backend"
    dockerfile = "../infra/docker/backend.Dockerfile"
  }
}

resource "docker_image" "frontend" {
  name = "${var.project_name}-frontend:latest"
  build {
    context    = "${path.module}/../../frontend"
    dockerfile = "../infra/docker/frontend.Dockerfile"
  }
}

resource "docker_container" "backend" {
  name  = "${var.project_name}-backend"
  image = docker_image.backend.image_id

  ports {
    internal = 8000
    external = var.backend_port
  }

  restart = "unless-stopped"
}

resource "docker_container" "frontend" {
  name  = "${var.project_name}-frontend"
  image = docker_image.frontend.image_id

  ports {
    internal = 3001
    external = var.frontend_port
  }

  restart = "unless-stopped"
  depends_on = [docker_container.backend]
}
