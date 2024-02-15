# AuTempsDonne

Pour setup le projet :

``git clone https://github.com/ESGI2/AuTempsDonne.git``

Faire la commande ``npm install`` dans le dossier api & front

Cela va venir crée les dépendances de chaque parti du projet

Dans le dossier ./api crée un fichier **env** et le remplir comme ci-dessous :

````
DB_HOST="votre_host"
DB_USER="votre_user"
DB_PASS="votre_password"
DB_NAME="atd_api"
DB_DIALECT="mysql"
ACCESS_TOKEN_SECRET=9964cfe109c61a8b6acdcd9aaf0408e43b97cc7e487b5c6187bccd1b40b1e6184f46a26f6844e3a2d5a1a18a2be868eb2b4d95c21aef2bacb799c2e36b31f2d4
REFRESH_TOKEN_SECRET=1351d41ccbe877dead82876326cb3679f20b334cc0c169703e41fcb4c5d8c249578dbd4890371b6bd0ab714904fbd4a2580a51654ce48916accbc2c3c8e391d6
````

Dans le terminal API & front ``npm start``