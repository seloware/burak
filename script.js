// script.js
(function(){
  const input = document.getElementById('dateInput');
  const btn = document.getElementById('proceedBtn');
  const msg = document.getElementById('message');

  // İstenilen doğru tarih
  const TARGET = '06.09.2025';
  const TARGET_DIGITS = '06092025';

  function validateDateFormat(value){
    // GG.AA.YYYY veya GG/AA/YYYY biçimi
    const re = /^\d{2}[./]\d{2}[./]\d{4}$/;
    return re.test(value.trim());
  }

  function showMessage(text){
    msg.textContent = text;
  }

  function shakeCard(){
    const card = document.querySelector('.card');
    if (!card) return;
    card.classList.remove('shake');
    void card.offsetWidth; // reflow to restart animation
    card.classList.add('shake');
  }

  function openNextPage(){
    // Şimdilik basit bir ikinci sayfa
    window.location.href = 'love.html';
  }

  // Otomatik tarih maskeleme (GG/AA/YYYY)
  input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').slice(0, 8);
    let out = '';
    if (digits.length > 0) out = digits.slice(0, 2);
    if (digits.length >= 3) out += '/' + digits.slice(2, 4);
    if (digits.length >= 5) out += '/' + digits.slice(4, 8);
    input.value = out;
  });

  btn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!validateDateFormat(value)){
      showMessage('Lütfen GG.AA.YYYY veya GG/AA/YYYY biçiminde bir tarih gir ♥');
      shakeCard();
      return;
    }
    if (value.replace(/\D/g, '') !== TARGET_DIGITS){
      showMessage('Hmm... O tarih değil sanki.');
      shakeCard();
      return;
    }
    // Küçük bir kalp animasyonu
    btn.disabled = true;
    showMessage('Kalplerin kapısı açılıyor...');
    setTimeout(openNextPage, 900);
  });

  // Enter ile devam
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
})();