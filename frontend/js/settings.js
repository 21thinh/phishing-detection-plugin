// Settings modal logic
$(function() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Open modal
  settingsBtn.addEventListener('click', function() {
    settingsModal.style.display = 'flex';
    darkModeToggle.checked = document.body.classList.contains('dark-mode');
  });

  // Close modal
  closeSettings.addEventListener('click', function() {
    settingsModal.style.display = 'none';
  });

  // Toggle dark mode
  darkModeToggle.addEventListener('change', function() {
    if (darkModeToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('phishTorDarkMode', '1');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('phishTorDarkMode', '0');
    }
  });

  // Load dark mode preference
  if (localStorage.getItem('phishTorDarkMode') === '1') {
    document.body.classList.add('dark-mode');
  }
}); 