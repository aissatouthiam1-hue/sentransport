import { useState, useEffect } from 'react';
import './App.css';
import Header from './header';
import Recherche from './recherche';
import LigneBus from './ligneBus';
import DetailLigne from './detailligne';
import Footer from './footer';

function App() {
const [recherche, setRecherche] = useState("");
const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
const [nbRecherches, setNbRecherches] = useState(0); // Exo 3

const [lignes, setLignes] = useState([]);
const [chargement, setChargement] = useState(true);
const [erreur, setErreur] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/lignes")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur serveur : " + response.status);
      }
      return response.json();
    })
    .then(data => {
      setLignes(data);
      setChargement(false);
    })
    .catch(error => {
      setErreur(error.message);
      setChargement(false);
    });
}, []); // ⚠️ Ne pas oublier le [] !

const lignesFiltrees = lignes.filter(l =>
l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
l.numero.includes(recherche)
);

// Exo 3 — onChange qui incrémente le compteur
function handleRecherche(val) {
setRecherche(val);
setNbRecherches(n => n + 1);
}

function handleClickLigne(ligne) {
if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
setLigneSelectionnee(null);
} else {
setLigneSelectionnee(ligne);
}
}
if (chargement) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p className="message-chargement">Chargement des lignes...</p>
      </main>
    </div>
  );
}

if (erreur) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <div className="message-erreur">
          <p>Impossible de charger les lignes.</p>
          <p className="erreur-detail">{erreur}</p>
          <p>Vérifiez que le serveur Flask est lancé (python api/app.py).</p>
        </div>
      </main>
    </div>
  );
}

return ( // ton return habituel, inchangé

<div className="App">
<Header />
<main className="contenu">

{/* Exo 3 — Compteur de recherches */}
<p className="compteur-recherches">
Vous avez effectué {nbRecherches} recherche{nbRecherches > 1 ? 's' : ''}
</p>

{/* Exo 1 — Bouton effacer intégré dans Recherche */}
<Recherche valeur={recherche} onChange={handleRecherche} />

<p className="resultat-recherche">
{lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
</p>

{/* Exo 2 — Message aucune ligne */}
{lignesFiltrees.length === 0 && (
<p className="aucune-ligne">
Aucune ligne trouvée pour "{recherche}"
</p>
)}

{lignesFiltrees.map(ligne => (
<LigneBus
key={ligne.id}
numero={ligne.numero}
depart={ligne.depart}
arrivee={ligne.arrivee}
arrets={ligne.arrets}
estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
onClick={() => handleClickLigne(ligne)}
/>
))}

{ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}

</main>
<Footer />
</div>
);
}

export default App;