# DIU Admission Application - User Manual

## 📚 **Overview**

This user manual provides comprehensive guidance for using the DIU Admission application. The application consists of three main sections: Home Page, Registration Form, and Admin Dashboard.

## 🏠 **Home Page Guide**

### **Accessing the Home Page**
- **URL**: http://localhost:3000
- **Purpose**: Introduction to DIU and navigation hub

### **Navigation Features**

#### **Top Navigation Bar**
- **DIU NEWS**: Link to university news
- **FORUM**: Student and staff forum
- **STUDENTS**: Student portal access
- **PARENTS**: Parent information
- **TEACHERS**: Faculty portal
- **ALUMNI**: Alumni network
- **ADMINISTRATION**: Administrative access
- **HELP DESK**: Support and assistance
- **SITEMAP**: Site navigation guide

#### **Main Navigation Menu**
The main navigation features dropdown menus:

**1. Admissions**
- Admission Information
- Admission Test Result
- Admission Contact

**2. Academics**
- Programs
- Academic Calendar

**3. Campus**
- Campus Life
- Facilities

**4. Research**
- Research Centers
- Publications

**5. International**
- International Students
- Partnerships

**6. About**
- History
- Leadership

### **Sliding Banner**
- **Auto-play**: Banners automatically rotate every 5 seconds
- **Manual Navigation**: Use arrow buttons or indicator dots
- **Pause on Hover**: Auto-play pauses when mouse hovers over banner
- **Responsive**: Adapts to different screen sizes

### **Feature Cards**
Four main feature cards showcase:
- **Admission**: Information about the admission process
- **Programs**: Available academic programs
- **Tuition Fees**: Fee structure and payment options
- **Scholarship**: Scholarship opportunities

### **Interactive Elements**
- **Floating Action Button**: Quick access to contact information
- **Apply Online Button**: Direct link to registration form
- **Search Function**: Find specific information

## 📝 **Registration Form Guide**

### **Accessing the Registration Form**
- **URL**: http://localhost:3000/registration
- **Purpose**: Submit admission applications

### **Form Sections**

#### **1. Personal Information**
**Required Fields:**
- **First Name**: Enter your first name
- **Last Name**: Enter your last name
- **Email Address**: Valid email format required
- **Phone Number**: International format supported
- **Date of Birth**: Must be valid date
- **Gender**: Select from dropdown

**Validation Rules:**
- Email must be in valid format (e.g., user@example.com)
- Phone number must be 7-15 digits
- Date of birth must be between 1900 and current date

#### **2. Address Information**
**Required Fields:**
- **Full Address**: Complete residential address
- **City**: Current city of residence
- **Postal Code**: 4-6 digit postal code
- **Country**: Select from dropdown
- **Nationality**: Your nationality

**Validation Rules:**
- Postal code must be 4-6 digits
- All fields are required

#### **3. Academic Information**
**Required Fields:**
- **Desired Program**: Select from available programs
- **Study Level**: Undergraduate, Graduate, or PhD

**Optional Fields:**
- **Previous Institution**: Your last educational institution
- **Previous GPA/CGPA**: GPA on 4.0 scale (0-4)

**Available Programs:**
- Computer Science & Engineering
- Electrical & Electronic Engineering
- Mechanical Engineering
- Civil Engineering
- Bachelor of Business Administration
- Master of Business Administration
- Bachelor of Laws
- English
- Economics

#### **4. Document Upload**
**Required Files:**
- **Profile Photo**: JPG, PNG format (max 2MB)

**Optional Files:**
- **Academic Transcript**: PDF, DOC, DOCX format
- **Certificates**: PDF, DOC, DOCX format
- **CV/Resume**: PDF, DOC, DOCX format

**File Requirements:**
- Maximum file size: 2MB per file
- Supported formats: JPG, PNG, PDF, DOC, DOCX
- Files are automatically validated

#### **5. Terms and Conditions**
**Required:**
- **Terms Agreement**: Must be checked to submit
- **Privacy Policy**: Must be accepted

**Optional:**
- **Newsletter Subscription**: Receive updates about programs

### **Form Features**

#### **Real-time Validation**
- **Instant Feedback**: Fields validate as you type
- **Visual Indicators**: Green for valid, red for invalid
- **Error Messages**: Clear explanations of issues

#### **Progress Tracking**
- **Progress Bar**: Shows form completion percentage
- **Visual Feedback**: Real-time updates

#### **Auto-save Feature**
- **Automatic Saving**: Form data saved to browser
- **Data Recovery**: Restore form if browser closes
- **Privacy**: Data stored locally only

#### **File Upload**
- **Drag & Drop**: Drag files to upload areas
- **File Preview**: See uploaded file names
- **Size Validation**: Automatic file size checking
- **Type Validation**: Automatic file type checking

### **Submitting the Application**

#### **Before Submission**
1. **Review All Fields**: Ensure all required fields are completed
2. **Check File Uploads**: Verify all files uploaded successfully
3. **Read Terms**: Understand terms and conditions
4. **Verify Information**: Double-check all entered data

#### **Submission Process**
1. **Click "Submit Application"**
2. **Loading State**: Spinner shows during submission
3. **Success Message**: Application ID provided
4. **Form Reset**: Form clears for new application

#### **After Submission**
- **Application ID**: Save this for future reference
- **Email Confirmation**: Check email for confirmation
- **Status Tracking**: Use admin dashboard to track status

