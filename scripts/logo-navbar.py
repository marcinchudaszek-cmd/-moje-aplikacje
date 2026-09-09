"""Buduje poziome logo do navbara i stopki: sam znak (przezroczyste tlo)
plus napis "Beagle / Apps Studio" w wersji na ciemne tlo.

Zrodlo: BeagleAppsStudio-BrandKit\\_generator.py — ten sam kod, ktory
wygenerowal caly komplet grafik marki, wiec znak i paleta sa oryginalne,
nic tu nie jest przerysowywane.

Logo w navbarze bylo wczesniej wklejone w HTML jako base64 113x44 px i
wyswietlane na wysokosci 38 px, czyli na ekranie 2x przegladarka musiala
je powiekszac (potrzebne 196x76). Ten plik ma zapas rozdzielczosci.

Uruchom:  python scripts/logo-navbar.py
"""
import importlib.util
import os

from PIL import Image, ImageDraw

BRANDKIT = r"C:\Users\marci\Desktop\Projekty\BeagleAppsStudio-BrandKit\_generator.py"
CEL = r"C:\Users\marci\Desktop\Projekty\moje-aplikacje-strona\img\logo-navbar.png"
ZNAK = r"C:\Users\marci\Desktop\Projekty\moje-aplikacje-strona\img\znak-beagle.png"

WYSOKOSC = 152          # 4x wysokosci w navbarze (38 px)
ODSTEP = 0.20           # odstep znak-napis, jako ulamek wysokosci znaku

spec = importlib.util.spec_from_file_location("brandkit", BRANDKIT)
bk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bk)      # main() jest pod if __name__, wiec sie nie odpali

# --- znak: glowa beagle'a wycieta z alfa, bez niebieskiego kafelka ---
clean = bk.build_clean()

# W prawy dolny rog kadru glowy wchodzi ikona Google Play — zielony narozniki
# zostawal potem widoczna plamka obok napisu. Zamalowujemy ja fragmentem tla
# z prawej strony karty, dokladnie tak jak robi to build_head() w brand kicie.
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
        # tlo karty to jasny blekit; granat, pomarancz i biel go nie spelniaja
        mp[x, y] = 0 if (b > 140 and r < 60) else 255
znak = src.convert("RGBA")
znak.putalpha(maska.filter(bk.ImageFilter.GaussianBlur(0.8)))
znak = bk.fit(znak, h=WYSOKOSC)
znak = znak.crop(znak.split()[3].getbbox())     # przytnij do samej grafiki

# --- napisy w wersji na ciemne tlo (paleta z BRAND.md) ---
tytul_px = int(WYSOKOSC * 0.46)
f_t = bk.font(bk.F_BOLD, tytul_px)
f_s = bk.font(bk.F_REG, int(tytul_px * 0.52))

pomiar = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
sz_tekstu = int(max(pomiar.textlength(bk.NAME, f_t),
                    pomiar.textlength(bk.TAGLINE, f_s))) + 4
odstep = int(znak.width * ODSTEP)

plotno = Image.new("RGBA", (znak.width + odstep + sz_tekstu, WYSOKOSC), (0, 0, 0, 0))
plotno.alpha_composite(znak, (0, (WYSOKOSC - znak.height) // 2))

d = ImageDraw.Draw(plotno)
tx = znak.width + odstep
blok = tytul_px * 1.34 + tytul_px * 0.62
ty = (WYSOKOSC - blok) / 2
d.text((tx, ty), bk.NAME, font=f_t, fill=bk.WHITE)
d.text((tx, ty + tytul_px * 1.30), bk.TAGLINE, font=f_s, fill=bk.BLUE_L)

plotno = plotno.crop(plotno.split()[3].getbbox())
plotno.save(CEL, "PNG", optimize=True)
print("%s  %dx%d  %d KB" % (os.path.basename(CEL), plotno.width, plotno.height,
                            os.path.getsize(CEL) // 1024))

# --- sam znak, bez napisu: do stopki, gdzie nazwa stoi juz obok jako tekst ---
znak.save(ZNAK, "PNG", optimize=True)
print("%s  %dx%d  %d KB" % (os.path.basename(ZNAK), znak.width, znak.height,
                            os.path.getsize(ZNAK) // 1024))
