
auth_error = {
    401: {
        "description": "Unauthorized - Credentials required to access this resource.",
        "content": {
            "application/json": {
                "example": {
                    "status": 401, 
                    "code": 401, 
                    "error": "Unauthorized",
                    "message": "Example Message",
                    "timestamp": "2023-05-27T00:00:00Z",
                    "method": "GET",
                    "path": "/example/path",
                }
            }
        }
    },
    402: {
        "description": "Payment Required - Invalid token.",
        "content": {
            "application/json": {
                "example": {
                    "status": 402, 
                    "code": 402, 
                    "error": "Invalid token",
                    "message": "Example Message",
                    "timestamp": "2023-05-27T00:00:00Z",
                    "method": "GET",
                    "path": "/example/path",
                }
            }
        }
    },
    403: {
        "description": "Forbidden - Access is denied.",
        "content": {
            "application/json": {
                "example": {
                    "status": 403, 
                    "code": 403, 
                    "error": "Access Denied",
                    "message": "Example Message",
                    "timestamp": "2023-05-27T00:00:00Z",
                    "method": "GET",
                    "path": "/example/path",
                }
            }
        }
    },
}

validation_error = {
    422: {
        "description": "Unprocessable Entity - The request failed validation checks.",
        "content": {
            "application/json": {
                "example": {
                    "status": 422,
                    "code": 422,
                    "error": "Validation error",
                    "message": "The request failed validation checks.",
                    "timestamp": "2023-05-27T00:00:00Z",
                    "method": "POST",
                    "path": "/example/path",
                }
            }
        }
    }
}

internal_server_error = {
    500: {
        "description": "Internal Server Error - An unexpected error occurred on the server.",
        "content": {
            "application/json": {
                "example": {
                    "status": 500,
                    "code": 500,
                    "error": "Internal server error",
                    "message": "An internal server error occurred.",
                    "timestamp": "2023-05-27T00:00:00Z",
                    "method": "GET",
                    "path": "/example/path",
                }
            }
        }
    }
}