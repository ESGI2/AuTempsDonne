from tkinter import Frame

class BasePage(Frame):
    def __init__(self, parent, *args, **kwargs):
        super().__init__(parent, *args, **kwargs)
        self.parent = parent

    def setup_ui(self):
        raise NotImplementedError("setup_ui method must be implemented in subclasses")
