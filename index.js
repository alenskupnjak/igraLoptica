const pokaziBtn = document.getElementById('pravilaBtn');
const zatvoriPravila = document.getElementById('zatvori');
const pokazi = document.getElementById('pravila');
const c = document.getElementById('can');
const ctx = c.getContext('2d');

let rezultat = 0;
let brojRedova = 9;
let brojStupaca = 5;

// Definiramo karakteristike lopte
const lopta = {
  naziv: 'lopta',
  x: c.width / 2,
  y: c.height / 2,
  radius: 10,
  brzinaKretanja: 4,
  dx: 4,
  dy: -4,
};

// definiramo odbojnik
const odbojnik = {
  x: c.width / 2 - 60,
  y: c.height - 20,
  height: 10,
  width: 120,
  brzina: 18,
  dx: 0,
};

// definiranje bloka
const block = {
  naziv: 'block',
  w: 70,
  h: 20,
  razmak: 10,
  offsetX: 45,
  offsetY: 50,
  vidljiv: true,
};

// kreiranje polja blokova, mijenja sa samo visibiliti
const poljeBlokova = [];
for (let i = 0; i < brojRedova; i++) {
  poljeBlokova[i] = [];
  for (let j = 0; j < brojStupaca; j++) {
    x = i * (block.w + block.razmak) + block.offsetX;
    y = j * (block.h + block.razmak) + block.offsetY;
    poljeBlokova[i][j] = { x, y, ...block };
  }
}

// nacrtaj blokove
function nacrtajBlokove() {
  poljeBlokova.forEach((kolona) => {
    kolona.forEach((data) => {

        ctx.beginPath();
        ctx.rect(data.x, data.y, data.w, data.h);

        if (data.vidljiv) {
          ctx.fillStyle = 'black';
        } else {
          ctx.fillStyle = 'transparent';
        }
        ctx.fill();
        ctx.closePath();
    });
  });
}

// nacrtaj odbojnik u pocetnoj poziciji
function nacrtajOdbojnik() {
  ctx.beginPath();
  ctx.rect(odbojnik.x, odbojnik.y, odbojnik.width, odbojnik.height);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

// Kretanje odbojnika
function kretanjeOdbojnika(e) {
  if (e.key === 'ArrowRight') {
    console.log('desno');
    odbojnik.x += odbojnik.brzina;
  }

  if (e.key === 'ArrowLeft') {
    console.log('Lijevo');
    odbojnik.x -= odbojnik.brzina;
  }

  if (odbojnik.x + odbojnik.width > c.width) {
    odbojnik.x = c.width - odbojnik.width;
  }

  if (odbojnik.x < 0) {
    odbojnik.x = 0;
  }
}


// Ucini vidljivima sve blokove
function blokoviVidljivi() {
  rezultat = 0;
  poljeBlokova.forEach(column =>{
    column.forEach(data => {
      data.vidljiv = true
    })
  })
}

// funkcija koja crta loptu
function nacrtajLoptu() {
  ctx.beginPath();
  ctx.arc(lopta.x, lopta.y, lopta.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}


// Crtamo loptu koja se krece
function kretanjeLopte() {
  lopta.x += lopta.dx;
  lopta.y += lopta.dy;

  // udarac od odbojnika
  if (
    // lopta.y + lopta.radius > odbojnik.y &&
    lopta.x - lopta.radius > odbojnik.x &&
    lopta.x + lopta.radius < odbojnik.x + odbojnik.width &&
    lopta.y + lopta.radius > odbojnik.y
  ) {
    lopta.dy = -lopta.brzinaKretanja;
  }

  // gornji zid
  if (lopta.y - lopta.radius < 0) {
    lopta.dy = -lopta.dy;
  }

  // desni/lijevi zid odbijanje
  if (lopta.x + lopta.radius > c.width
    || lopta.x - lopta.radius < 0) {
    lopta.dx = -lopta.dx;
  }
  // donji zid
  if (lopta.y + lopta.radius > c.height) {
    lopta.dy = -lopta.dy;
    // setTimeout(() => {
    //   console.log('dno');
    // }, 1000);

    // Nova igra
    // blokoviVidljivi();
  }

  // provjera za svaki blok dali je lopta dodirnila
  poljeBlokova.forEach(kolona =>{
    kolona.forEach((data,index) => {
      if (data.vidljiv) {
        if(
              lopta.x - lopta.radius > data.x
          &&  lopta.x + lopta.radius < data.x + data.w
          && lopta.y + lopta.radius > data.y
          && lopta.y - lopta.radius < data.y + data.h 
        ) {
          lopta.dy = -lopta.dy
          data.vidljiv = false
          console.log(index);
          
          povecajRezultat();
        }
      }
    })
  })
}

// povecaj rezultat
function povecajRezultat() {
  rezultat = rezultat + 1
  nacrtajRezultat();
}


// Nacrtaj rezultat na Canvas
function nacrtajRezultat() {
  ctx.font = '16px Arial'
  ctx.fillText(`Rezultat : ${rezultat}`, c.width - 100, 25)
}



// nakon puštanja tipke
function keyup(e) {
  if ( e.key === 'ArrowRight' || e.key === 'ArrowLeft' ) {
    odbojnik.dx =0;
  }
}


// Glavna funkcija za crtanje na ekranu
function animacija() {
  // ciscenje ekrana
  ctx.clearRect(0, 0, c.width, c.height);

  // nacrtaj odbojnik
  nacrtajOdbojnik();

  // nacrtaj odbojnik
  nacrtajBlokove();

  
  nacrtajLoptu();
  kretanjeLopte();

  // Nacrtaj rezultat
  nacrtajRezultat()
  requestAnimationFrame(animacija);
}

// Pokratanje programa
animacija();




document.addEventListener('keydown', kretanjeOdbojnika);
document.addEventListener('keyup', keyup);

// Otvori pravila igre
pokaziBtn.addEventListener('click', () => {
  pokazi.classList.add('pokazi');
});

// Zatvori prikaz pravila igre
zatvoriPravila.addEventListener('click', () => {
  pokazi.classList.remove('pokazi');
});





// console.log(ctx);
// console.log(c.width);
// console.log(c.height);
// console.log(ctx.canvas.offsetHeight);
// console.log(ctx.canvas.offsetWidth);
