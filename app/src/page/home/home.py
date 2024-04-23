from tkinter import *
from ...base_page import BasePage

class HomePage(BasePage):

    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)
        self.setup_ui()

    def setup_ui(self):
        self.home_label = Label(self, text="Bienvenue!")
        self.home_label.pack()
