"""Ikony strony: PWA (any + maskable), apple-touch-icon i favikony.

  * pwa-192/512 ("any") i favikony 16/32 + favicon.ico — gotowce z brand kitu
    (02-favicon), czyli kafel ze znakiem z zaokraglonymi rogami,
  * pwa-maskable-512 — Android przycina ikone do ksztaltu launchera, wiec znak
    w bezpiecznym polu, tlo na cala powierzchnie, bez zaokraglen,
  * apple-touch-icon (180) — iOS sam zaokragla rogi i zamienia przezroczystosc
    na czern, wiec pelny kwadrat bez przezroczystosci.

Uruchom:  python scripts/pwa-ikony.py
"""
import importlib.util
import os
import shutil
import sys

from PIL import Image

TU = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(TU, ".."))
BRANDKIT = os.path.normpath(os.path.join(ROOT, "..", "BeagleAppsStudio-BrandKit"))
IMG = os.path.join(ROOT, "img")
FAV = os.path.join(BRANDKIT, "02-favicon")


def kb(p):
    return os.path.getsize(p) // 1024


for zrodlo, cel in (("favicon-192.png", os.path.join(IMG, "pwa-192.png")),
                    ("favicon-512.png", os.path.join(IMG, "pwa-512.png")),
                    ("favicon-16.png", os.path.join(IMG, "favicon-16.png")),
                    ("favicon-32.png", os.path.join(IMG, "favicon-32.png")),
                    ("favicon.ico", os.path.join(ROOT, "favicon.ico"))):
    shutil.copy2(os.path.join(FAV, zrodlo), cel)
    print("%-22s <- %s  %d KB" % (os.path.basename(cel), zrodlo, kb(cel)))

sys.path.insert(0, BRANDKIT)
spec = importlib.util.spec_from_file_location("brandkit", os.path.join(BRANDKIT, "_generator.py"))
bk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bk)

# maskable: bezpieczne pole to kolo o srednicy 80% — znak na 58% z zapasem
cel = os.path.join(IMG, "pwa-maskable-512.png")
bk.build_head(S=2048, wielkosc=0.58, promien=0).resize((512, 512), Image.LANCZOS) \
    .convert("RGB").save(cel, "PNG", optimize=True)
print("%-22s znak na 58%%  %d KB" % ("pwa-maskable-512.png", kb(cel)))

cel = os.path.join(IMG, "apple-touch-icon.png")
bk.build_head(S=1440, wielkosc=0.70, promien=0).resize((180, 180), Image.LANCZOS) \
    .convert("RGB").save(cel, "PNG", optimize=True)
print("%-22s pelny kwadrat  %d KB" % ("apple-touch-icon.png", kb(cel)))
