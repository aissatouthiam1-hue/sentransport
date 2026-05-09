function statreseau({ lignes }) {
const totalLignes = lignes.length;

const totalArrets = lignes.reduce(
(sum, ligne) => sum + ligne.arrets,
0
);

const ligneMax = lignes.reduce((max, ligne) =>
ligne.arrets > max.arrets ? ligne : max
);

return (
<div className="stats">
<h2>Statistiques du réseau</h2>
<p>Nombre total de lignes : {totalLignes}</p>
<p>Nombre total d'arrêts : {totalArrets}</p>
<p>
Ligne la plus grande : {ligneMax.nom} ({ligneMax.arrets} arrêts)
</p>
</div>
);
}

export default statreseau;