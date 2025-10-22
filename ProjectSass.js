const prompt = require('prompt-sync')();

// ===============================================================================
//   ProjectSass : Gestion d’une Bibliothèque
// ===============================================================================

//  Menu 

function menu() {
    console.log(`
=== Gestion d’une Bibliothèque ===
1. Introduire un livre 
2. Ajouter plusieurs livres  
3. Afficher tous les livres 
4. Trier les livres par titre (ascendant / descendant) 
5. Trier les livres par année de publication 
6. Afficher uniquement les livres disponibles 
7. Rechercher un livre par ID_livre
8. Ajouter un abonné (Nom, Prénom, Email). 
9. Afficher tous les abonnés.
10.Enregistrer un emprunt . 
11.Enregistrer un retour .   
12.Afficher les livres empruntés par un abonné donné.   
0. Quitter
`);
    let n = prompt("Entrez un choix : ");
    return n;
}

// Données initiale
let livres = [
    { id_livre: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", annee: 1943, disponible: true },
    { id_livre: 2, titre: "L'Étranger", auteur: "Camus", annee: 1942, disponible: true },
    { id_livre: 3, titre: "fast cent", auteur: "brono", annee: 2022, disponible: false },
    { id_livre: 4, titre: "frize buzz", auteur: "johan", annee: 2020, disponible: false },
];

let abonnes = [ 
{ id: 1, nom: "Dupont", prenom: "Alice", email: "alice@mail.com" } 
]; 
let emprunts = [ 
{ abonneId: 1, id_livre: "123", dateEmprunt: "2025-09-22" } 
]; 



// 1️ Introduire livre

function IntroduireLivre() {
    let id_livre = livres.length + 1;
    let titre = prompt("Entrez le titre du livre : ");
    let auteur = prompt("Entrez l'auteur du livre : ");
    let annee = parseInt(prompt("Entrez l'année de publication : "));
    let disponible = true;

    let nouveauLivre = { id_livre, titre, auteur, annee, disponible };
    livres.push(nouveauLivre);

    console.log("Livre access add ");
}

// 2️ Ajouter plusieurs livres

function AjouterPlusieursLivres() {
    let nombre = parseInt(prompt("Combien de livres ajouter ? "));
    for (let i = 0; i < nombre; i++) {
        console.log(`---- Livre ${i + 1} ----`);
        IntroduireLivre();
    }
}

// 3️ Afficher tous les livres

function AfficherTousLesLivres() {
    console.log("=== Liste des livres ===");
    if(livres.length === 0) {
        console.log("not found livre");
    }else{
        livres.forEach(livre => {
        console.log(`ID: ${livre.id_livre}, Titre: ${livre.titre}, Auteur: ${livre.auteur}, Année: ${livre.annee}, Disponible: ${livre.disponible}`);
    });
    }

}

// 4️ Trier les livres par titre

function TrierLivresParTitre() {
    let ordre = prompt("Choisisse numbre of ordre (1-ascendant / 2-descendant) : ");

    if (ordre === "1") {
        livres.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (ordre === "2") {
        livres.sort((a, b) => b.titre.localeCompare(a.titre));
    } else {
        console.log("Ordre not found");
        return;
    }

    console.log(`=== Liste des livres triés par titre (${ordre === "1" ? "ascendant" : "descendant"}) ===`);
    AfficherTousLesLivres();
}

// 5️ Trier les livres par année

function TrierLivresParAnnee() {
    let ordre = prompt("Choisisse numbre of ordre (1-ascendant / 2-descendant) : ");

       if (ordre === "1") {
        livres.sort((a, b) => a.annee - b.annee);
    } else if (ordre === "2") {
        livres.sort((a, b) => b.annee - a.annee);
    } else {
        console.log("Ordre not found");
        return;
    }
   
    console.log("=== Liste livres trie par annee publication ===");
    AfficherTousLesLivres();
}

// 6️ Afficher uniquement les livres disponibles

function AfficherLivresDisponibles() {
    console.log("=== Liste des livres disponibles ===");

    let disponibles = livres.filter(livre => livre.disponible);

    if (disponibles.length === 0) {
        console.log("Not found livre disponible ");
    } else {
        disponibles.forEach(livre => {
            console.log(`ID: ${livre.id_livre}, Titre: ${livre.titre}, Auteur: ${livre.auteur}, Année: ${livre.annee}`);
        });
    }
}

// 7️ Rechercher un livre par ID

function RechercherLivreParID() {
    let id = parseInt(prompt("Entre id livre search : "));
    let livreTrouve = livres.find(livre => livre.id_livre === id);

    if (livreTrouve) {
        console.log("=== Livre trouvé ===");
        console.log(`ID: ${livreTrouve.id_livre}, Titre: ${livreTrouve.titre}, Auteur: ${livreTrouve.auteur}, Année: ${livreTrouve.annee}, Disponible: ${livreTrouve.disponible}`);
    } else {
        console.log("Livre not found.");
    }
}

// 8 Ajout un abonee 

function AjouterAbonne() {
    let id = abonnes.length + 1 ;
    let nom = prompt("enter nom of abonne :");
    let prenom = prompt("enter prenom of abonne :");
    let email = prompt("enter email of abonne :");

    let nouvelAbonee = {id, nom, prenom, email};
    abonnes.push(nouvelAbonee);
    console.log('abonnee Add succes');

}

//9 Afficher tous les abonnes 

function AfficherTousLesAnonnes() {
    console.log("=== Liste All abonnes ===");
     if(abonnes.length === 0) {
        console.log("not found abonne");
     }else {
        abonnes.forEach(abonne => {
        console.log(`ID : ${abonne.id}, Nom : ${abonne.nom}, prenom : ${abonne.prenom}, email : ${abonne.email}`);
    })
     }

}

//10 Enregistrer un emprunt

function EnregistrerEmprunt() {
    let abonneId = parseInt(prompt("enter id de la abonne :"));
    let id_livre = parseInt(prompt("enter id du livre :"));

    let livre = livres.find(livre => livre.id_livre === id_livre && livre.disponible);
    if(livre) {
        livre.disponible = false;
        let dateEmprunt = new Date().toISOString().split('T')[0];
        emprunts.push({abonneId, id_livre, dateEmprunt});
        console.log("emprunt enregistre avec succes");

    }else{
        console.log("livre not found disponible of emprunt");
    }
}

//11 Enregistre un retour

function EnregistreRetour() {
    let id_livre = parseInt(prompt("enter id livre a retuen :"));
    let livre = livres.find(livre => livre.id_livre === id_livre && !livre.disponible);
    if(livre) {
        livre.disponible = true;
        console.log("retour enreistre  success");
    }else {
        console.log("livre is disponible");
    }


}

//12 Afficher les Livre empruntes par un abonne done 

function AfficherEmpruntsParAbonne() {
    let abonneId = parseInt(prompt("enter id de l abonne :"));
    let empruntAbonne = emprunts.filter(emprunt => emprunt.abonneId === abonneId);
    
    if(empruntAbonne.length === 0) {
        console.log("aucun emprunt pour cet abonne");
    }else{
        console.log("=== liste des livres empruntes par aboone ===");
        empruntAbonne.forEach(emprunt => {
            let livre = livres.find(livre => livre.id_livre === emprunt.id_livre);
            console.log(`ID : ${livre.id_livre}, Titre : ${livre.titre}, Auteur : ${livre.auteur}, Annee : ${livre.annee} `);
        })

    }
}




// Boucle 

let choix;
do {
    choix = menu();

    switch (choix) {
        case "1":
            IntroduireLivre();
            break;
        case "2":
            AjouterPlusieursLivres();
            break;
        case "3":
            AfficherTousLesLivres();
            break;
        case "4":
            TrierLivresParTitre();
            break;
        case "5":
            TrierLivresParAnnee();
            break;
        case "6":
            AfficherLivresDisponibles();
            break;
        case "7":
            RechercherLivreParID();
            break;
        case "8":
            AjouterAbonne();
            break;
        case "9":
            AfficherTousLesAnonnes();
            break;
        case "10":
            EnregistrerEmprunt();
            break;
        case "11":
            EnregistreRetour();
            break;
        case "12" :
            AfficherEmpruntsParAbonne();
            break;
                     
        case "0":
            console.log("GOOD LUCK BYE BYE");
            break;
        default:
            console.log("Choix not found.");
    }

} while (choix !== "0");

