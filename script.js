// 1. Email Data including new "Offers" tab
const emailData = {
    primary: [
      { subject: "Welcome to Gmail!", body: "This is your primary inbox." },
      { subject: "Family trip details", body: "Hey, let’s plan our trip!" }
    ],
    promotions: [
      { subject: "Big Sale Today!", body: "Up to 70% off on electronics." }
    ],
    social: [
      { subject: "New friend request", body: "Someone added you." }
    ],
    updates: [
      { subject: "Your payment is successful", body: "Thank you!" }
    ],
    offers: [
      { subject: "Offer Letter from Infosys", body: "You’re selected!" },
      { subject: "Selected for next round at Google", body: "Check your email." },
      { subject: "Congratulations, You’ve been hired!", body: "Please review the attached offer letter." }
    ]
  };
  
  // 2. Keywords to detect job offer emails (more accurate filtering)
  const offerKeywords = [
    "offer letter",
    "you are selected",
    "you’re selected",
    "selected for next round",
    "you have been hired",
    "you've been hired",
    "we are pleased to offer",
    "please find attached your offer letter"
  ];
  
  // 3. Function to detect job offer emails
  function detectJobOffer(email) {
    const emailText = `${email.subject.toLowerCase()} ${email.body.toLowerCase()}`;
    return offerKeywords.some(keyword => emailText.includes(keyword));
  }
  
  // 4. Function to show emails in selected tab
  function showTab(tabName) {
    document.getElementById("tab-title").innerText = tabName.charAt(0).toUpperCase() + tabName.slice(1);
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add("active");
  
    const emails = emailData[tabName] || [];
    const container = document.getElementById("email-list");
    container.innerHTML = "";
  
    emails.forEach(email => {
      const div = document.createElement("div");
      div.classList.add("email");
  
      const isOffer = detectJobOffer(email);
      div.innerHTML = `
        <strong>${email.subject}</strong>
        <p>${email.body}</p>
        ${isOffer ? '<span class="offer-alert">📣 Job Offer Detected!</span>' : ''}
      `;
      container.appendChild(div);
  
      // Trigger voice call if job offer detected
      if (isOffer && tabName === "offers") {
        triggerVoiceCall(email);
      }
    });
  }
  
  // 5. Voice call alert logic (simulated with alerts)
  let callRetryCount = 0;
  const maxRetries = 3;
  const retryInterval = 3 * 1000; // Change to 3 * 60 * 60 * 1000 for real 3 hours
  
  function triggerVoiceCall(email) {
    console.log(`Calling user about job offer: ${email.subject}`);
    alert(`📞 Voice Call: You have a job offer!\nSubject: ${email.subject}`);
    retryCall(email);
  }
  
  // 6. Retry call if user doesn't answer
  function retryCall(email) {
    if (callRetryCount < maxRetries) {
      callRetryCount++;
      console.log(`Retrying call #${callRetryCount} in 3 hours...`);
  
      setTimeout(() => {
        alert(`📞 Retry Call #${callRetryCount}: You still have a job offer!\nSubject: ${email.subject}`);
        retryCall(email);
      }, retryInterval);
    } else {
      console.log("📴 Max retries reached. User did not answer the call.");
    }
  }
  
  // 7. Initial tab load
  showTab("primary");
  