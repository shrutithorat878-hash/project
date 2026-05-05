// CineBook — cinebook.js
// Global JS utilities

document.addEventListener('DOMContentLoaded', function () {

  // Auto-dismiss alerts after 4 seconds
  document.querySelectorAll('.cb-alert').forEach(function (alert) {
    setTimeout(function () {
      var bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      if (bsAlert) bsAlert.close();
    }, 4000);
  });

  // Payment method radio toggle styling
  document.querySelectorAll('.cb-pay-method').forEach(function (label) {
    label.addEventListener('click', function () {
      document.querySelectorAll('.cb-pay-method').forEach(function (l) {
        l.classList.remove('active');
      });
      label.classList.add('active');
    });
  });

});

// Global toast helper
function showToast(message, type) {
  // Remove existing toast
  var existing = document.getElementById('cb-global-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'cb-global-toast';
  toast.className = 'cb-toast' + (type === 'error' ? ' error' : '');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(function () {
    if (toast.parentNode) toast.remove();
  }, 3500);
}
