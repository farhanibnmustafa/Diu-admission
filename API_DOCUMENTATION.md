# DIU Admission Application - API Documentation

## 📚 **Overview**

This document provides comprehensive API documentation for the DIU Admission application. The API is built using Node.js and Express.js, providing RESTful endpoints for application management.

## 🌐 **Base URL**

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## 🔐 **Authentication**

Currently, the API uses basic validation without authentication. For production deployment, consider implementing JWT or session-based authentication.

## 📋 **API Endpoints**

### **1. Application Submission**

#### **POST** `/api/submit-application`

Submit a new admission application.

**Request:**
- **Content-Type**: `multipart/form-data`
- **Method**: `POST`

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | string | ✅ | Applicant's first name |
| `lastName` | string | ✅ | Applicant's last name |
| `email` | string | ✅ | Valid email address |
| `phone` | string | ✅ | Phone number |
| `dateOfBirth` | date | ✅ | Date of birth (YYYY-MM-DD) |
| `gender` | string | ✅ | Gender (male/female/other) |
| `address` | string | ✅ | Full address |
| `city` | string | ✅ | City name |
| `postalCode` | string | ✅ | Postal code (4-6 digits) |
| `country` | string | ✅ | Country name |
| `nationality` | string | ✅ | Nationality |
| `program` | string | ✅ | Desired program |
| `level` | string | ✅ | Study level |
| `previousInstitution` | string | ❌ | Previous institution |
| `gpa` | number | ❌ | Previous GPA (0-4) |
| `photo` | file | ✅ | Profile photo (JPG/PNG, max 2MB) |
| `transcript` | file | ❌ | Academic transcript |
| `certificate` | file | ❌ | Certificates |
| `cv` | file | ❌ | CV/Resume |
| `terms` | checkbox | ✅ | Terms agreement |
| `newsletter` | checkbox | ❌ | Newsletter subscription |

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "applicationId": "DIU-ABC123",
  "data": {
    "id": "DIU-ABC123",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    "status": "pending"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Missing required fields",
  "missingFields": ["firstName", "email"]
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### **2. Get All Applications**

#### **GET** `/api/applications`

Retrieve all submitted applications (admin endpoint).

**Request:**
- **Method**: `GET`
- **Headers**: None required

**Response (Success - 200):**
```json
{
  "success": true,
  "applications": [
    {
      "id": "DIU-ABC123",
      "timestamp": "2025-01-15T10:30:00.000Z",
      "personalInfo": {
        "firstName": "Farhan",
        "lastName": "Ibn Mustafa",
        "email": "farhanibnmustafa@gmail.com",
        "phone": "+8801234567890",
        "dateOfBirth": "1995-05-15",
        "gender": "male"
      },
      "addressInfo": {
        "address": "123 Main Street",
        "city": "Dhaka",
        "postalCode": "1200",
        "country": "bangladesh",
        "nationality": "Bangladeshi"
      },
      "academicInfo": {
        "program": "cse",
        "level": "undergraduate",
        "previousInstitution": "High School",
        "gpa": "3.5"
      },
      "files": [
        {
          "field": "photo",
          "filename": "photo-1234567890.jpg",
          "originalName": "profile.jpg",
          "size": 1024000
        }
      ],
      "preferences": {
        "newsletter": true
      },
      "status": "pending"
    }
  ]
}
```

**Response (Empty - 200):**
```json
{
  "success": true,
  "applications": []
}
```

### **3. Get Specific Application**

#### **GET** `/api/applications/:id`

Retrieve a specific application by ID.

**Request:**
- **Method**: `GET`
- **Parameters**: `id` (application ID)

**URL Example:**
```
GET /api/applications/DIU-ABC123
```

**Response (Success - 200):**
```json
{
  "success": true,
  "application": {
    "id": "DIU-ABC123",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    "status": "pending"
  }
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "message": "Application not found"
}
```

### **4. Update Application Status**

#### **PATCH** `/api/applications/:id/status`

Update the status of a specific application.

**Request:**
- **Method**: `PATCH`
- **Content-Type**: `application/json`
- **Parameters**: `id` (application ID)

**Request Body:**
```json
{
  "status": "approved"
}
```

**Valid Status Values:**
- `pending` - Application is under review
- `approved` - Application is approved
- `rejected` - Application is rejected
- `under_review` - Application is being reviewed

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Application status updated successfully",
  "application": {
    "id": "DIU-ABC123",
    "status": "approved",
    "updatedAt": "2025-01-15T11:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Invalid status"
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "message": "Application not found"
}
```

## 📊 **Data Models**

### **Application Object**
```json
{
  "id": "string",
  "timestamp": "ISO 8601 date string",
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male|female|other"
  },
  "addressInfo": {
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string",
    "nationality": "string"
  },
  "academicInfo": {
    "program": "string",
    "level": "undergraduate|graduate|phd",
    "previousInstitution": "string",
    "gpa": "number"
  },
  "files": [
    {
      "field": "string",
      "filename": "string",
      "originalName": "string",
      "size": "number"
    }
  ],
  "preferences": {
    "newsletter": "boolean"
  },
  "status": "pending|approved|rejected|under_review",
  "updatedAt": "ISO 8601 date string"
}
```

### **Error Response**
```json
{
  "success": false,
  "message": "string",
  "missingFields": ["string"] // Optional
}
```

## 🔍 **Validation Rules**

### **Email Validation**
- Must be a valid email format
- Example: `user@example.com`

### **Phone Validation**
- International format supported
- Minimum 7 digits, maximum 15 digits
- Can include: `+`, `-`, `(`, `)`, spaces

### **Date Validation**
- Must be in YYYY-MM-DD format
- Must be between 1900 and current date

### **GPA Validation**
- Must be between 0 and 4
- Decimal values allowed (e.g., 3.5)

### **Postal Code Validation**
- Must be 4-6 digits
- Numbers only

### **File Validation**
- **Photo**: JPG, PNG, JPG (max 2MB)
- **Documents**: PDF, DOC, DOCX (max 2MB)
- **Size Limit**: 2MB per file

## 🚨 **Error Codes**

| HTTP Code | Description |
|-----------|-------------|
| 200 | Success |
| 400 | Bad Request (validation errors) |
| 404 | Not Found |
| 413 | Payload Too Large (file size) |
| 500 | Internal Server Error |

## 📝 **Usage Examples**

### **Submit Application (cURL)**
```bash
curl -X POST http://localhost:3000/api/submit-application \
  -F "firstName=John" \
  -F "lastName=Doe" \
  -F "email=john.doe@example.com" \
  -F "phone=+8801234567890" \
  -F "dateOfBirth=1995-05-15" \
  -F "gender=male" \
  -F "address=123 Main Street" \
  -F "city=Dhaka" \
  -F "postalCode=1200" \
  -F "country=bangladesh" \
  -F "nationality=Bangladeshi" \
  -F "program=cse" \
  -F "level=undergraduate" \
  -F "terms=on" \
  -F "photo=@profile.jpg"
