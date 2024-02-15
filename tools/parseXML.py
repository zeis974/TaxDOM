import xml.etree.ElementTree as ET
import json
import os

xml_files = [
    "data/RITA_Nomenclatures_CHP01.xml",
    # "data/RITA_Nomenclatures_CHP02.xml",
    # "data/RITA_Nomenclatures_CHP03.xml",
    # "data/RITA_Nomenclatures_CHP04.xml",
    # "data/RITA_Nomenclatures_CHP05.xml",
]

for xml_file_path in xml_files:
    with open(xml_file_path, 'r') as xml_file:
        xml_data = xml_file.read()

    root = ET.fromstring(xml_data)

    json_output = {}
    current_parent = None
    current_parent_alinea1 = None
    current_parent_alinea2 = None

    for ligne in root.iter('ligne'):
        line_dict = {}
        for child in ligne:
            line_dict[child.tag] = child.text
            print(line_dict[child.tag])

        alinea = int(line_dict.get('Alinea', '-1'))

        if alinea == 0:
            current_parent = line_dict
            json_output[current_parent['Code']] = current_parent
        elif alinea == -1:
            pass
        else:
            if alinea == 1:
                if 'children' not in current_parent:
                    current_parent['children'] = []
                current_parent_alinea1 = line_dict
                current_parent['children'].append(current_parent_alinea1)
            elif alinea == 2:
                if 'children' not in current_parent_alinea1:
                    current_parent_alinea1['children'] = []
                current_parent_alinea2 = line_dict
                current_parent_alinea1['children'].append(current_parent_alinea2)
            elif alinea == 3:
                if 'children' not in current_parent_alinea2:
                    current_parent_alinea2['children'] = []
                current_parent_alinea2['children'].append(line_dict)

    json_file_name = os.path.splitext(os.path.basename(xml_file_path))[0] + ".json"
    json_file_path = os.path.join("..\\apps\\web\\data", json_file_name)

    with open(json_file_path, 'w') as json_file:
        json.dump(json_output, json_file)

    print(f"Fichier JSON '{json_file_name}' enregistré avec succès. ({json_file_path})")
    