Pour voir l'arborescence : 
- Ouvrir un terminal
- Aller dans le bon répertoire :  cd /Volumes/INFOGRAPHIES/wikidata/output/
- Lancer un serveur : python -m SimpleHTTPServer 8000
- Ouvrir un navigateur à l'adresse : http://localhost:8000/

Pour retrouver les données : 
- On peut retrouver la nature d'un élément en allant sur Wikidata. Par exemple, La Grande Vadrouille est décrit sur la page : http://www.wikidata.org/wiki/Q487789. On voit que la propriété p31 ("instance of" en anglais "nature de" en français), décrit La Grande Vadrouille comme un film (Q11424). On peut obtenir le nombre d'éléments décrits comme des films en utilisant l'API. La requête suivante donne l'ensemble des éléments décrits comme des films : http://tools.wmflabs.org/wikidata-todo/autolist.html?q=claim[31%3A10876391]

