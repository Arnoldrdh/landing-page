document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      // Make sure mobile menu is hidden on load
      mobileMenu.classList.add('hidden');
      
      // Specifically target the SVGs
      const menuIconClosed = mobileMenuButton.querySelector('svg.block');
      const menuIconOpen = mobileMenuButton.querySelector('svg.hidden');
      
      mobileMenuButton.addEventListener('click', function(event) {
        // Prevent the event from bubbling up
        event.stopPropagation();
        
        // Toggle the mobile menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Toggle the menu icons
        if (menuIconClosed && menuIconOpen) {
          menuIconClosed.classList.toggle('block');
          menuIconClosed.classList.toggle('hidden');
          menuIconOpen.classList.toggle('hidden');
          menuIconOpen.classList.toggle('block');
        }
        
        // Update aria-expanded attribute
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      });
    }
    
    // Profile dropdown toggle code
    const userMenuButton = document.getElementById('user-menu-button');
    
    // Need to use a different selector for the dropdown - it's not properly selected in previous code
    const userMenu = document.querySelector('[aria-labelledby="user-menu-button"]');
    
    if (userMenuButton && userMenu) {
      // Ensure the dropdown is initially hidden
      userMenu.classList.add('hidden');
      userMenuButton.setAttribute('aria-expanded', 'false');
      
      userMenuButton.addEventListener('click', function(event) {
        // Prevent event from bubbling to document
        event.stopPropagation();
        
        // Toggle the user menu visibility
        userMenu.classList.toggle('hidden');
        
        // Add animation classes
        if (!userMenu.classList.contains('hidden')) {
          userMenu.classList.add('transition', 'ease-out', 'duration-100', 'transform', 'opacity-100', 'scale-100');
          userMenu.classList.remove('opacity-0', 'scale-95');
        } else {
          userMenu.classList.add('transition', 'ease-in', 'duration-75', 'opacity-0', 'scale-95');
          userMenu.classList.remove('opacity-100', 'scale-100');
        }
        
        // Update aria-expanded attribute
        const isExpanded = userMenuButton.getAttribute('aria-expanded') === 'true';
        userMenuButton.setAttribute('aria-expanded', !isExpanded);
      });
    }
    
    // Close both menus when clicking anywhere else on the page
    document.addEventListener('click', function(event) {
      // Close profile dropdown if open
      if (userMenuButton && userMenu && 
          !userMenuButton.contains(event.target) && 
          !userMenu.contains(event.target)) {
        userMenu.classList.add('hidden');
        userMenuButton.setAttribute('aria-expanded', 'false');
      }
      
      // Close mobile menu if open (on mobile)
      if (mobileMenuButton && mobileMenu && 
          !mobileMenuButton.contains(event.target) && 
          !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Reset icons if needed
        const menuIconClosed = mobileMenuButton.querySelector('svg.hidden');
        const menuIconOpen = mobileMenuButton.querySelector('svg.block');
        
        if (menuIconClosed && menuIconOpen && menuIconClosed.classList.contains('hidden')) {
          menuIconClosed.classList.remove('hidden');
          menuIconClosed.classList.add('block');
          menuIconOpen.classList.remove('block');
          menuIconOpen.classList.add('hidden');
        }
      }
    });
    
    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        // Close profile dropdown
        if (userMenuButton && userMenu && !userMenu.classList.contains('hidden')) {
          userMenu.classList.add('hidden');
          userMenuButton.setAttribute('aria-expanded', 'false');
        }
        
        // Close mobile menu
        if (mobileMenuButton && mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          
          // Reset hamburger icon
          const menuIconClosed = mobileMenuButton.querySelector('svg.hidden');
          const menuIconOpen = mobileMenuButton.querySelector('svg.block');
          
          if (menuIconClosed && menuIconOpen) {
            menuIconClosed.classList.remove('hidden');
            menuIconClosed.classList.add('block');
            menuIconOpen.classList.remove('block');
            menuIconOpen.classList.add('hidden');
          }
        }
      }
    });
  });