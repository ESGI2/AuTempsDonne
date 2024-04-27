import sys
import requests
from PySide6 import QtCore, QtWidgets, QtGui
from app.get_token import get_token
from constante import WIDTH, HEIGHT

class HomePage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    layout: QtWidgets.QVBoxLayout

    def __init__(self):
        super().__init__()
        self.attribute_button = None
        self.create_components()
        self.display_element()
        self.setFixedSize(WIDTH, HEIGHT)
        self.initialize_home()

    def initialize_home(self):
        token = get_token()
        if token:
            self.cookies = {"jwt": token}
            response_user = requests.get('http://localhost:3000/user/me', cookies=self.cookies)
            if response_user.status_code == 200:
                user_data = response_user.json()
                self.user_id = user_data['me']['id']
                response = requests.get('http://localhost:3000/ticket', cookies=self.cookies)
                if response.status_code == 200:
                    ticket_data = response.json()
                    self.display_ticket_table(ticket_data)
                else:
                    print("Erreur.", response.status_code)
            else:
                print("Erreur lors de la récupération des informations de l'utilisateur.")
        else:
            print("Aucun token trouvé.")

    def create_components(self):
        self.table = QtWidgets.QTableWidget()
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels(["ID", "Titre", "Date de création", "Statut", "Action"])
        self.table.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)
        self.table.verticalHeader().setVisible(False)

        self.logout_button = QtWidgets.QPushButton("Logout")
        self.logout_button.clicked.connect(self.logout)
        self.logout_button.setFont(QtGui.QFont("Arial", 15))
        self.logout_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))

        self.title = QtWidgets.QLabel("Home Page", alignment=QtCore.Qt.AlignCenter)
        self.title.setFont(QtGui.QFont("Arial", 20))
        self.title.setAlignment(QtCore.Qt.AlignCenter)

        self.ticket_detail_label = QtWidgets.QLabel()
        self.ticket_detail_label.setAlignment(QtCore.Qt.AlignCenter)

        self.attribute_button = QtWidgets.QPushButton("S'attribué le ticket")
        self.attribute_button.clicked.connect(self.attribute_ticket)
        self.attribute_button.hide()

        self.back_button = QtWidgets.QPushButton("Retour à la liste")
        self.back_button.clicked.connect(self.back_to_list)
        self.back_button.hide()

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.table)
        self.layout.addWidget(self.logout_button, alignment=QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)
        self.layout.addWidget(self.ticket_detail_label)
        self.layout.addWidget(self.attribute_button)
        self.layout.addWidget(self.back_button)

    def display_ticket_table(self, ticket_data):
        # Filtrer les données pour exclure les tickets avec un statut de 2
        filtered_data = [ticket for ticket in ticket_data if
                         ticket.get("id_answer") is None or str(ticket.get("id_answer")) == str(
                             self.user_id) and ticket.get("status") != 2]

        # Trier les données pour mettre en premier les tickets avec un statut de 1
        sorted_data = sorted(filtered_data, key=lambda x: x.get("status") == 1, reverse=True)

        self.table.setRowCount(len(sorted_data))
        for row, ticket in enumerate(sorted_data):
            id_item = QtWidgets.QTableWidgetItem(str(ticket["id"]))
            title_item = QtWidgets.QTableWidgetItem(ticket["title"])
            date_item = QtWidgets.QTableWidgetItem(ticket["date_creation"])
            status_item = QtWidgets.QTableWidgetItem()

            id_item.setFlags(QtCore.Qt.ItemIsEnabled)
            title_item.setFlags(QtCore.Qt.ItemIsEnabled)
            date_item.setFlags(QtCore.Qt.ItemIsEnabled)
            status_item.setFlags(QtCore.Qt.ItemIsEnabled)

            status_value = ticket["status"]
            if status_value == 0:
                status_text = "À traiter"
            elif status_value == 1:
                status_text = "En cours"
            else:
                status_text = "Terminé"

            status_item.setText(status_text)

            self.table.setItem(row, 0, id_item)
            self.table.setItem(row, 1, title_item)
            self.table.setItem(row, 2, date_item)
            self.table.setItem(row, 3, status_item)

            # Add "Examiner" button in the "Action" column
            examine_button = QtWidgets.QPushButton("Examiner")
            examine_button.clicked.connect(lambda _, r=row: self.examine_ticket(sorted_data[r]["id"]))
            self.table.setCellWidget(row, 4, examine_button)

    def examine_ticket(self, ticket_id):
        response_ticket = requests.get(f'http://localhost:3000/ticket/{ticket_id}', cookies=self.cookies)
        if response_ticket.status_code == 200:
            ticket_data = response_ticket.json()
            user_id = ticket_data.get("id_user", "")
            response_user = requests.get(f'http://localhost:3000/user?id={user_id}', cookies=self.cookies)
            if response_user.status_code == 200:
                user_data = response_user.json().get("users", {})
                ticket_info = f"<h2>{ticket_data.get('title', '')}</h2>"
                ticket_info += f"<p><strong>Message :</strong> {ticket_data.get('message', '')}</p>"
                ticket_info += f"<p><strong>Date de création :</strong> {ticket_data.get('date_creation', '')}</p>"
                ticket_info += f"<p><strong>Nom de l'utilisateur :</strong> {user_data.get('first_name', '')} {user_data.get('last_name', '')}</p>"
                ticket_info += f"<p><strong>Email de l'utilisateur :</strong> {user_data.get('email', '')}</p>"

                self.ticket_detail_label.setText(ticket_info)

                self.table.hide()
                self.ticket_detail_label.show()
                self.back_button.show()

                if ticket_data.get("status") == 0:
                    self.attribute_button.show()
                else:
                    self.attribute_button.hide()

                self.ticket_detail_label.setStyleSheet("""
                    QLabel {
                        font-size: 16px;
                        color: #333;
                        margin: 20px;
                    }
                    h2 {
                        color: #555;
                        margin-bottom: 10px;
                    }
                    p {
                        margin-bottom: 5px;
                    }
                """)
        else:
            print("Erreur.", response_ticket.status_code)

    def attribute_ticket(self):
        # Récupérer l'ID du ticket
        selected_row = self.table.currentRow()
        ticket_id_item = self.table.item(selected_row, 0)
        ticket_id = int(ticket_id_item.text())

        user_id = self.user_id
        add_answer_url = 'http://localhost:3000/ticket/add-answer'
        add_answer_payload = {"ticketId": ticket_id, "userId": user_id}
        add_answer_response = requests.post(add_answer_url, json=add_answer_payload, cookies=self.cookies)

        if add_answer_response.status_code == 200:
            print("Réponse ajoutée avec succès.")
            increment_status_url = f'http://localhost:3000/ticket/increment-status/{ticket_id}'
            increment_status_response = requests.put(increment_status_url, cookies=self.cookies)

            if increment_status_response.status_code == 200:
                print("Statut du ticket incrementé avec succès.")
            else:
                print("Erreur lors de l'incrémentation du statut du ticket.")
        else:
            print("Erreur lors de l'ajout de la réponse au ticket.")


    def back_to_list(self):
        self.table.clearContents()
        self.table.setRowCount(0)
        self.table.show()
        self.ticket_detail_label.clear()
        self.ticket_detail_label.hide()
        self.attribute_button.hide()
        self.back_button.hide()
        self.initialize_home() # Refresh the table

    def logout(self):
        with open("token.txt", "w") as file:
            file.write("")
        self.close()
        sys.exit()
