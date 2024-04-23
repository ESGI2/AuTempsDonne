from tkinter import *
from ...base_page import BasePage
import requests

class LoginPage(BasePage):

    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)
        self.setup_ui()

    def setup_ui(self):
        self.label1 = Label(self, text="EMAIL")
        self.label1.pack()

        self.Email = Entry(self)
        self.Email.pack()

        self.label2 = Label(self, text="PASSWORD")
        self.label2.pack()

        self.Password = Entry(self, show="*")
        self.Password.pack()

        self.Submit = Button(self, text="Connecter", command=self.connecter)
        self.Submit.pack()

        self.error_label = Label(self, fg="red")
        self.error_label.pack()
    def connecter(self):
        email = self.Email.get()
        password = self.Password.get()

        if email and password:
            try:
                response = requests.post("http://localhost:3000/login", json={"email": email, "password": password})
                if response.status_code == 200:
                    self.parent.show_page("home")
                else:
                    self.error_label.config(text="Erreur: Connexion échouée")
            except requests.exceptions.RequestException as e:
                self.error_label.config(text="Erreur: Impossible de se connecter au serveur")
        else:
            self.error_label.config(text="Erreur: Veuillez remplir tous les champs")


def test():
    return 5