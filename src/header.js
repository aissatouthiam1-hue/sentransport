import './header.css';

function header() {
// On crée la variable pour la date
const date = new Date().toLocaleDateString('fr-FR');

return (
<header>
<h1>SenTransport</h1>

<p>
Votre guide du transport en commun a Dakar
</p>

<p>{date}</p>
</header>
);
}

export default header;