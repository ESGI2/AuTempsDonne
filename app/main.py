from tkinter import Tk
from src.page.login.login import LoginPage
from src.page.home.home import HomePage

class Application(Tk):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.title("AU TEMPS DONNE TICKETING")
        self.geometry("600x400")
        self.minsize(400, 200)
        self.maxsize(800, 400)

        self.pages = {}
        self.current_page = None

        # Ajouter toutes les pages disponibles
        self.add_page("login", LoginPage)
        self.add_page("home", HomePage)

        # Afficher la page de connexion par défaut lors du lancement
        self.show_page("login")

    def add_page(self, name, page_class):
        page = page_class(self)
        self.pages[name] = page

    def show_page(self, name):
        if self.current_page:
            self.current_page.pack_forget()
        self.current_page = self.pages[name]
        self.current_page.pack()

if __name__ == "__main__":
    app = Application()
    app.mainloop()
