import requests
from PySide6 import QtCore, QtWidgets, QtGui
from home import HomePage
from constante import WIDTH, HEIGHT


class ConnectionPage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    label_email: QtWidgets.QLabel
    label_password: QtWidgets.QLabel
    button: QtWidgets.QPushButton
    layout: QtWidgets.QVBoxLayout
    input_email: QtWidgets.QLineEdit
    input_password: QtWidgets.QLineEdit
    msg_error_field: QtWidgets.QLabel
    msg_error_connection: QtWidgets.QLabel

    def __init__(self):
        super().__init__()
        self.create_components()
        self.design()
        self.display_element()

    def create_components(self):
        self.title = QtWidgets.QLabel("Connection Page",
                                      alignment=QtCore.Qt.AlignCenter)
        self.label_email = QtWidgets.QLabel("Email")
        self.label_password = QtWidgets.QLabel("Password")
        self.input_email = QtWidgets.QLineEdit()
        self.input_password = QtWidgets.QLineEdit()
        self.input_password.setEchoMode(QtWidgets.QLineEdit.Password)
        self.button = QtWidgets.QPushButton("Login")
        self.button.clicked.connect(self.test_connection)
        self.msg_error_field = QtWidgets.QLabel("Please fill all fields")
        self.msg_error_field.hide()
        self.msg_error_connection = QtWidgets.QLabel("Connection error")
        self.msg_error_connection.hide()

    def design(self):
        self.title.setFont(QtGui.QFont("Arial", 20))
        self.title.setAlignment(QtCore.Qt.AlignCenter)
        self.label_email.setFont(QtGui.QFont("Arial", 15))
        self.label_password.setFont(QtGui.QFont("Arial", 15))
        self.input_email.setFont(QtGui.QFont("Arial", 15))
        self.input_email.setFixedSize(500, 50)
        self.input_password.setFont(QtGui.QFont("Arial", 15))
        self.input_password.setFixedSize(500, 50)
        self.button.setFont(QtGui.QFont("Arial", 15))
        self.button.setFixedSize(500, 50)
        self.button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.msg_error_field.setFont(QtGui.QFont("Arial", 15))
        self.msg_error_field.setAlignment(QtCore.Qt.AlignCenter)
        self.msg_error_field.setStyleSheet("color: red")
        self.msg_error_connection.setFont(QtGui.QFont("Arial", 15))
        self.msg_error_connection.setAlignment(QtCore.Qt.AlignCenter)
        self.msg_error_connection.setStyleSheet("color: red")

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.msg_error_field)
        self.layout.addWidget(self.msg_error_connection)
        self.layout.addWidget(self.label_email)
        self.layout.addWidget(self.input_email)
        self.layout.addWidget(self.label_password)
        self.layout.addWidget(self.input_password)
        self.layout.addWidget(self.button)

    def test_connection(self):
        self.msg_error_field.hide()
        self.msg_error_connection.hide()
        if self.input_email.text() == "" or self.input_password.text() == "":
            self.msg_error_field.show()
            return

        response = requests.post("http://autempsdonne.site:3000/login", json={"email": self.input_email.text(), "password": self.input_password.text()})

        if response.status_code == 200  :

            cookie = response.cookies.get('jwt')
            with open('token.txt', 'w') as file:
                file.write(cookie)
            home = HomePage()
            self.title.hide()
            self.label_email.hide()
            self.label_password.hide()
            self.input_email.hide()
            self.input_password.hide()
            self.button.hide()
            self.msg_error_field.hide()
            self.msg_error_connection.hide()
            self.resize(WIDTH, HEIGHT)
            self.layout.addWidget(home)
        else:
            self.msg_error_connection.show()
