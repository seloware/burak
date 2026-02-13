// script.js
(function(){
  const passwordInput = document.getElementById('passwordInput');
  const loginBtn = document.getElementById('loginBtn');
  const msg = document.getElementById('message');
  const loginCard = document.getElementById('loginCard');
  const questionArea = document.getElementById('questionArea');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  const TARGET_PASSWORD = '25112024';

  function showMessage(text){
    msg.textContent = text;
  }

  function shakeCard(){
    loginCard.classList.remove('shake');
    void loginCard.offsetWidth; 
    loginCard.classList.add('shake');
  }

  // Otomatik tarih maskeleme (GG/AA/YYYY)
  passwordInput.addEventListener('input', () => {
    const digits = passwordInput.value.replace(/\D/g, '').slice(0, 8);
    let out = '';
    if (digits.length > 0) out = digits.slice(0, 2);
    if (digits.length >= 3) out += '/' + digits.slice(2, 4);
    if (digits.length >= 5) out += '/' + digits.slice(4, 8);
    passwordInput.value = out;
  });

  function handleLogin(){
    const value = passwordInput.value.trim().replace(/\D/g, '');
    
    if (value === TARGET_PASSWORD) {
      showMessage('Giriş başarılı...');
      loginBtn.disabled = true;
      
      setTimeout(() => {
        loginCard.classList.add('hidden');
        questionArea.classList.remove('hidden');
      }, 800);
    } else {
      showMessage('Hatalı anahtar, tekrar dene ♥');
      shakeCard();
      passwordInput.value = '';
    }
  }

  // Hayır butonunun kaçma mantığı
  noBtn.addEventListener('mouseover', moveButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
  });

  function moveButton() {
    const yesRect = yesBtn.getBoundingClientRect();
    const padding = 20; // Ekran kenarlarından minimum mesafe
    const avoidMargin = 50; // Evet butonundan minimum uzaklık
    const minMove = 20; // Minimum hareket mesafesi
    const maxMove = 200; // Maksimum hareket mesafesi

    const currentRect = noBtn.getBoundingClientRect();
    let x, y, isOverlapping, isOutOfBounds;
    let attempts = 0;

    do {
      // 20px ile 200px arasında rastgele bir mesafe ve yön belirle
      const distanceX = (Math.random() * (maxMove - minMove) + minMove) * (Math.random() < 0.5 ? -1 : 1);
      const distanceY = (Math.random() * (maxMove - minMove) + minMove) * (Math.random() < 0.5 ? -1 : 1);
      
      x = currentRect.left + distanceX;
      y = currentRect.top + distanceY;

      // Ekran dışına çıkma kontrolü (Kaybolmaması için)
      isOutOfBounds = (
        x < padding || 
        x > window.innerWidth - noBtn.offsetWidth - padding ||
        y < padding || 
        y > window.innerHeight - noBtn.offsetHeight - padding
      );

      // Evet butonu ile çakışma kontrolü
      const noRect = {
        left: x,
        top: y,
        right: x + noBtn.offsetWidth,
        bottom: y + noBtn.offsetHeight
      };

      isOverlapping = !(
        noRect.right < yesRect.left - avoidMargin || 
        noRect.left > yesRect.right + avoidMargin || 
        noRect.bottom < yesRect.top - avoidMargin || 
        noRect.top > yesRect.bottom + avoidMargin
      );

      attempts++;
    } while ((isOverlapping || isOutOfBounds) && attempts < 50);
    
    // Eğer uygun yer bulunamazsa (köşeye sıkışma vb.), güvenli bir alana yerleştir
    if (attempts >= 50) {
      x = Math.max(padding, Math.min(x, window.innerWidth - noBtn.offsetWidth - padding));
      y = Math.max(padding, Math.min(y, window.innerHeight - noBtn.offsetHeight - padding));
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = '1000';
  }

  // Evet butonuna basınca love.html'e yönlendir
  yesBtn.addEventListener('click', () => {
    window.location.href = 'love.html';
  });

  loginBtn.addEventListener('click', handleLogin);

  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
})();