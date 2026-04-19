variable "project_name" {
  description = "Project prefix used for resource naming"
  type        = string
  default     = "paraswift"
}

variable "backend_port" {
  description = "Host port for backend service"
  type        = number
  default     = 8000
}

variable "frontend_port" {
  description = "Host port for frontend service"
  type        = number
  default     = 3001
}
