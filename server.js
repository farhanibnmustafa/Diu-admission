const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    },
    fileFilter: function (req, file, cb) {
        // Check file types
        const allowedTypes = {
            'photo': ['image/jpeg', 'image/png', 'image/jpg'],
            'transcript': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            'certificate': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            'cv': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        };
        
        const fieldName = file.fieldname;
        if (allowedTypes[fieldName] && allowedTypes[fieldName].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API Routes
app.post('/api/submit-application', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'transcript', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
]), (req, res) => {
    try {
        // Validate required fields
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 
            'gender', 'address', 'city', 'postalCode', 'country', 
            'nationality', 'program', 'level', 'terms'
        ];
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Validate phone number
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(req.body.phone.replace(/[\s\-\(\)]/g, ''))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format'
            });
        }
        
        // Validate date of birth
        const selectedDate = new Date(req.body.dateOfBirth);
        const today = new Date();
        const minDate = new Date('1900-01-01');
        
        if (selectedDate < minDate || selectedDate > today) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date of birth'
            });
        }
        
        // Validate GPA if provided
        if (req.body.gpa) {
            const gpaValue = parseFloat(req.body.gpa);
            if (gpaValue < 0 || gpaValue > 4) {
                return res.status(400).json({
                    success: false,
                    message: 'GPA must be between 0 and 4'
                });
            }
        }
        
        // Validate postal code
        const postalRegex = /^\d{4,6}$/;
        if (!postalRegex.test(req.body.postalCode)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid postal code format'
            });
        }
        
        // Check if terms are agreed
        if (req.body.terms !== 'on') {
            return res.status(400).json({
                success: false,
                message: 'You must agree to the terms and conditions'
            });
        }
        
        // Prepare application data
        const applicationData = {
            id: generateApplicationId(),
            timestamp: new Date().toISOString(),
            personalInfo: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender
            },
            addressInfo: {
                address: req.body.address,
                city: req.body.city,
                postalCode: req.body.postalCode,
                country: req.body.country,
                nationality: req.body.nationality
            },
            academicInfo: {
                program: req.body.program,
                level: req.body.level,
                previousInstitution: req.body.previousInstitution || '',
                gpa: req.body.gpa || ''
            },
            files: req.files ? Object.keys(req.files).map(key => ({
                field: key,
                filename: req.files[key][0].filename,
                originalName: req.files[key][0].originalname,
                size: req.files[key][0].size
            })) : [],
            preferences: {
                newsletter: req.body.newsletter === 'on'
            },
            status: 'pending'
        };
        
        // Save application to file (in a real application, this would go to a database)
        const applicationsFile = 'applications.json';
        let applications = [];
        
        if (fs.existsSync(applicationsFile)) {
            applications = JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
        }
        
        applications.push(applicationData);
        fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
        
        // Send success response
        res.json({
            success: true,
            message: 'Application submitted successfully!',
            applicationId: applicationData.id,
            data: applicationData
        });
        
    } catch (error) {
        console.error('Error processing application:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get all applications (admin endpoint)
app.get('/api/applications', (req, res) => {
    try {
        const applicationsFile = 'applications.json';
        if (fs.existsSync(applicationsFile)) {
            const applications = JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
            res.json({
                success: true,
                applications: applications
            });
        } else {
            res.json({
                success: true,
                applications: []
            });
        }
    } catch (error) {
        console.error('Error reading applications:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Get specific application by ID
app.get('/api/applications/:id', (req, res) => {
    try {
        const applicationsFile = 'applications.json';
        if (fs.existsSync(applicationsFile)) {
            const applications = JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
            const application = applications.find(app => app.id === req.params.id);
            
            if (application) {
                res.json({
                    success: true,
                    application: application
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
    } catch (error) {
        console.error('Error reading application:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Update application status
app.patch('/api/applications/:id/status', (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'approved', 'rejected', 'under_review'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }
        
        const applicationsFile = 'applications.json';
        if (fs.existsSync(applicationsFile)) {
            const applications = JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
            const applicationIndex = applications.findIndex(app => app.id === req.params.id);
            
            if (applicationIndex !== -1) {
                applications[applicationIndex].status = status;
                applications[applicationIndex].updatedAt = new Date().toISOString();
                
                fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
                
                res.json({
                    success: true,
                    message: 'Application status updated successfully',
                    application: applications[applicationIndex]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Application not found'
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 2MB.'
            });
        }
    }
    
    if (error.message === 'Invalid file type') {
        return res.status(400).json({
            success: false,
            message: 'Invalid file type. Please upload the correct file format.'
        });
    }
    
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Generate unique application ID
function generateApplicationId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `DIU-${timestamp}-${randomStr}`.toUpperCase();
}

// Start server
app.listen(PORT, () => {
    console.log(`DIU Admission Server running on http://localhost:${PORT}`);
    console.log(`Home Page: http://localhost:${PORT}`);
    console.log(`Registration Page: http://localhost:${PORT}/registration`);
    console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`API Endpoints:`);
    console.log(`  POST /api/submit-application - Submit application`);
    console.log(`  GET /api/applications - Get all applications`);
    console.log(`  GET /api/applications/:id - Get specific application`);
    console.log(`  PATCH /api/applications/:id/status - Update application status`);
}); 