import random
import tkinter as tk


class SlotMachineApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Slot-Maschine")
        self.credits = 100
        self.symbols = ['🍒', '🍋', '🔔', '⭐', '💎', '🍀']

        # GUI-Elemente
        self.label_credits = tk.Label(root, text=f"Credits: {self.credits}", font=("Arial", 16))
        self.label_credits.pack(pady=10)

        self.reel_labels = [tk.Label(root, text="?", font=("Arial", 32)) for _ in range(3)]
        for label in self.reel_labels:
            label.pack(side=tk.LEFT, padx=10)

        self.result_label = tk.Label(root, text="", font=("Arial", 14), fg="blue")
        self.result_label.pack(pady=10)

        self.button_spin = tk.Button(root, text="Drehen", font=("Arial", 16), command=self.spin)
        self.button_spin.pack(pady=20)

    def spin(self):
        if self.credits <= 0:
            self.result_label.config(text="Keine Credits mehr! Spiel vorbei.", fg="red")
            return

        # Rollen drehen
        reel = [random.choice(self.symbols) for _ in range(3)]
        for i, label in enumerate(self.reel_labels):
            label.config(text=reel[i])

        # Gewinne berechnen
        unique_symbols = set(reel)
        if len(unique_symbols) == 1:  # Alle drei Symbole gleich
            win = 50
            self.result_label.config(text=f"Jackpot! Alle drei Symbole gleich! Du gewinnst {win} Credits!", fg="green")
            self.credits += win
        elif len(unique_symbols) == 2:  # Zwei Symbole gleich
            win = 10
            self.result_label.config(text=f"Zwei gleiche Symbole! Du gewinnst {win} Credits!", fg="green")
            self.credits += win
        else:  # Kein Gewinn
            self.result_label.config(text="Leider nichts gewonnen!", fg="red")
            self.credits -= 10

        # Credits aktualisieren
        self.label_credits.config(text=f"Credits: {self.credits}")

        if self.credits <= 0:
            self.result_label.config(text="Keine Credits mehr! Spiel vorbei.", fg="red")


# Anwendung starten
root = tk.Tk()
app = SlotMachineApp(root)
root.mainloop()
