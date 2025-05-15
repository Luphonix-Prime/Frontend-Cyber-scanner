// Matrix code rain animation
document.addEventListener('DOMContentLoaded', function() {
  // Matrix code animation
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const matrixContainer = document.querySelector('.matrix-code');
  
  matrixContainer.appendChild(canvas);
  
  // Set canvas dimensions
  function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Matrix characters
  const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  const charArray = characters.split('');
  
  // Column setup
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Drops - one per column
  const drops = [];
  for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
  }
  
  // Drawing the characters
  function draw() {
      // Black semi-transparent background to create fade effect
      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00f7ff';
      ctx.font = fontSize + 'px monospace';
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
          // Random character
          const text = charArray[Math.floor(Math.random() * charArray.length)];
          
          // x = i * fontSize, y = value of drops[i]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          // Sending the drop back to the top randomly after it crosses the screen
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
          }
          
          // Incrementing Y coordinate
          drops[i]++;
      }
  }
  
  setInterval(draw, 35);

  // Typing effect for header
  const headerText = document.querySelector('.scanner-header h1');
  const originalText = headerText.textContent;
  headerText.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
      if (i < originalText.length) {
          headerText.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 150);
      } else {
          // Add blinking cursor at the end
          headerText.classList.add('typing-complete');
      }
  };
  
  setTimeout(typeWriter, 1000);

  // Floating animation for cards
  const cards = document.querySelectorAll('.glassmorphism');
  cards.forEach((card, index) => {
      card.style.animation = `float-card 4s ease-in-out ${index * 0.2}s infinite alternate`;
  });

  // Scan button effect
  const scanButton = document.getElementById('scan-button');
  if (scanButton) {
      scanButton.addEventListener('click', function() {
          // Hide the form and show progress
          document.querySelector('.scanner-form').classList.add('hidden');
          document.getElementById('scanning-progress').classList.remove('hidden');
          
          // Animate progress bar
          const progressFill = document.querySelector('.progress-fill');
          const progressPercentage = document.querySelector('.progress-percentage');
          const scanStatus = document.getElementById('current-scan-status');
          
          const statuses = [
              "Initializing scan...",
              "Checking SSL configuration...",
              "Scanning for vulnerabilities...",
              "Analyzing HTTP headers...",
              "Checking for malware...",
              "Verifying security protocols...",
              "Generating report..."
          ];
          
          let progress = 0;
          const interval = setInterval(() => {
              progress += 1;
              progressFill.style.width = `${progress}%`;
              progressPercentage.textContent = `${progress}%`;
              
              // Update status text at certain points
              if (progress % 15 === 0 && progress < 90) {
                  scanStatus.textContent = statuses[Math.floor(progress / 15)];
              }
              
              if (progress >= 100) {
                  clearInterval(interval);
                  setTimeout(() => {
                      document.getElementById('scanning-progress').classList.add('hidden');
                      document.getElementById('scan-results').classList.remove('hidden');
                      
                      // Add data breach animation
                      createDataBreachEffect();
                  }, 500);
              }
          }, 50);
      });
  }

  // Data breach animation
  function createDataBreachEffect() {
      const resultsContainer = document.getElementById('scan-results');
      const characters = '01010101010101010101';
      
      for (let i = 0; i < 20; i++) {
          setTimeout(() => {
              const particle = document.createElement('div');
              particle.className = 'data-breach-particle';
              particle.style.left = `${Math.random() * 100}%`;
              particle.style.top = `${Math.random() * 100}%`;
              particle.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
              
              resultsContainer.appendChild(particle);
              
              // Remove particle after animation completes
              setTimeout(() => {
                  particle.remove();
              }, 1500);
          }, i * 100);
      }
  }

  // Add shield pulse animation to security score
  const scoreCircle = document.querySelector('.score-circle');
  if (scoreCircle) {
      const shieldPulse = document.createElement('div');
      shieldPulse.className = 'shield-pulse';
      scoreCircle.appendChild(shieldPulse);
      
      setInterval(() => {
          shieldPulse.style.animation = 'none';
          void shieldPulse.offsetWidth; // Trigger reflow
          shieldPulse.style.animation = 'shield-pulse 2s ease-in-out';
      }, 2000);
  }

  // Add hover glow effect to all buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
          this.classList.add('glow-effect');
      });
      
      button.addEventListener('mouseleave', function() {
          this.classList.remove('glow-effect');
      });
  });
  
  // Add functionality to action buttons
  const downloadReportBtn = document.querySelector('.download-report');
  const newScanBtn = document.querySelector('.new-scan');
  
  if (downloadReportBtn) {
      downloadReportBtn.addEventListener('click', function() {
          // Generate and download the report
          generateReport();
      });
  }
  
  if (newScanBtn) {
      newScanBtn.addEventListener('click', function() {
          // Reset the form and show the initial scan form
          resetScan();
      });
  }
});

