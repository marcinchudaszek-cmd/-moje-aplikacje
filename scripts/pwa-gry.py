"""Dokłada manifest PWA i ikony grom, które ich nie mają (Darts Master,
Tetris, Kółko i Krzyżyk). Asteroids i Solitaire mają własne — nie ruszamy.

Ikony biorę z img/hi-res/<gra>-icon.png (512 px, oryginały sprzed
zmniejszenia na potrzeby kart na stronie).

Android przycina ikonę do kształtu launchera, więc oprócz zwykłej powstaje
wersja "maskable": znak w bezpiecznym polu, tło na całą powierzchnię.

Uruchom:  python scripts/pwa-gry.py
"""
import json
import os

from PIL import Image, ImageFilter

ROOT = r"C:\Users\marci\Desktop\Projekty\moje-aplikacje-strona"

GRY = {
    "darts-master": {
        "name": "Darts Master",
        "short_name": "Darts",
        "description": "Rzutki 501 i 301 z celowaniem palcem i miernikiem mocy.",
        "theme": "#0b0f19",
        "bg": "#0b0f19",
    },
    "tetris": {
        "name": "Tetris — Beagle Apps Studio",
        "short_name": "Tetris",
        "description": "Tetris z obrotami SRS, podglądem następnych klocków i odkładaniem.",
        "theme": "#0b1120",
        "bg": "#0b1120",
    },
    "tic-tac-toe": {
        "name": "Kółko i Krzyżyk",
        "short_name": "Kółko i X",
        "description": "Cztery tryby i przeciwnik komputerowy na trzech poziomach.",
        "theme": "#0b1120",
        "bg": "#0b1120",
    },
}


def tlo_ikony(im: Image.Image, rozmiar: int) -> Image.Image:
    """Tło maskable: rozmyte powiększenie samej ikony, żeby kolor pasował do
    grafiki, a rogi nie były puste po przycięciu przez launcher."""
    duze = im.resize((rozmiar, rozmiar), Image.LANCZOS)
    return duze.filter(ImageFilter.GaussianBlur(rozmiar // 12))


for katalog, opis in GRY.items():
    zrodlo = os.path.join(ROOT, "img", "hi-res", katalog + "-icon.png")
    if not os.path.exists(zrodlo):
        zrodlo = os.path.join(ROOT, "img", katalog + "-icon.png")
    cel = os.path.join(ROOT, "games", katalog)

    im = Image.open(zrodlo).convert("RGBA")

    for r in (192, 512):
        im.resize((r, r), Image.LANCZOS).save(
            os.path.join(cel, f"icon-{r}.png"), "PNG", optimize=True
        )

    # maskable: znak na 62% szerokości, reszta to rozmyte tło z tej samej grafiki
    R = 512
    plotno = tlo_ikony(im, R).convert("RGBA")
    znak = im.resize((int(R * 0.62), int(R * 0.62)), Image.LANCZOS)
    plotno.alpha_composite(znak, ((R - znak.width) // 2, (R - znak.height) // 2))
    plotno.convert("RGB").save(
        os.path.join(cel, "icon-maskable-512.png"), "PNG", optimize=True
    )

    manifest = {
        "name": opis["name"],
        "short_name": opis["short_name"],
        "description": opis["description"],
        "lang": "pl",
        "start_url": ".",
        "scope": ".",
        "display": "standalone",
        "orientation": "portrait",
        "background_color": opis["bg"],
        "theme_color": opis["theme"],
        "categories": ["games"],
        "icons": [
            {"src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
            {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
            {
                "src": "icon-maskable-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable",
            },
        ],
    }
    with open(os.path.join(cel, "manifest.json"), "w", encoding="utf8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"{katalog}: manifest.json + icon-192/512 + icon-maskable-512")
