from tkinter import *
from ...base_page import BasePage
from customtkinter import *
import pickle

class HomePage(BasePage):

    def setup_ui(self):
        self.clear_widgets()
        print("aaaaaaa")
        with open('cookie_file.pkl', 'rb') as f:
           cookie = pickle.load(f)

        self.home_label = Label(self, text="Bienvenue!")
        self.home_label.pack()

        self.Unlog = CTkButton(self, text="unlog", command=self.unlog)
        self.Unlog.pack()

    def unlog(self):
        with open('cookie_file.pkl', 'w') as f:
            pass
        if self.parent.current_page.__class__.__name__ != "LoginPage":
            self.parent.show_page("login")