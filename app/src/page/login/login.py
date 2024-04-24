from tkinter import *
from ...base_page import BasePage
import requests
import pickle

class LoginPage(BasePage):

    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)
        self.setup_ui()

    def setup_ui(self):
        self.labelTitle = Label(self, text="Panel administrateur ")
        self.labelTitle.pack()

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

                if response.status_code == 200 and 'jwt' in response.cookies:
                    with open('cookie_file.pkl', 'wb') as f:
                        pickle.dump(response.cookies['jwt'], f)
                    data = response.json()
                    if data.get("Role") == "admin":
                        self.parent.show_page("home")
                    else:
                        self.error_label.config(text="Erreur: Vous n'avez pas les permissions nécessaires.")
                elif response.status_code == 404:
                    self.error_label.config(text="Erreur: Email ou mot de passe incorrect")
            except requests.exceptions.RequestException as e:
                self.error_label.config(text="Erreur: Impossible de se connecter au serveur")
        else:
            self.error_label.config(text="Erreur: Veuillez remplir tous les champs")
