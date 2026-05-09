import LigneBus from './ligneBus';
import './listeLignes.css';
function listeLignes ({lignes}){
return (
< div className = "liste-lignes">
< h2 className="liste-titre">Lignes Dakar Dem Dikk</h2>
<p className="liste-description">
{lignes.length} lignes disponibles
</p>
{lignes.map(ligne => (
<LigneBus
key={ligne.id}
nom={ligne.nom}
arrets={ligne.arrets}
couleur={ligne.couleur}
/>
))}
</div>
);
}
export default listeLignes;