from tkinter import *
from ...base_page import BasePage
import pickle

class HomePage(BasePage):

    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)
        self.setup_ui()

    def setup_ui(self):
        #with open('cookie_file.pkl', 'rb') as f:
        #    cookie = pickle.load(f)
        #print(cookie)

        self.home_label = Label(self, text="Bienvenue!")
        self.home_label.pack()
