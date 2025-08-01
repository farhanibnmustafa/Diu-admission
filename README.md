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

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

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