// Function to generate and download the report
function generateReport() {
  // Get the scan results
  const scanResults = document.getElementById('scan-results');
  const securityScore = document.getElementById('security-score').textContent;
  const websiteUrl = document.getElementById('website-url').value;
  const date = new Date().toLocaleDateString();
  
  // Create report content
  let reportContent = `
  ===== APHELION SECURITY SCAN REPORT =====
  
  Website: ${websiteUrl}
  Date: ${date}
  Security Score: ${securityScore}/100
  
  === SUMMARY ===
  `;
  
  // Add summary items
  const summaryItems = document.querySelectorAll('.stat-item');
  summaryItems.forEach(item => {
      const status = item.querySelector('i').classList.contains('passed') ? 'PASSED' : 
                    item.querySelector('i').classList.contains('warning') ? 'WARNING' : 'FAILED';
      const name = item.querySelector('span').textContent;
      reportContent += `\n${name}: ${status}`;
  });
  
  // Add detailed results
  reportContent += `\n\n=== DETAILED RESULTS ===`;
  
  const resultCards = document.querySelectorAll('.result-card');
  resultCards.forEach(card => {
      const title = card.querySelector('h3').textContent;
      const status = card.querySelector('.status-badge').textContent;
      const description = card.querySelector('.card-content p').textContent;
      
      reportContent += `\n\n${title} - ${status}\n${description}`;
      
      // Add recommendations if any
      const recommendation = card.querySelector('.recommendation p');
      if (recommendation) {
          reportContent += `\nRecommendation: ${recommendation.textContent}`;
      }
  });
  
  reportContent += `\n\n===== END OF REPORT =====`;
  
  // Create a blob and download
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `aphelion_security_report_${date.replace(/\//g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show a success message
  showNotification('Report downloaded successfully!', 'success');
}

// Function to reset the scan
function resetScan() {
  // Hide results and progress
  document.getElementById('scan-results').classList.add('hidden');
  document.getElementById('scanning-progress').classList.add('hidden');
  
  // Show the form
  document.querySelector('.scanner-form').classList.remove('hidden');
  
  // Clear the input field
  document.getElementById('website-url').value = '';
  
  // Reset progress bar
  document.querySelector('.progress-fill').style.width = '0%';
  document.querySelector('.progress-percentage').textContent = '0%';
  document.getElementById('current-scan-status').textContent = 'Initializing scan...';
  
  // Show a notification
  showNotification('Ready for a new scan!', 'info');
}

// Function to show notifications
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
      notification.classList.add('show');
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 300);
  }, 3000);
}
// Form submission handling
const form = document.getElementById("myForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const webhookUrl = 'http://n8n.jaiminsomani.live:5678/webhook-test/start-sca';
    const resultUrl = 'http://n8n.jaiminsomani.live:5678/webhook-test/new-node';

    const targetUrl = formData.get("website-url");
    const emailAddress = formData.get("email-url");

    async function submitAndFetchResult() {
      const dataToSend = {
        'Landing Page Url': targetUrl,
        'Email': emailAddress
      };

      try {
        // Send form data to start the scan
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }

        console.log('Scan request sent successfully!');

        // Wait a few seconds before fetching results (adjust delay if needed)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Fetch scan results
        const resultResponse = await fetch(resultUrl);
        const data = await resultResponse.json();

        // Update HTML with scan results
        document.getElementById("security-score").textContent = data.score;
        updateStatus("malware", data.malware);
        updateStatus("ssl", data.ssl_certificate);
        updateStatus("https", data.https_redirect);
        updateStatus("csp", data.content_security);
        document.getElementById("malware-files-scanned").textContent = data.files_scanned;

      } catch (error) {
        console.error("Error in scan process:", error);
      }
    }

    function updateStatus(type, status) {
      const map = {
        "PASSED": { icon: "fas fa-check-circle", class: "passed" },
        "FAILED": { icon: "fas fa-times-circle", class: "failed" },
        "WARNING": { icon: "fas fa-exclamation-triangle", class: "warning" }
      };

      const el = document.getElementById(`${type}-status`);
      if (el && map[status]) {
        el.className = `${map[status].icon} ${map[status].class}`;
        el.nextElementSibling.textContent = {
          ssl: "SSL Certificate",
          malware: "No Malware",
          https: "HTTPS Redirect",
          csp: "Content Security"
        }[type];
      }

      const badge = document.getElementById(`${type}-badge`);
      if (badge) badge.textContent = status;
    }

    // Start the full process
    submitAndFetchResult();
  });