import requests
import sys
from PySide6 import QtCore, QtWidgets, QtGui
from app.get_token import get_token
from constante import WIDTH, HEIGHT

class HomePage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    layout: QtWidgets.QVBoxLayout

    def __init__(self):
        super().__init__()
        self.create_components()
        self.display_element()
        self.setFixedSize(WIDTH, HEIGHT)
        self.initialize_home()

    def initialize_home(self):
        token = get_token()
        if token:
            cookies = {"jwt": token}
            response = requests.get('http://localhost:3000/ticket' , cookies=cookies)
            if response.status_code == 200:
                ticket_data = response.json()
                self.display_ticket_table(ticket_data)
            else:
                print("Erreur.", response.status_code)
        else:
            print("Aucun token trouvé.")

    def create_components(self):
        self.table = QtWidgets.QTableWidget()
        self.table.setColumnCount(5)  # 5 columns: id, title, date_creation, status, action
        self.table.setHorizontalHeaderLabels(["ID", "Titre", "Date de création", "Statut", "Action"])
        self.table.setEditTriggers(QtWidgets.QAbstractItemView.NoEditTriggers)  # Make table non-editable
        self.table.verticalHeader().setVisible(False)  # Hide vertical header

        self.logout_button = QtWidgets.QPushButton("Logout")
        self.logout_button.clicked.connect(self.logout)
        self.logout_button.setFont(QtGui.QFont("Arial", 15))
        self.logout_button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))

        self.title = QtWidgets.QLabel("Home Page",alignment=QtCore.Qt.AlignCenter)
        self.title.setFont(QtGui.QFont("Arial", 20))
        self.title.setAlignment(QtCore.Qt.AlignCenter)

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.table)
        self.layout.addWidget(self.logout_button, alignment=QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)

    def display_ticket_table(self, ticket_data):
        # Filter ticket data to exclude tickets with existing answers
        filtered_data = [ticket for ticket in ticket_data if ticket.get("id_answer") is None]

        self.table.setRowCount(len(filtered_data))
        for row, ticket in enumerate(filtered_data):
            id_item = QtWidgets.QTableWidgetItem(str(ticket["id"]))
            title_item = QtWidgets.QTableWidgetItem(ticket["title"])
            date_item = QtWidgets.QTableWidgetItem(ticket["date_creation"])
            status_item = QtWidgets.QTableWidgetItem(str(ticket["status"]))

            id_item.setFlags(QtCore.Qt.ItemIsEnabled)  # Make items non-editable
            title_item.setFlags(QtCore.Qt.ItemIsEnabled)
            date_item.setFlags(QtCore.Qt.ItemIsEnabled)
            status_item.setFlags(QtCore.Qt.ItemIsEnabled)

            self.table.setItem(row, 0, id_item)
            self.table.setItem(row, 1, title_item)
            self.table.setItem(row, 2, date_item)
            self.table.setItem(row, 3, status_item)

            # Add "Examiner" button in the "Action" column
            examine_button = QtWidgets.QPushButton("Examiner")
            examine_button.clicked.connect(lambda _, r=row: self.examine_ticket(r))  # Pass row index to the slot
            self.table.setCellWidget(row, 4, examine_button)

    def examine_ticket(self, row):
        # Retrieve ticket data for the selected row and perform actions
        ticket_id = int(self.table.item(row, 0).text())
        print(f"Examiner le ticket avec l'ID {ticket_id}")

    def logout(self):
        with open("token.txt", "w") as file:
            file.write("")
        self.close()
        sys.exit()
