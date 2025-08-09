// DIU Admission Application - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeFormValidation();
    initializeCarousel();
    initializeAnimations();
    // File uploads removed
    initializeProgressTracking();
    
    // Form validation and submission
    function initializeFormValidation() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
        
        // Form submission via AJAX only when explicitly enabled
        if (form.dataset.ajax === 'true') {
            form.addEventListener('submit', handleFormSubmission);
        }
        
        // Reset form
        const resetBtn = form.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetForm);
        }
    }
    
    // Validate individual field
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        // Check if field is required
        if (field.hasAttribute('required') && !value) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Specific validation rules
        switch (fieldName) {
            case 'email':
                if (!isValidEmail(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
                
            case 'phone':
                if (!isValidPhone(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
                
            case 'dateOfBirth':
                if (!isValidDate(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
                
            case 'gpa':
                if (value && !isValidGPA(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
                
            case 'postalCode':
                if (!isValidPostalCode(value)) {
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
    
    // Clear validation on input
    function clearValidation(event) {
        const field = event.target;
        field.classList.remove('is-valid', 'is-invalid');
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    // Date validation
    function isValidDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        const minDate = new Date('1900-01-01');
        
        return selectedDate >= minDate && selectedDate <= today;
    }
    
    // GPA validation
    function isValidGPA(gpa) {
        const gpaValue = parseFloat(gpa);
        return gpaValue >= 0 && gpaValue <= 4;
    }
    
    // Postal code validation
    function isValidPostalCode(postalCode) {
        const postalRegex = /^\d{4,6}$/;
        return postalRegex.test(postalCode);
    }
    
    // Handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Validate all fields
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showAlert('Please fill in all required fields correctly.', 'danger');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
        submitBtn.disabled = true;
        
        // Submit to backend API
        fetch('/api/submit-application', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            if (data.success) {
                showAlert(`Application submitted successfully! Your application ID is: ${data.applicationId}`, 'success');
                
                // Reset form
                form.reset();
                
                // Clear validation classes
                form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
                
                // Clear localStorage
                localStorage.removeItem('diuFormData');
                
                // Reset progress bar
                const progressBar = document.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            } else {
                showAlert(data.message || 'Error submitting application. Please try again.', 'danger');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showAlert('Network error. Please check your connection and try again.', 'danger');
        });
    }
    
    // Reset form
    function resetForm() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        // Clear validation classes
        form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Clear file inputs
        form.querySelectorAll('input[type="file"]').forEach(input => {
            input.value = '';
        });
        
        showAlert('Form has been reset.', 'info');
    }
    
    // Initialize carousel
    function initializeCarousel() {
        const carousel = document.getElementById('bannerCarousel');
        if (!carousel) return;
        
        // Auto-play carousel
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            keyboard: true
        });
        
        // Add pause on hover
        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }
    
    // Initialize animations
    function initializeAnimations() {
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            observer.observe(card);
        });
        
        // Add slide-in animation to form sections
        const formSections = document.querySelectorAll('.row.mb-4');
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                }
            });
        }, { threshold: 0.1 });
        
        formSections.forEach(section => {
            formObserver.observe(section);
        });
    }
    
    // File upload logic removed
    
    // Initialize progress tracking
    function initializeProgressTracking() {
        const form = document.getElementById('registrationForm');
        if (!form) return;
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress mb-3';
        progressBar.innerHTML = `
            <div class="progress-bar" role="progressbar" style="width: 0%"></div>
        `;
        
        form.insertBefore(progressBar, form.firstChild);
        
        // Update progress on form changes
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });
        
        function updateProgress() {
            const totalFields = inputs.length;
            let filledFields = 0;
            
            inputs.forEach(input => {
                if (input.value.trim() !== '') {
                    filledFields++;
                }
            });
            
            const progress = (filledFields / totalFields) * 100;
            const progressBarElement = progressBar.querySelector('.progress-bar');
            progressBarElement.style.width = progress + '%';
            progressBarElement.setAttribute('aria-valuenow', progress);
        }
    }
    
    // Show alert message
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert alert at the top of the form
        const form = document.getElementById('registrationForm');
        if (form) {
            form.parentNode.insertBefore(alertDiv, form);
        } else {
            // If no form, insert at the top of the body
            document.body.insertBefore(alertDiv, document.body.firstChild);
        }
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') return; // Skip submit buttons
            
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner"></span> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + Enter to submit form
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            const form = document.getElementById('registrationForm');
            if (form && document.activeElement.closest('form') === form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modals
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });
    
    // Add form auto-save functionality
    let autoSaveTimeout;
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                // Save form data to localStorage
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });
                localStorage.setItem('diuFormData', JSON.stringify(data));
            }, 1000);
        });
        
        // Load saved data on page load
        const savedData = localStorage.getItem('diuFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        }
    }
    
    // Add print functionality
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-outline-primary position-fixed';
    printBtn.style.cssText = 'top: 20px; right: 20px; z-index: 1000;';
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.title = 'Print Application';
    printBtn.addEventListener('click', () => {
        window.print();
    });
    document.body.appendChild(printBtn);
    
    console.log('DIU Admission Application initialized successfully!');
}); 