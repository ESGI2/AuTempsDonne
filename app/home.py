import sys
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from PySide6 import QtCore, QtWidgets, QtGui

from app.get_token import get_token
from constante import WIDTH, HEIGHT, SMTP_PASSWORD, SMTP_USERNAME


class HomePage(QtWidgets.QWidget):
    layout: QtWidgets.QVBoxLayout

    def __init__(self):
        super().__init__()
        self.setFixedSize(WIDTH, HEIGHT)
        self.attribute_button = None
        self.response_text = None
        self.send_button = None
        self.complete_button = None
        self.reload_button = None  # Ajout du bouton Reload
        self.user_role = None  # Ajout du rôle de l'utilisateur connecté
        self.create_components()  # Déplacez la création des composants ici
        self.display_element()

        self.initialize_home()
        self.layout.setContentsMargins(0, 0, 0, 0)

    def initialize_home(self):
        token = get_token()
        if token:
            self.cookies = {"jwt": token}
            response_user = requests.get('http://localhost:3000/user/me', cookies=self.cookies)
            if response_user.status_code == 200:
                user_data = response_user.json()
                self.user_id = user_data['me']['id']
                self.user_role = user_data['me']['role']  # Récupérer le rôle de l'utilisateur connecté
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

        self.logout_button = QtWidgets.QPushButton("Close")
        self.logout_button.clicked.connect(self.logout)
        self.logout_button.setFont(QtGui.QFont("Arial", 15))
        self.logout_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))

        self.reload_button = QtWidgets.QPushButton("Reload")
        self.reload_button.clicked.connect(self.reload_page)
        self.reload_button.setFont(QtGui.QFont("Arial", 15))
        self.reload_button.setFixedWidth(self.logout_button.width() / 8)
        self.reload_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))

        self.ticket_detail_label = QtWidgets.QLabel()
        self.ticket_detail_label.setAlignment(QtCore.Qt.AlignCenter)

        # Création du bouton "S'attribuer le ticket" avec le style directement ajouté
        self.attribute_button = QtWidgets.QPushButton("S'attribuer le ticket")
        self.attribute_button.clicked.connect(self.attribute_ticket)
        self.attribute_button.hide()
        self.attribute_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.attribute_button.setStyleSheet(
            "QPushButton {background-color: #008CBA; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 12px;} QPushButton:hover {background-color: #00bfff;}")
        self.attribute_button.setMinimumHeight(30)

        # Autres boutons
        self.back_button = QtWidgets.QPushButton("Retour à la liste")
        self.back_button.clicked.connect(self.back_to_list)
        self.back_button.hide()
        self.back_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.back_button.setStyleSheet(
            "QPushButton {background-color: #008CBA; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 12px;} QPushButton:hover {background-color: #00bfff;}")
        self.back_button.setMinimumHeight(30)

        self.complete_button = QtWidgets.QPushButton("Ticket terminé")
        self.complete_button.clicked.connect(self.complete_ticket)
        self.complete_button.hide()
        self.complete_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.complete_button.setStyleSheet(
            "QPushButton {background-color: #008CBA; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 12px;} QPushButton:hover {background-color: #00bfff;}")
        self.complete_button.setMinimumHeight(30)

        self.header_label = QtWidgets.QLabel("Liste des tickets")
        self.header_label.setAlignment(QtCore.Qt.AlignCenter)
        self.header_label.setStyleSheet(
            "background-color: #ADD8E6; color: #FFFFFF; font-size: 20px; padding: 10px 0; margin: 0;")

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)

        # Ajouter l'en-tête à la mise en page
        self.layout.addWidget(self.header_label)

        # Créer le reste de l'interface utilisateur
        self.layout.addWidget(self.table)
        self.layout.addWidget(self.ticket_detail_label)
        self.layout.addWidget(self.attribute_button)
        self.layout.addWidget(self.complete_button)
        self.layout.addWidget(self.back_button)
        self.layout.addWidget(self.reload_button)
        self.layout.addWidget(self.logout_button, alignment=QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)

    def display_ticket_table(self, ticket_data):
        if self.user_role == "admin":
            display_data = ticket_data
        elif self.user_role == "responsable":
            display_data = [ticket for ticket in ticket_data if
                            ticket.get("id_answer") == self.user_id and ticket.get("status") == 1]
        else:
            display_data = [ticket for ticket in ticket_data if ticket.get("status") != 2]

        self.table.setRowCount(len(display_data))
        for row, ticket in enumerate(display_data):
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
            examine_button.clicked.connect(lambda _, r=row: self.examine_ticket(display_data[r]["id"]))
            examine_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
            examine_button.setStyleSheet(
                "QPushButton {background-color: #008CBA; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 12px;} QPushButton:hover {background-color: #00bfff;}")
            self.table.setCellWidget(row, 4, examine_button)

    def hide_home_title(self):
        pass

    def examine_ticket(self, ticket_id):
        # Cacher le bouton "Logout"
        self.hide_logout_button()

        # Cacher l'en-tête
        self.header_label.hide()

        # Cacher le bouton "Reload"
        self.reload_button.hide()

        response_ticket = requests.get(f'http://localhost:3000/ticket/{ticket_id}', cookies=self.cookies)
        if response_ticket.status_code == 200:
            ticket_data = response_ticket.json()
            user_id = ticket_data.get("id_user", "")
            response_user = requests.get(f'http://localhost:3000/user?id={user_id}', cookies=self.cookies)
            if response_user.status_code == 200:
                user_data = response_user.json().get("users", {})
                user_email = user_data.get('email', '')
                self.user_email = user_email
                ticket_info = f"<h2>{ticket_data.get('title', '')}</h2>"
                ticket_info += f"<p><strong>Message :</strong> {ticket_data.get('message', '')}</p>"
                ticket_info += f"<p><strong>Date de création :</strong> {ticket_data.get('date_creation', '')}</p>"
                ticket_info += f"<p><strong>Nom de l'utilisateur :</strong> {user_data.get('first_name', '')} {user_data.get('last_name', '')}</p>"
                ticket_info += f"<p><strong>Email de l'utilisateur :</strong> {user_email}</p>"

                self.ticket_detail_label.setText(ticket_info)

                self.table.hide()
                self.ticket_detail_label.show()
                self.back_button.show()

                if ticket_data.get("status") == 0 and self.user_role == "admin":
                    self.display_user_dropdown()

                if ticket_data.get("status") == 1:
                    response_label = QtWidgets.QLabel("Message à envoyer pour répondre au ticket")
                    response_label.setAlignment(QtCore.Qt.AlignCenter)
                    response_label.setStyleSheet("QLabel {font-size: 14px;}")
                    self.layout.addWidget(response_label)

                    self.response_text = QtWidgets.QLineEdit()
                    self.response_text.setAlignment(QtCore.Qt.AlignCenter)
                    self.response_text.setMaximumHeight(30)
                    self.response_text.setStyleSheet("QLineEdit {font-size: 14px;}")
                    self.layout.addWidget(self.response_text)

                    self.send_button = QtWidgets.QPushButton("Envoyer")
                    self.send_button.clicked.connect(self.send_response)
                    self.send_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
                    self.send_button.setStyleSheet(
                        "QPushButton {background-color: #008CBA; color: white; border: none; border-radius: 5px; padding: 5px 10px; font-size: 12px;} QPushButton:hover {background-color: #00bfff;}")
                    self.layout.addWidget(self.send_button)

                    self.complete_button.show()
                else:
                    self.complete_button.hide()
        else:
            print("Erreur.", response_ticket.status_code)

    def display_user_dropdown(self):
        response_users = requests.get('http://localhost:3000/user', cookies=self.cookies)
        if response_users.status_code == 200:
            user_data = response_users.json().get("users", [])
            admin_users = [user for user in user_data if user["role"] in ["admin", "responsable"]]
            if admin_users:
                dropdown = QtWidgets.QComboBox()
                dropdown.addItem("Sélectionnez un utilisateur")
                for user in admin_users:
                    dropdown.addItem(f"{user['first_name']} {user['last_name']}", user['id'])

                dropdown.currentIndexChanged.connect(self.user_selected)
                self.layout.addWidget(dropdown)

    def user_selected(self, index):
        if index > 0:
            user_id = self.sender().currentData()
            self.selected_user_id = user_id
            self.attribute_button.show()

    def send_response(self):
        if hasattr(self, 'response_text'):
            response = self.response_text.text()
            print("Contenu de la réponse :", response)
            self.send_email(response)
        self.back_to_list()

    def send_email(self, message_content):
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_username = SMTP_USERNAME
        smtp_password = SMTP_PASSWORD

        to_email = self.user_email

        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = to_email
        msg['Subject'] = f"Réponse à votre ticket"

        # Corps de l'e-mail
        message = f"Voici votre réponse au ticket : {message_content}"
        msg.attach(MIMEText(message, 'plain'))

        # Connexion au serveur SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        # Envoi de l'e-mail
        server.send_message(msg)
        server.quit()

        print("E-mail envoyé avec succès.")

    def attribute_ticket(self):
        if hasattr(self, 'selected_user_id'):
            ticket_id = self.table.item(self.table.currentRow(), 0).text()

            add_answer_url = 'http://localhost:3000/ticket/add-answer'
            add_answer_payload = {"ticketId": ticket_id, "userId": self.selected_user_id}
            add_answer_response = requests.post(add_answer_url, json=add_answer_payload, cookies=self.cookies)

            if add_answer_response.status_code == 200:
                print("Réponse ajoutée avec succès.")
                increment_status_url = f'http://localhost:3000/ticket/increment-status/{ticket_id}'
                increment_status_response = requests.put(increment_status_url, cookies=self.cookies)

                if increment_status_response.status_code == 200:
                    print("Statut du ticket incrementé avec succès.")
                    self.back_to_list()
                    self.remove_dropdown()  # Supprimer la liste déroulante après l'attribution du ticket
                else:
                    print("Erreur lors de l'incrémentation du statut du ticket.")
            else:
                print("Erreur lors de l'ajout de la réponse au ticket.")
        else:
            print("Utilisateur sélectionné non trouvé.")

    def remove_dropdown(self):
        for i in reversed(range(self.layout.count())):
            widget = self.layout.itemAt(i).widget()
            if isinstance(widget, QtWidgets.QComboBox):
                widget.deleteLater()
                del widget

    def complete_ticket(self):
        # Récupérer l'ID du ticket
        selected_row = self.table.currentRow()
        ticket_id_item = self.table.item(selected_row, 0)
        ticket_id = int(ticket_id_item.text())

        increment_status_url = f'http://localhost:3000/ticket/increment-status/{ticket_id}'
        increment_status_response = requests.put(increment_status_url, cookies=self.cookies)

        if increment_status_response.status_code == 200:
            print("Statut du ticket mis à jour avec succès.")
            self.back_to_list()
        else:
            print("Erreur lors de la mise à jour du statut du ticket.")

    def back_to_list(self):
        self.table.clearContents()
        self.table.setRowCount(0)
        self.table.show()
        self.ticket_detail_label.clear()
        self.ticket_detail_label.hide()
        self.attribute_button.hide()
        self.back_button.hide()
        self.complete_button.hide()
        self.remove_response_elements()
        self.hide_response_label()  # Assurez-vous que le label est caché
        self.show_logout_button()
        self.header_label.show()
        self.reload_button.show()
        self.initialize_home()
        self.remove_dropdown()
        self.send_button = None  # Réinitialisez l'état du bouton d'envoi de la réponse au ticket
        self.response_text = None  # Réinitialisez l'état du champ de texte de la réponse au ticket

    def hide_response_label(self):
        for i in reversed(range(self.layout.count())):
            widget = self.layout.itemAt(i).widget()
            if widget and isinstance(widget, QtWidgets.QLabel) and widget.text() == "Message à envoyer pour répondre au ticket":
                widget.hide()
                break

    def remove_response_elements(self):
        if self.response_text is not None:
            self.response_text.deleteLater()
            del self.response_text
        if self.send_button is not None:
            self.send_button.deleteLater()
            del self.send_button

    def reload_page(self):
        self.back_to_list()

    def logout(self):
        self.close()
        sys.exit()

    def hide_logout_button(self):
        self.logout_button.hide()

    def show_logout_button(self):
        self.logout_button.show()
