import folium
import sys
import json

def create_map(points):
    # Créer une carte Folium centrée sur le premier point
    m = folium.Map(location=[points[0]['lat'], points[0]['lon']], zoom_start=12)

    # Ajouter un marqueur pour chaque point
    for point in points:
        folium.Marker(location=[point['lat'], point['lon']], popup=point['name']).add_to(m)

    # Créer une liste de coordonnées pour tracer la route
    route_coordinates = [[point['lat'], point['lon']] for point in points]

    # Tracer la route sur la carte
    folium.PolyLine(locations=route_coordinates, color='blue').add_to(m)

    # Enregistrer la carte sous forme de fichier HTML
    m.save('map.html')

    print("Map created successfully")

if __name__ == "__main__":
    # Récupérer les points depuis les arguments de la ligne de commande
    points_json = sys.argv[1]
    points = json.loads(points_json)

    # Créer la carte avec les points donnés
    create_map(points)
