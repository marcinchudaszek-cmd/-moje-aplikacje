"""Ikony PWA. Zwykle biore wprost z brand kitu (02-favicon), ale Android
przycina ikone do ksztaltu zaleznego od launchera, wiec potrzebna jest tez
wersja "maskable": znak wysrodkowany w bezpiecznym polu 80%, tlo na cala
powierzchnie, bez zaokraglonych rogow (system zaokragla sam).

Uruchom:  python scripts/pwa-ikony.py
"""
import importlib.util
import os
import shutil

from PIL import Image, ImageDraw

BRANDKIT = r"C:\Users\marci\Desktop\Projekty\BeagleAppsStudio-BrandKit"
ROOT = r"C:\Users\marci\Desktop\Projekty\moje-aplikacje-strona"
IMG = os.path.join(ROOT, "img")

# --- ikony "any": gotowce z brand kitu ---
for zrodlo, cel in (("favicon-192.png", "pwa-192.png"),
                    ("favicon-512.png", "pwa-512.png")):
    shutil.copy2(os.path.join(BRANDKIT, "02-favicon", zrodlo),
                 os.path.join(IMG, cel))
    print("%-22s <- %s  %d KB" % (cel, zrodlo,
                                  os.path.getsize(os.path.join(IMG, cel)) // 1024))

# --- ikona maskable: znak na pelnym tle marki ---
spec = importlib.util.spec_from_file_location(
    "brandkit", os.path.join(BRANDKIT, "_generator.py"))
bk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bk)

clean = bk.build_clean()

# ikona Google Play wchodzi w kadr glowy — zamalowujemy ja jak build_head()
dawca = clean.crop((700, 585, 830, 715))
tmp = clean.copy()
tmp.paste(dawca, (455, 585))
tmp = tmp.filter(bk.ImageFilter.GaussianBlur(5))
m = Image.new("L", clean.size, 0)
ImageDraw.Draw(m).ellipse((445, 575, 595, 725), fill=255)
clean = Image.composite(tmp, clean, m.filter(bk.ImageFilter.GaussianBlur(16)))

src = clean.crop((195, 305, 484, 660)).convert("RGB")
w0, h0 = src.size
maska = Image.new("L", (w0, h0), 0)
sp, mp = src.load(), maska.load()
for y in range(h0):
    for x in range(w0):
        r, g, b = sp[x, y]
        mp[x, y] = 0 if (b > 140 and r < 60) else 255
znak = src.convert("RGBA")
znak.putalpha(maska.filter(bk.ImageFilter.GaussianBlur(0.8)))
znak = znak.crop(znak.split()[3].getbbox())

S = 512
BEZPIECZNE = 0.62          # znak mniejszy niz pole 80%, z zapasem na przyciecie

# Tlo w kolorach kafelka z favicon-512 (probki z naroznikow). Nie uzywam tu
# palety NAVY/NAVY_D, bo granatowy znak zlewalby sie z ciemnym rogiem.
tlo = bk.gradient(S, S, (13, 69, 208), (4, 40, 175), (0, 40, 182), (1, 30, 162))
tlo = bk.glow(tlo, S // 2, int(S * 0.45), int(S * 0.40), colour=(90, 150, 255), alpha=70)

skala = min(S * BEZPIECZNE / znak.width, S * BEZPIECZNE / znak.height)
z = znak.resize((round(znak.width * skala), round(znak.height * skala)), Image.LANCZOS)
tlo.alpha_composite(z, ((S - z.width) // 2, (S - z.height) // 2))

cel = os.path.join(IMG, "pwa-maskable-512.png")
tlo.convert("RGB").save(cel, "PNG", optimize=True)
print("%-22s znak na %d%% szerokosci  %d KB" % (
    "pwa-maskable-512.png", round(BEZPIECZNE * 100), os.path.getsize(cel) // 1024))