```

### **Get All Applications (cURL)**
```bash
curl -X GET http://localhost:3000/api/applications
```

### **Update Application Status (cURL)**
```bash
curl -X PATCH http://localhost:3000/api/applications/DIU-ABC123/status \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'
```

### **JavaScript Fetch Example**
```javascript
// Submit application
const formData = new FormData();
formData.append('firstName', 'John');
formData.append('lastName', 'Doe');
formData.append('email', 'john.doe@example.com');
// ... add other fields

fetch('/api/submit-application', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Application submitted:', data.applicationId);
  } else {
    console.error('Error:', data.message);
  }
});
```

## 🔧 **Rate Limiting**

Currently, no rate limiting is implemented. For production deployment, consider implementing rate limiting to prevent abuse.

## 🔒 **Security Considerations**

### **File Upload Security**
- File type validation
- File size limits
- Secure file naming
- Virus scanning recommended

### **Input Validation**
- Server-side validation for all inputs
- SQL injection prevention
- XSS protection

### **CORS Configuration**
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-domain.com'],
  credentials: true
}));
```

## 📈 **Performance**

### **Response Times**
- **GET requests**: < 100ms
- **POST requests**: < 500ms (file upload dependent)
- **PATCH requests**: < 200ms

### **File Upload Limits**
- **Maximum file size**: 2MB per file
- **Supported formats**: JPG, PNG, PDF, DOC, DOCX
- **Total upload limit**: 10MB per application

## 🔄 **Versioning**

Current API version: **v1.0**

Future versions will be available at:
- `/api/v2/submit-application`
- `/api/v2/applications`

## 📞 **Support**

For API support and questions:
- **Email**: api-support@daffodilvarsity.edu.bd
- **Documentation**: https://docs.daffodilvarsity.edu.bd/api
- **Status Page**: https://status.daffodilvarsity.edu.bd

---

**Last Updated**: January 2025
**API Version**: 1.0.0
**Maintainer**: DIU Development Team 