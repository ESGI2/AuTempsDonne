import sys
from PySide6 import QtWidgets
from connection import ConnectionPage
from home import HomePage
from constante import WIDTH, HEIGHT, NAME

class App:
    app: QtWidgets.QApplication
    windowConnection: ConnectionPage
    windowsHome: HomePage

    def __init__(self):
        self.app = QtWidgets.QApplication([])
        self.windowConnection = ConnectionPage()
        self.windowConnection.setWindowTitle(NAME)
        self.windowConnection.resize(WIDTH / 3, HEIGHT / 2)
        self.windowConnection.show()
        sys.exit(self.app.exec())

    def login_success(self):
        self.windowsHome = HomePage()
        self.windowsHome.setWindowTitle(NAME)
        self.windowsHome.resize(WIDTH, HEIGHT)
        self.windowsHome.show()
        self.windowConnection.close()

if __name__ == "__main__":
    App()