## ⚙️ **Admin Dashboard Guide**

### **Accessing the Admin Dashboard**
- **URL**: http://localhost:3000/admin
- **Purpose**: Manage submitted applications

### **Dashboard Features**

#### **Statistics Panel**
**Real-time Statistics:**
- **Total Applications**: Number of all applications
- **Pending**: Applications under review
- **Approved**: Accepted applications
- **Rejected**: Declined applications

#### **Filtering System**
**Status Filter:**
- All Status
- Pending
- Approved
- Rejected
- Under Review

**Program Filter:**
- All Programs
- Computer Science & Engineering
- Electrical & Electronic Engineering
- Mechanical Engineering
- Civil Engineering
- Bachelor of Business Administration
- Master of Business Administration
- Bachelor of Laws
- English
- Economics

#### **Application Management**

**View Applications:**
- **List View**: All applications displayed
- **Search**: Find specific applications
- **Sort**: Sort by date, status, program

**Application Details:**
- **Personal Information**: Name, email, phone, etc.
- **Address Information**: Complete address details
- **Academic Information**: Program, level, GPA
- **Uploaded Files**: List of submitted documents
- **Application Status**: Current status
- **Submission Date**: When application was submitted

**Status Management:**
- **Pending**: Default status for new applications
- **Under Review**: Application being evaluated
- **Approved**: Application accepted
- **Rejected**: Application declined

#### **Actions Available**

**View Application:**
1. Click "View Details" button
2. Modal opens with complete information
3. Review all submitted data
4. Check uploaded files

**Update Status:**
1. Open application details
2. Click status buttons:
   - **Under Review**: Application being evaluated
   - **Approve**: Accept the application
   - **Reject**: Decline the application
3. Confirm status change

**Filter Applications:**
1. Select status filter
2. Select program filter
3. Click "Apply Filters"
4. View filtered results

**Refresh Data:**
1. Click "Refresh" button
2. Latest data loads
3. Statistics update

### **Admin Dashboard Tips**

#### **Best Practices**
- **Regular Updates**: Update application status promptly
- **Consistent Communication**: Notify applicants of status changes
- **Data Backup**: Regular backup of application data
- **Security**: Keep admin access secure

#### **Troubleshooting**
- **Loading Issues**: Check server status
- **No Applications**: Verify form submissions
- **Filter Problems**: Clear filters and reapply
- **Status Updates**: Refresh page after status changes

## 📱 **Mobile Usage**

### **Responsive Design**
- **Mobile Optimized**: Works on all screen sizes
- **Touch Friendly**: Optimized for touch devices
- **Fast Loading**: Optimized for mobile networks

### **Mobile Features**
- **Collapsible Menu**: Hamburger menu on mobile
- **Touch Navigation**: Swipe gestures for carousel
- **Mobile Forms**: Optimized form layout
- **File Upload**: Mobile-friendly file selection

## 🔧 **Technical Support**

### **Browser Compatibility**
- **Chrome**: Version 80+
- **Firefox**: Version 75+
- **Safari**: Version 13+
- **Edge**: Version 80+

### **System Requirements**
- **Internet Connection**: Stable internet required
- **JavaScript**: Must be enabled
- **File Upload**: Modern browser with file support
- **Storage**: Sufficient local storage for auto-save

### **Common Issues**

#### **Form Submission Problems**
- **Check Internet**: Ensure stable connection
- **Clear Cache**: Clear browser cache
- **Try Different Browser**: Use recommended browsers
- **Check File Size**: Ensure files under 2MB

#### **File Upload Issues**
- **File Format**: Use supported formats only
- **File Size**: Keep files under 2MB
- **Browser Support**: Use modern browsers
- **Network Issues**: Check internet connection

#### **Admin Dashboard Issues**
- **Server Status**: Ensure server is running
- **Permissions**: Check admin access
- **Browser Cache**: Clear cache and refresh
- **Network**: Check internet connection

## 📞 **Support and Contact**

### **Technical Support**
- **Email**: support@daffodilvarsity.edu.bd
- **Phone**: +880 1819-105105
- **Website**: https://daffodilvarsity.edu.bd

### **Application Support**
- **Admission Office**: admission@daffodilvarsity.edu.bd
- **Student Services**: studentservices@daffodilvarsity.edu.bd
- **IT Support**: it-support@daffodilvarsity.edu.bd

### **Emergency Contact**
- **24/7 Support**: +880 1819-105105
- **Emergency Email**: emergency@daffodilvarsity.edu.bd

## 📋 **Quick Reference**

### **Important URLs**
- **Home Page**: http://localhost:3000
- **Registration**: http://localhost:3000/registration
- **Admin Dashboard**: http://localhost:3000/admin

### **Key Features**
- **Auto-save**: Form data saved automatically
- **File Upload**: Multiple file types supported
- **Real-time Validation**: Instant feedback
- **Progress Tracking**: Visual completion indicator
- **Mobile Responsive**: Works on all devices

### **File Requirements**
- **Photo**: JPG, PNG (max 2MB)
- **Documents**: PDF, DOC, DOCX (max 2MB)
- **Total Upload**: 10MB per application

### **Status Meanings**
- **Pending**: Application received, under review
- **Under Review**: Being evaluated by committee
- **Approved**: Application accepted
- **Rejected**: Application declined

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: DIU Development Team 