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
        self.create_components()  # Move the creation of components here
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

        self.ticket_detail_label = QtWidgets.QLabel()
        self.ticket_detail_label.setAlignment(QtCore.Qt.AlignCenter)

        self.attribute_button = QtWidgets.QPushButton("S'attribuer le ticket")
        self.attribute_button.clicked.connect(self.attribute_ticket)
        self.attribute_button.hide()
        self.style_button(self.attribute_button)

        self.back_button = QtWidgets.QPushButton("Retour à la liste")
        self.back_button.clicked.connect(self.back_to_list)
        self.back_button.hide()
        self.style_button(self.back_button)

        self.complete_button = QtWidgets.QPushButton("Ticket terminé")  # Bouton pour terminer le ticket
        self.complete_button.clicked.connect(self.complete_ticket)
        self.complete_button.hide()
        self.style_button(self.complete_button)

        self.header_label = QtWidgets.QLabel("Liste des tickets")
        self.header_label.setAlignment(QtCore.Qt.AlignCenter)
        self.header_label.setStyleSheet(
            "background-color: #ADD8E6; color: #FFFFFF; font-size: 20px; padding: 10px 0; margin: 0;")

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)

        # Ajouter le bouton "Ticket terminé" en haut de la page
        self.layout.addWidget(self.complete_button)

        # Ajouter l'en-tête à la mise en page
        self.layout.addWidget(self.header_label)

        # Créer le reste de l'interface utilisateur
        self.layout.addWidget(self.table)
        self.layout.addWidget(self.ticket_detail_label)
        self.layout.addWidget(self.attribute_button)

        # Vérifier si self.response_text n'est pas None avant de l'ajouter à la mise en page
        if self.response_text is not None:
            self.layout.addWidget(self.response_text)  # Ajout du champ de réponse

        # Vérifier si self.send_button n'est pas None avant de l'ajouter à la mise en page
        if self.send_button is not None:
            self.layout.addWidget(self.send_button)  # Ajout du bouton d'envoi

        self.layout.addWidget(self.back_button)  # Mettre le bouton "Retour à la liste" en dernier
        self.layout.addWidget(self.logout_button, alignment=QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)

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
            self.style_button(examine_button)
            self.table.setCellWidget(row, 4, examine_button)

    def hide_home_title(self):
        pass

    def examine_ticket(self, ticket_id):
        # Cacher le bouton "Logout"
        self.hide_logout_button()

        # Cacher l'en-tête
        self.header_label.hide()

        response_ticket = requests.get(f'http://localhost:3000/ticket/{ticket_id}', cookies=self.cookies)
        if response_ticket.status_code == 200:
            ticket_data = response_ticket.json()
            user_id = ticket_data.get("id_user", "")
            response_user = requests.get(f'http://localhost:3000/user?id={user_id}', cookies=self.cookies)
            if response_user.status_code == 200:
                user_data = response_user.json().get("users", {})
                user_email = user_data.get('email', '')  # Récupérer l'e-mail de l'utilisateur
                self.user_email = user_email  # Ajout de cette ligne
                ticket_info = f"<h2>{ticket_data.get('title', '')}</h2>"
                ticket_info += f"<p><strong>Message :</strong> {ticket_data.get('message', '')}</p>"
                ticket_info += f"<p><strong>Date de création :</strong> {ticket_data.get('date_creation', '')}</p>"
                ticket_info += f"<p><strong>Nom de l'utilisateur :</strong> {user_data.get('first_name', '')} {user_data.get('last_name', '')}</p>"
                ticket_info += f"<p><strong>Email de l'utilisateur :</strong> {user_email}</p>"

                self.ticket_detail_label.setText(ticket_info)

                self.table.hide()
                self.ticket_detail_label.show()
                self.back_button.show()

                if ticket_data.get("status") == 0:
                    self.attribute_button.show()
                else:
                    self.attribute_button.hide()

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
                    self.style_button(self.send_button)
                    self.layout.addWidget(self.send_button)

                    self.complete_button.show()
        else:
            print("Erreur.", response_ticket.status_code)

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
                self.back_to_list()
            else:
                print("Erreur lors de l'incrémentation du statut du ticket.")
        else:
            print("Erreur lors de l'ajout de la réponse au ticket.")

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
        self.hide_response_label()

        self.initialize_home()
        # Afficher le bouton "Logout"
        self.show_logout_button()

        # Afficher l'en-tête
        self.header_label.show()

    def hide_response_label(self):
        for i in reversed(range(self.layout.count())):
            widget = self.layout.itemAt(i).widget()
            if widget and isinstance(widget, QtWidgets.QLabel) and widget.text() == "Message à envoyer pour répondre au ticket":
                widget.hide()
                break

    def remove_response_elements(self):
        if hasattr(self, 'response_text') and self.response_text:
            self.response_text.hide()
            del self.response_text
        if hasattr(self, 'send_button') and self.send_button:
            self.send_button.hide()
            del self.send_button

    def logout(self):
        with open("token.txt", "w") as file:
            file.write("")
        self.close()
        sys.exit()

    def hide_logout_button(self):
        self.logout_button.hide()

    def show_logout_button(self):
        self.logout_button.show()

    def style_button(self, button):
        button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        button.setStyleSheet("QPushButton {font-size: 14px; background-color: #ADD8E6; color: #000000; padding: 5px 10px;} QPushButton:hover {background-color: #87CEFA; color: #000000;}")

    def center_widgets(self):
        for i in range(self.layout.count()):
            widget = self.layout.itemAt(i).widget()
            if isinstance(widget, QtWidgets.QLineEdit):
                widget.setAlignment(QtCore.Qt.AlignCenter)
                widget.setMaximumWidth(self.width() // 2)
                break

    def resizeEvent(self, event):
        super().resizeEvent(event)
        self.center_widgets()
