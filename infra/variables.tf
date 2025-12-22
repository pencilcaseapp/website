variable "organization_id" {
  type        = string
  description = "Scaleway organization ID"
}

variable "project_id" {
  type        = string
  description = "Scaleway project ID"
}

variable "stage" {
  description = "Stage where it will be deployed"
  type        = string
}
