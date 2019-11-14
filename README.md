# healthy-shopping-game

## But du jeu :

Récupérer à l'aide d'un caddie les aliments sains qui tombent d'en haut et eviter la junkfood
aliment sain récupéré +1 point
junkfood récupéréé -2 points

level 0 --> 3 points à cumuler

level 1 --> 4 points à cumuler

level 2 --> 5 points à cumuler

level 3 --> 6 points à cumuler


Pour gagner, il faut compléter le 3e level
On perd qd le score est inférieur à 0

## Code :

###index.html

###style.css

###trolley.js
**class trolley**

w largeur caddie

h hauteur caddie

x,y coordonnées du caddie sur le canva

speed nombre de px ajouté ou retiré au x qd on appui sur la touche droite ou gauche

methode draw() dessine le trolley sur le canva

methodes moveLeft() et moveRight() déplacent le trolley vers la gauche et vers la droite 

###food.js
tableau junkfood

tableau healthy food

tableau lot


function ramdom(from, to) --> donne un nombre au hasard entre from from et to

**class Food**
w largeur food
h hauteur food
x,y coordonnées de la food sur le canva
img.src --> donne un aliment au hasard dans le tableau indiqué en source

methode draw() dessine la food sur le canva

methode catch() return true qd les coordonnées de la food sont égales aux coordonées du trolley


###main.js

####déclaration des variables :
trolley, junk, healthy, lot, points, level

junkFoodGame--> tableau contenant les aliments malsains créés en random

healthyFoodGame--> tableau contenant les aliments sains créés en random

lotFoodGam ->tableau contenant les lots d'aliments malsains crées en random au 3e niveau

stopGame --> qd game over ou reinitialisation pour stopper le jeu

pointMaxLevel --> nombre de points a gagner pour passer au level superieur

speedJunk --> vitesse de la malbouffe

speedHealthy --> vitesse des aliments sains

moduloFrameJunk --> créer un aliment malsain toutes les "moduloFrameJunk" frames (toutes les moduloFrameJunk*20ms)

moduloFrameHealthy (idem)

levelOneaffiche --> return true si le gif de felicitation du level s'est deja affiché (pour le pas le rejouer)

levelTwoaffiche (idem)

levelThreeaffiche (idem)

AmbulanceAudio, HealthyAudio, JunkAudio, lotAudio, levelUpAudio, winAudio=new Audio déclaration des fichiers audio associés à des evenements

#### fonction barre 
affichage de la barre de progression 

####

