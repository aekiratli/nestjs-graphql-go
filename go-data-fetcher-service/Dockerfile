# Use the official Golang image as a build stage
FROM golang:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Install git (required for fetching Go modules)
RUN apk add --no-cache git

# Copy the Go module files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o main .

# Use a minimal base image to run the Go application
FROM alpine:3.18

# Install required libraries
RUN apk add --no-cache libc6-compat

# Copy the compiled Go binary from the builder stage
COPY --from=builder /app/main /app/main

# Expose the port the application will run on
EXPOSE 8090

# Run the Go application
ENTRYPOINT ["/app/main"]
