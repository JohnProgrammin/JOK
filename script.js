// Additional JavaScript functionality

// Back to top button functionality
(function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top no-print';
    backToTopButton.innerHTML = '<i class="ph ph-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

// Mobile menu functionality
(function() {
    const menuButton = document.querySelector('button[aria-label="Menu"]');
    const nav = document.querySelector('nav');
    
    if (menuButton && nav) {
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('mobile-menu-open');
        });
    }
})();

// Form validation enhancement
(function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear validation on input
            input.addEventListener('input', function() {
                clearValidation(this);
            });
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Update field state
        if (!isValid) {
            field.classList.add('border-red-500');
            showError(field, errorMessage);
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            clearError(field);
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        // Remove existing error
        clearError(field);
        
        // Create error element
        const error = document.createElement('div');
        error.className = 'text-red-500 text-sm mt-1';
        error.textContent = message;
        error.id = field.id + '-error';
        
        // Insert after field
        field.parentNode.appendChild(error);
    }
    
    function clearError(field) {
        const existingError = document.getElementById(field.id + '-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function clearValidation(field) {
        field.classList.remove('border-red-500', 'border-green-500');
        clearError(field);
    }
})();

// Performance optimization: Debounce scroll events
(function() {
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // Clear the timeout if it's already set
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Set a new timeout
        scrollTimeout = setTimeout(function() {
            // Your scroll handling code here
        }, 100);
    });
})();

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Export functions for potential module usage
window.ModernSolutions = {
    fetchLogosFromCMS: fetchLogosFromCMS
};