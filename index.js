const pokaziBtn = document.getElementById('pravilaBtn');
const zatvoriPravila = document.getElementById('zatvori');
const pokazi = document.getElementById('pravila')







pokaziBtn.addEventListener('click', () => {  
  pokazi.classList.add('pokazi');
});

zatvoriPravila.addEventListener('click', () => {  
  pokazi.classList.remove('pokazi');
});
