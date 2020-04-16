//-----------------Pobrane elementy ----------------------------

const btnMinus = document.querySelector('button.minus1');
const btnPlus = document.querySelector('button.plus1');
const btnStop = document.querySelector('button#stop');
let LCDu = document.querySelector('p.u');
let LCDz = document.querySelector('p.z');
let LCDppt = document.querySelector('p.ppt');

//-----------------ZMIENNE------CANVAS--------------------------

const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');
canv.width = 800;
canv.height = 300;

const cw = canv.width;
const ch = canv.height;

//------------------zmienne symulacja-------CANVAS--------------

let poz = 0; //pozycja otwarcia zaworu
let pt = 0; //pozycja tłoka
let pp = 0; //przepływ powietrza
let U = 0; //napiecie


//--------------------zmienne coloru przeplywu------------------
let colorRed = 0;
let colorGreen = 80;

//szerokość i wysokość:
//--- zawór ---

const zaworX = 100;
const zaworY = 50;

//--- przewód ---

const pX = 300;
const pY = zaworY/2;


//--- tłok ---

const tlokX = 180;
const tlokY = 75;

// --- rysowanie start ---

const startX = 100;
const startY = ch/2 - zaworY/2;

//tłok pozycja startowa
let positionTX = startX + zaworX + pX;

//------------TLOK ---------------------------------------------

const tSize = 15; //szerokosc tloka
let Vt = 0; //prędkość posuwu
let tX = 0; // przesunięcie tłoka 


// -------------------OBSŁUGA PRZYCISKÓW -----------------------

if(U == 0) {

    btnMinus.addEventListener('click', function() {
       
        if(U > 0) {
            U--;
            colorRed -= 10;
            colorGreen -= 10;
            // tX -=10;
            LCDz.textContent = 'otwarcie zaworu';
            speedDown();
            LCDppt.textContent = 'prędkość posuwu tłoka: '+ Math.round(Vt*100) ;
            
        } if(U == 0) {
            U = 0;
            poz = 0;
            // tX = 0;
            LCDz.textContent = 'zamknięcie zaworu';
            // stopSpeed();
            LCDppt.textContent = 'prędkość posuwu tłoka: '+ Math.round(Vt*100) ;
        }
        LCDu.textContent = "napięcie: " + U + "V";
    })

    btnPlus.addEventListener('click', function() {
        if(U < 10) {
            U++;
            poz = 1;
            colorRed += 10;
            colorGreen += 10;
            // tX += 10;
            LCDz.textContent = 'otwarcie zaworu';
            speedUp();
            LCDppt.textContent = 'prędkość posuwu tłoka: '+ Math.round(Vt*100) ;
        }
        LCDu.textContent = "napięcie: " + U + "V";
    })
    
    btnStop.addEventListener('click', function() {
        U = 0;
        poz = 0;
        speedDown();
        LCDu.textContent = "napięcie: " + U + "V";
        LCDz.textContent = 'zamknięcie zaworu';
        LCDppt.textContent = 'prędkość posuwu tłoka: '+ Math.round(Vt*100) ;
})
}


function speedUp() {
    if(U > 0){
        positionTX += 1;
        Vt+=0.1;
        console.log(Vt);
        console.log(startX + zaworX + pX + tlokX - tSize, positionTX)

        if(positionTX >= startX + zaworX + pX + tlokX - tSize) {
            Vt=0;
            console.log('juz')
    
        
        }
    
    }
        

}

function speedDown() {
        if(U > 0) {
            positionTX -= 1;
            Vt -=0.1;
            console.log(Vt);
        }
        if (U == 0) {
            
            Vt = -0.1
            if(positionTX >= startX + zaworX + pX) {
                Vt = 0;
                positionTX = startX + zaworX + pX;
            }
        }
        

}

// function stopSpeed() {
//     while(U > 0) {
//         positionTX -= 1;
//         Vt -= 0.1;
//          if(U < 1) {
//             positionTX = startX + zaworX + pX;
//             Vt = 0;
//             console.log(Vt); 
//         }
//     }
// }
//------------------FUNKCJE-------------CANVAS------------------

function background() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0 ,cw, ch);
}

function zawor() {
    ctx.fillStyle = 'green';
    ctx.fillRect(startX, startY ,zaworX, zaworY);
    
    //----------- rysowanie otwarcia zaworu -----------
    if(poz == 0) {
        ctx.fillStyle = 'black';
        ctx.fillRect(startX + zaworX - 10, startY, 10, zaworY/2);
        ctx.fillRect(startX + zaworX - 10, startY + zaworY, 10, -zaworY/2);   
    } else if(poz == 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(startX + zaworX - 10, startY, 10, zaworY/2 - pY/2);
        ctx.fillRect(startX + zaworX - 10, startY + zaworY, 10, -zaworY/2 + pY/2);
    }
    
}

function przeplyw() {
    ctx.fillStyle = 'rgb('+colorRed+','+ colorGreen +', 255)'; //zmiana koloru przepływu w zależności od U
    ctx.fillRect(startX + zaworX, startY + zaworY/2 - pY/2 ,pX, pY);
}

function tlok() {
    ctx.fillStyle = 'red';
    ctx.fillRect(startX + zaworX + pX, startY - pY/2 ,tlokX, tlokY);
    ctx.fillStyle = 'black';
    ctx.fillRect(positionTX, startY - pY/2 , tSize + tX, tlokY);
    positionTX +=Vt;
}

function view() {
    background();
    zawor();
    przeplyw();
    tlok();    

}

setInterval(view, 15);