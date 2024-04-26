import sys

from PySide6 import QtCore, QtWidgets, QtGui
from constante import WIDTH, HEIGHT

class HomePage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    layout: QtWidgets.QVBoxLayout

    def __init__(self):
        super().__init__()
        self.create_components()
        self.display_element()
        self.setFixedSize(WIDTH, HEIGHT)  # Définir la taille de la page d'accueil

    def create_components(self):
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
        self.layout.addWidget(self.logout_button, alignment=QtCore.Qt.AlignLeft | QtCore.Qt.AlignBottom)

    def logout(self):
        #with open("token.txt", "w") as file:
        #    file.write("")
        self.close()
        sys.exit()
