# DIU Admission Application

A comprehensive web application for Daffodil International University's admission process, featuring both frontend and backend components with modern UI/UX design.

## 🎯 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Interactive Navigation**: Dropdown menus with smooth animations
- **Sliding Banner**: Auto-playing carousel with promotional content
- **Form Validation**: Real-time client-side validation with JavaScript
- **File Upload**: Support for multiple file types with size validation
- **Progress Tracking**: Visual progress bar for form completion
- **Auto-save**: Form data automatically saved to localStorage
- **Print Functionality**: Print-friendly application forms
- **Accessibility**: Keyboard navigation and screen reader support

### Backend Features
- **RESTful API**: Express.js server with comprehensive endpoints
- **File Upload**: Multer middleware for secure file handling
- **Data Validation**: Server-side validation for all form fields
- **Application Management**: CRUD operations for applications
- **Status Tracking**: Application status management system
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/diu/diu-admission-app.git
   cd diu-admission-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Home Page: http://localhost:3000
   - Registration Page: http://localhost:3000/registration

## 📁 Project Structure

```
diu-admission-app/
├── index.html              # Home page with sliding banner
├── registration.html       # Registration form page
├── styles.css             # Custom CSS styles
├── script.js              # Frontend JavaScript
├── server.js              # Backend Express server
├── package.json           # Node.js dependencies
├── README.md              # Project documentation
├── uploads/               # File upload directory (auto-created)
├── applications.json      # Application data storage (auto-created)
└── assets/               # Images and static files
    ├── diulogoside.png
    ├── diu-feature.jpg
    ├── admission (1).png
    ├── training-program.png
    ├── tuition-fees.png
    ├── scholarship.png
    └── ...
```

## 🎨 UI Components

### Home Page (`index.html`)
- **Navigation Bar**: Two-tier navigation with dropdown menus
- **Sliding Banner**: Bootstrap carousel with promotional content
- **Feature Cards**: Interactive cards showcasing university features
- **Floating Action Button**: Quick access to contact information
- **Responsive Design**: Mobile-friendly layout

### Registration Page (`registration.html`)
- **Multi-section Form**: Organized into logical sections
- **Real-time Validation**: Instant feedback on form inputs
- **File Upload**: Support for photos, transcripts, certificates
- **Progress Tracking**: Visual progress indicator
- **Auto-save**: Form data persistence

## 🔧 API Endpoints

### Application Management
- `POST /api/submit-application` - Submit new application
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get specific application
- `PATCH /api/applications/:id/status` - Update application status

### File Upload
- Supports multiple file types (images, PDFs, documents)
- File size limit: 2MB per file
- Automatic file validation and storage

## 📝 Form Validation

### Client-side Validation
- **Email**: Valid email format
- **Phone**: International phone number format
- **Date of Birth**: Valid date range (1900-present)
- **GPA**: Numeric range (0-4)
- **Postal Code**: 4-6 digit format
- **Required Fields**: All mandatory fields must be filled

### Server-side Validation
- Duplicate validation on server
- File type and size validation
- Data sanitization and security

## 🎯 Key Features Implementation

### 1. Dropdown Navigation Menu
```html
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
        Admissions <i class="fas fa-chevron-down"></i>
    </a>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Admission</a></li>
        <li><a class="dropdown-item" href="#">Admission Test Result</a></li>
        <li><a class="dropdown-item" href="#">Admission Contact</a></li>
    </ul>
</li>
```

### 2. Sliding Banner
```html
<div id="bannerCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="diu-feature.jpg" class="d-block w-100" alt="DIU Campus">
            <div class="carousel-caption">
                <h1 class="display-4 fw-bold">Welcome to DIU</h1>
                <p class="lead">Empowering students with quality education</p>
            </div>
        </div>
    </div>
</div>
```

### 3. Form Validation
```javascript
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if field is required
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Specific validation rules
    switch (field.name) {
        case 'email':
            if (!isValidEmail(value)) {
                field.classList.add('is-invalid');
                return false;
            }
            break;
    }
    
    // If validation passes
    if (value) {
        field.classList.add('is-valid');
    }
    
    return true;
}
```

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```
This starts the server with nodemon for automatic reloading.

### Production Deployment
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🔒 Security Features

- **CORS**: Cross-origin resource sharing enabled
- **File Validation**: Strict file type and size validation
- **Input Sanitization**: Server-side data sanitization
- **Error Handling**: Comprehensive error handling without exposing sensitive information

## 🎨 Customization

### Colors
The application uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #2E3094;
    --secondary-color: #f19d58;
    --dark-color: #0d1129;
    --light-color: #ffffff;
}
```

### Styling
- Custom CSS with Bootstrap 5 integration
- Smooth animations and transitions
- Modern gradient backgrounds
- Consistent spacing and typography

## 📊 Data Storage

Applications are stored in `applications.json` with the following structure:
```json
{
  "id": "DIU-ABC123",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  },
  "status": "pending"
}
```

## 🚀 Deployment

### Local Development
1. Install dependencies: `npm install`
2. Start server: `npm run dev`
3. Access application: http://localhost:3000

### Production Deployment
1. Install dependencies: `npm install --production`
2. Start server: `npm start`
3. Configure environment variables
4. Set up reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Development**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend Development**: Node.js, Express.js, Multer
- **UI/UX Design**: Responsive design, modern aesthetics
- **Testing**: Manual testing, cross-browser compatibility

## 📚 **Documentation**

### **📖 User Guides**
- **[User Manual](USER_MANUAL.md)** - Comprehensive user guide
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Deployment Guide](DEPLOYMENT.md)** - Deployment instructions
- **[Project Summary](PROJECT_SUMMARY.md)** - Technical overview

### **🚀 Quick Start**
1. **Install**: `npm install`
2. **Start**: `npm run dev`
3. **Access**: http://localhost:3000

## 📞 **Support**

For support and questions:
- **Email**: admission@daffodilvarsity.edu.bd
- **Phone**: +880 1819-105105
- **Website**: https://daffodilvarsity.edu.bd
- **Technical Support**: support@daffodilvarsity.edu.bd

---

**DIU Admission Application** - Empowering students with quality education and innovative learning experiences. 