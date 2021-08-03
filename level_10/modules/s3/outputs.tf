output "bucket_name" {
  description = "S3 bucket name."
  value       = aws_s3_bucket.level_10.id
}

output "bucket_arn" {
  description = "S3 bucket ARN."
  value       = aws_s3_bucket.level_10.arn
}