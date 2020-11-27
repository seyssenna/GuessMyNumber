const cl = console.log;

//......................DECALARATION DES VARIABLES..................................

let entier = 0;
// const numbers = [];
let compteur = 10;

//  SÉLECTION DES ÉLÉMENTS HTML
const playBtn             = document.querySelector(".play");
const input               = document.querySelector("input");
const btnTry              = document.querySelector(".try");
const gameDiv             = document.querySelector(".game");
const resultText          = document.querySelector(".result");
const compteurText        = document.querySelector(".compteur");
const card                = document.querySelector(".card-img");
const essaisTextContainer = document.querySelector(".essaisTextContainer");
const essaisText          = document.querySelector(".essaisText");
const essais              = document.querySelector(".essais");



//.........................FONCTIONS.................................................

// FONCTION QUI GÉNÈRE UN NOMBRE ALÉATOIRE
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FONCTION QUI CRÉER/STOCK UN ENTIER ET QUI REND LE JEU VISIBLE ET RÉ-INITIALISE LE JEU EN CAS DE NOUVELLE TENTATIVE 
function  jouer(){

    //.......créer le nunmero aleatoir et lance le jeu......
    entier = entierAleatoire(1, 100);
    gameDiv.classList.add('active');

    //.......ré-initialise le jeu...........................
    playBtn.textContent = "Rejouer";
    resultText.textContent = "";
    compteurText.textContent = "";
    essaisTextContainer.classList.add("nonActive");
    essaisText.textContent = "vous avez tenté les numeros suivant : "
    essais.textContent = "";
    compteur = 10;
    compteurText.classList.remove("red", "orange");
    cl(entier);
}

// FONCTION QUI COMPARE LES VALEURS ENTRÉ PAR L'UTILISATEUR A L'ENTIER QUI A ÉTÉ GÉNÉRÉ AU PRÉALABLE
function verifyNbr(){
    
    const triedNbr = parseInt(input.value);
    // numbers.push(triedNbr);
    input.value = "";
    
    // GERE LA COULEUR DE TEXTE DU COMPTEUR EN FONCTION DU NOMBRE DE TENTATIVES RESTANTE
    if (compteur > 8){
        compteurText.classList.add("green");
    } if (compteur < 8 && compteur > 4){
        compteurText.classList.remove("green");
        compteurText.classList.add("orange");
    } else if (compteur < 5){
        compteurText.classList.remove("orange");
        compteurText.classList.add("red");
    };
    
    // SI LE NOMBRE DE TENTATIVE EST SUPERIEUR A 1
    if (compteur > 1) {

        essaisTextContainer.classList.remove("nonActive");

        // SI LE NOMBRE SAISIE EST INFERIEUR AU NOMBRE ALEATOIRE
        if (triedNbr < entier) {
            compteur --;
            essais.insertAdjacentHTML('beforeend',  triedNbr + " / ");
            resultText.textContent = "faux, vous etes trop bas";
            compteurText.textContent = "il ne vous reste plus que " + compteur + " tentatives";
        } 
        // SI LE NOMBRE SAISIE EST SUPERIEUR AU NOMBRE ALEATOIRE 
        else if (triedNbr > entier) {
            compteur --;
            essais.insertAdjacentHTML('beforeend',  triedNbr + " / ");
            resultText.textContent = "faux, vous etes trop haut";
            compteurText.textContent = "il ne vous reste plus que " + compteur + " tentatives";
        } 
        // SI LA SAISIE N'EST PAS UN NOMBRE
        else if (isNaN(triedNbr)){
            resultText.textContent = "ATTENTION! il faut un nombre"; 
            essaisTextContainer.classList.add("nonActive");  
        }
        // SI LE NOMBRE A ÉTÉ TROUVER
        else if (triedNbr === entier) {
            resultText.textContent = "BRAVO! vous avez trouver en " + (11 - compteur) + " tentatives";
            compteurText.textContent = "";
            essaisText.textContent = "le numero recherché était le " + entier ;
            essais.textContent = "";
            gameDiv.classList.remove('active');
            card.classList.add("active");
        };
    }
    // SI LE NOMBRE BN'EST PAS TROUVER AU BOUT DE 10 TENTATIVES
    else {
        resultText.textContent = "PERDU! dommage vous y etiez presque.";
        compteurText.textContent = "Retentez votre chance, la prochaine sera la bonne";
        essaisTextContainer.classList.add("nonActive");
        gameDiv.classList.remove('active');
    }
};   


//.................APPEL DES FONCTIONS.......................................

playBtn.addEventListener('click', jouer);
btnTry.addEventListener('click', verifyNbr);






