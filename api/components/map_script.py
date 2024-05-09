import boto3
import sys
import json
import folium

def create_map(points, name):
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
    map_filename = name + '.html'
    m.save(map_filename)

    return map_filename

def upload_to_wasabi(file_path, bucket_name, object_name):
    # Connexion au service Wasabi S3
    s3 = boto3.client('s3',
                      endpoint_url='https://s3.eu-central-1.wasabisys.com',
                      aws_access_key_id='OAD77C2QY8CRH2FG2N9Z',
                      aws_secret_access_key='lHcIiu0TvjQFjLJOjskdp0mZALzHJP6zFRLzMuNy')

    # Upload du fichier vers Wasabi
    with open(file_path, "rb") as f:
        s3.upload_fileobj(f, bucket_name, object_name)

if __name__ == "__main__":
    # Récupérer les points depuis les arguments de la ligne de commande
    points_json = sys.argv[1]
    file_name = sys.argv[2]
    points = json.loads(points_json)

    # Créer la carte avec les points donnés
    map_file = create_map(points, file_name)

    # Spécifier le nom du bucket et le nom de l'objet dans Wasabi
    bucket_name = 'autempsdonne'
    object_name = file_name + '.html'

    # Upload du fichier vers Wasabi dans le dossier /maraude
    upload_to_wasabi(map_file, bucket_name, 'maraude/' + object_name)

    print("Map file uploaded to Wasabi successfully")
