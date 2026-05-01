# Beagle Apps Studio — Runbook techniczny

**Wersja:** 1.0
**Data utworzenia:** 1 maja 2026
**Autor:** Marcin Chudaszek (Beagle Apps Studio)

Dokument referencyjny dla ekosystemu aplikacji webowych i TWA publikowanych w domenie `beagleapps.pl` oraz Google Play.

---

## 1. Architektura systemu

### 1.1. Główna domena

- **Domena:** `beagleapps.pl`
- **Rejestrator DNS:** HitMe.pl (panel: `https://panel.hitme.pl/`)
- **Hosting:** GitHub Pages (przez konto `marcinchudaszek-cmd`)

### 1.2. Repozytoria i powiązania

| Aplikacja | Repo GitHub | Subdomena | Package Android | Typ projektu |
|---|---|---|---|---|
| **Portfolio** | `-moje-aplikacje` | `beagleapps.pl` | — | Statyczna strona HTML |
| **PlantCare** | `plantcare` | `plantcare.beagleapps.pl` | `com.beagleappsstudio.plantcare` | Vite + React (build → branch `gh-pages`) |
| **Voyager** | `voyager-travel-planner` | `voyager.beagleapps.pl` | `com.beagleappsstudio.voyager` | Vite + React (GitHub Actions) |
| **Deutsch Lernen** | `deutsch-lernen-gut` | `deutschlernen.beagleapps.pl` | `com.beagleappsstudio.deutschlernen` | Vanilla HTML/JS (deploy z `main`) |

### 1.3. Repozytoria TWA (opakowania Androidowe — osobne foldery na pulpicie)

Każda aplikacja TWA ma osobny lokalny folder z plikami `app-release-bundle.aab`, `twa-manifest.json`, `build.gradle`. Te foldery służą do generowania paczek AAB do publikacji w Google Play Console.

- `plantcare-twa-v2` (lub `twa-plantcare`)
- `twa-voyager`
- `twa-deutsch-lernen` (lub podobnie)

### 1.4. Klucze SHA-256 dla każdej aplikacji

⚠️ **WAŻNE:** Każda aplikacja w Google Play ma DWA klucze: **klucz podpisywania** (Google Play) i **klucz przesyłania** (upload). **Oba muszą być** w `assetlinks.json`.

Klucze pobierasz z:
**Google Play Console → wybierz aplikację → Testuj i publikuj → Konfiguracja → Integralność aplikacji → Podpisywanie aplikacji**

Wartości aktualne na 1 maja 2026:

**PlantCare** (`com.beagleappsstudio.plantcare`):
- Podpisywanie: `91:01:A1:64:5E:39:EC:8A:D4:B8:D5:21:0A:BE:CD:B7:C2:D0:9A:22:06:FE:75:36:92:BE:B8:1A:EA:54:22:1C`
- Przesyłanie: `C6:3B:97:12:77:53:F4:C0:04:88:14:34:B1:0B:51:1A:DC:D1:CD:FE:91:0E:F2:98:C7:A7:86:24:68:C8:2D:6D`

**Voyager** (`com.beagleappsstudio.voyager`):
- Podpisywanie: `73:D4:2A:C2:BA:0B:BE:D8:EA:27:08:C2:5F:67:EF:B9:68:B4:AE:E4:51:F5:F1:FF:4A:FA:9B:60:F2:8D:A1:6C`
- Przesyłanie: `73:AF:E3:A2:C8:EB:4B:B4:5C:44:14:FE:CD:98:34:ED:BE:2E:02:97:C4:E0:3E:98:DB:37:2B:7E:0A:C7:CE:3A`

**Deutsch Lernen** (`com.beagleappsstudio.deutschlernen`):
- Podpisywanie: `DF:DB:FF:CE:78:B1:A3:E6:4E:09:1A:FC:42:DA:8D:8B:92:40:8E:7C:49:8A:B9:A5:1C:BE:73:E5:B8:E4:57:BB`
- Przesyłanie: `92:CC:3A:31:2D:23:99:5D:CA:7D:D9:9A:09:4B:88:96:40:8E:D4:1A:35:FA:92:63:81:32:63:14:B4:D1:FF:7E`

---

## 2. ⛔ CZEGO NIGDY NIE ROBIĆ

### 2.1. Nie klikać "Remove" w Settings → Pages

W GitHubie pod adresem:
```
https://github.com/marcinchudaszek-cmd/<repo>/settings/pages
```

W sekcji **Custom domain** widzisz przycisk **"Remove"**. **NIE KLIKAJ GO!**

**Dlaczego:** Klikniecie "Remove" usuwa custom domain dla repo I usuwa plik CNAME. Może też w lawinowy sposób wpłynąć na inne repo z podobną konfiguracją. Jeśli musisz coś naprawić — zacznij od edycji pliku CNAME przez Git.

### 2.2. Nie używać `Set-Content -Encoding utf8` w PowerShell

⛔ **ZŁA KOMENDA** (dodaje niewidoczny BOM, który Google odrzuca):

```powershell
$content | Set-Content -Path file.json -Encoding utf8
```

✅ **DOBRA KOMENDA** (UTF-8 bez BOM):

```powershell
[System.IO.File]::WriteAllText("$pwd\file.json", $content, (New-Object System.Text.UTF8Encoding($false)))
```

**Dlaczego ważne:** Pliki `assetlinks.json` muszą być UTF-8 **bez BOM**. Google API odrzuca pliki z BOM komunikatem `ERROR_CODE_MALFORMED_CONTENT` — TWA nie może wtedy zweryfikować powiązania i pokazuje pasek URL.

### 2.3. Nie edytować `index.html` w głównym repo aplikacji przez panel admina portfolio

Jeśli używasz panelu administracyjnego do edycji portfolio (`-moje-aplikacje`), **upewnij się że edytujesz właściwy plik**. W maju 2026 doszło do incydentu, w którym `index.html` aplikacji Deutsch Lernen został przypadkowo zastąpiony kodem portfolio — co spowodowało że subdomena pokazywała portfolio zamiast aplikacji.

**Zasada:** edytuj zawartość aplikacji **TYLKO** w jej własnym repo (np. `deutsch-lernen-gut`). Nigdy poprzez panel admina obsługujący inne repo.

### 2.4. Nie podmieniać plików między repozytoriami

Każde repo ma swoje `index.html`, `manifest.json`, `assetlinks.json` i CNAME. **Nie kopiuj ich między repami** — w szczególności nie kopiuj `assetlinks.json` z PlantCare do Voyagera (klucze SHA-256 są inne dla każdej aplikacji).

---

## 3. ✅ Procedura aktualizacji aplikacji (PWA + TWA)

### 3.1. Aktualizacja kodu PWA

Standardowa procedura przez Git (czysto, z historią, bezpiecznie):

```powershell
# 1. Przejdź do lokalnego repo
cd C:\Users\marci\Desktop\<nazwa-repo>

# 2. Pobierz najnowszą wersję z GitHuba
git pull

# 3. Wprowadź zmiany w plikach (np. w VS Code)

# 4. Sprawdź co Git widzi
git status

# 5. Dodaj zmienione pliki
git add <konkretny-plik>          # albo "git add ." dla wszystkich

# 6. Commit z czytelnym opisem
git commit -m "feat: opis zmiany"

# 7. Wypchnij na GitHub
git push
```

GitHub Pages **automatycznie** wdroży zmiany w ciągu 30-90 sekund.

### 3.2. Aktualizacja `assetlinks.json` (SHA-256)

Gdy musisz zmienić klucze SHA-256 (np. po wymianie klucza w Play Console):

```powershell
# 1. Przejdź do repo
cd C:\Users\marci\Desktop\<nazwa-repo>

# 2. Backup obecnego pliku (na wypadek gdyby coś poszło nie tak)
Copy-Item .well-known\assetlinks.json .well-known\assetlinks.json.backup

# 3. Stwórz nową zawartość (UTF-8 BEZ BOM!)
$content = @'
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.beagleappsstudio.<nazwa>",
    "sha256_cert_fingerprints": [
      "KLUCZ_PODPISYWANIA_Z_PLAY_CONSOLE",
      "KLUCZ_PRZESYLANIA_Z_PLAY_CONSOLE"
    ]
  }
}]
'@

# 4. Zapisz BEZ BOM
[System.IO.File]::WriteAllText("$pwd\.well-known\assetlinks.json", $content, (New-Object System.Text.UTF8Encoding($false)))

# 5. Zweryfikuj że nie ma BOM (powinno być "91 123 10")
$bytes = [System.IO.File]::ReadAllBytes("$pwd\.well-known\assetlinks.json")
"Pierwsze 3 bajty: $($bytes[0]) $($bytes[1]) $($bytes[2])"

# 6. Commit + push
git add .well-known/assetlinks.json
git commit -m "fix: update assetlinks.json with current SHA-256 fingerprints"
git push

# 7. Po deployi (60s) zweryfikuj na produkcji że BOM-a nie ma
$bytes = (Invoke-WebRequest -Uri "https://<sub>.beagleapps.pl/.well-known/assetlinks.json" -UseBasicParsing).RawContentStream.ToArray()
"Pierwsze 3 bajty (na żywo): $($bytes[0]) $($bytes[1]) $($bytes[2])"

# 8. Usuń backup gdy wszystko działa
Remove-Item .well-known\assetlinks.json.backup
```

### 3.3. Aktualizacja TWA i publikacja w Play Store

Gdy zmieniasz wersję aplikacji w Play Store (np. nowa wersja `versionCode`):

1. Przejdź do folderu TWA: `cd C:\Users\marci\Desktop\twa-<nazwa>`
2. Zwiększ `versionCode` i `versionName` w `twa-manifest.json`
3. Wygeneruj nowy AAB:
   ```powershell
   bubblewrap build
   ```
4. Podpisz AAB swoim **upload key** (jeśli Bubblewrap nie zrobił tego automatycznie)
5. Zaloguj się do Google Play Console → wybierz aplikację → **Testuj i publikuj** → **Najnowsze wersje i pakiety**
6. Wybierz ścieżkę (Production / Closed testing / Internal testing)
7. **Utwórz nową wersję** → wgraj AAB → wypełnij notatki → opublikuj

⚠️ **Po publikacji:** Klucz podpisywania (Google Play) **może się nie zmienić**, ale **upload key** może zostać zaktualizowany jeśli go zresetujesz. **Zawsze sprawdź klucze w Play Console po publikacji** i zaktualizuj `assetlinks.json` jeśli się różnią.

---

## 4. ✅ Procedura testowania TWA na telefonie

Gdy aplikacja TWA pokazuje pasek URL pomimo poprawnej konfiguracji, wykonaj **w dokładnej kolejności**:

1. **Ustawienia Androida → Aplikacje → <nazwa aplikacji>**
2. **Pamięć → Wyczyść pamięć podręczną** + **Wyczyść dane**
3. **Ustawienia Androida → Aplikacje → Chrome**
4. **Pamięć → Wyczyść pamięć podręczną** (NIE czyść danych Chrome — tylko cache)
5. **Ustawienia Androida → Aplikacje → Google Play Services** (Usługi Google Play)
6. **Pamięć → Wyczyść pamięć podręczną**
7. **Odinstaluj aplikację**
8. **Wyłącz telefon całkowicie**, poczekaj ~30 sekund, włącz ponownie
9. Po włączeniu: **Google Play → <aplikacja> → Zainstaluj**
10. **Poczekaj 30 sekund** po instalacji (Android weryfikuje TWA w tle)
11. Otwórz aplikację

Aplikacja powinna chodzić **pełnoekranowo** — bez paska URL na górze.

---

## 5. ✅ Diagnostyka — narzędzia i checklist

### 5.1. Sprawdzenie czy `assetlinks.json` jest poprawny

**Test 1 — czy plik jest dostępny i bez BOM:**
```powershell
$bytes = (Invoke-WebRequest -Uri "https://<sub>.beagleapps.pl/.well-known/assetlinks.json" -UseBasicParsing).RawContentStream.ToArray()
"Pierwsze 3 bajty: $($bytes[0]) $($bytes[1]) $($bytes[2])"
```
- Spodziewany wynik: `91 123 10` (czyli `[`, `{`, newline)
- Zły wynik: `239 187 191` (BOM — wymaga naprawy)

**Test 2 — Google Digital Asset Links validator:**

W przeglądarce (najlepiej incognito):
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https%3A%2F%2F<sub>.beagleapps.pl&relation=delegate_permission/common.handle_all_urls
```
Spodziewany wynik: JSON z polem `statements` zawierającym dwa SHA-256 fingerprints.
Zły wynik: pole `errorCode` z wartością `ERROR_CODE_MALFORMED_CONTENT` lub innym błędem.

**Test 3 — sprawdzenie konkretnego klucza:**
```
https://digitalassetlinks.googleapis.com/v1/assetlinks:check?source.web.site=https%3A%2F%2F<sub>.beagleapps.pl&relation=delegate_permission/common.handle_all_urls&target.android_app.package_name=com.beagleappsstudio.<nazwa>&target.android_app.certificate.sha256_fingerprint=<SHA256>
```
Spodziewany wynik: `{"linked": true, ...}`

### 5.2. Sprawdzenie co serwuje GitHub Pages

```powershell
# Nagłówki HTTP (zobacz Last-Modified, ETag, Content-Length)
curl.exe -I https://<sub>.beagleapps.pl

# Tytuł strony
curl.exe -s https://<sub>.beagleapps.pl | Select-String -Pattern "<title>" | Select-Object -First 1

# Bezpośrednio plik z brancha (omijając cache)
curl.exe -s https://raw.githubusercontent.com/marcinchudaszek-cmd/<repo>/main/index.html | Select-String -Pattern "<title>" | Select-Object -First 1
```

### 5.3. Sprawdzenie DNS

```powershell
# Sprawdza co DNS zwraca dla subdomeny
nslookup -type=CNAME <sub>.beagleapps.pl

# Sprawdza adresy IP
nslookup -type=A <sub>.beagleapps.pl
```

Spodziewany wynik dla CNAME: `marcinchudaszek-cmd.github.io`
Spodziewany wynik dla A: cztery adresy IP GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)

---

## 6. 🆕 Procedura tworzenia nowej aplikacji TWA (od zera)

### 6.1. Część webowa (PWA)

1. **Stwórz repo na GitHubie** (np. `nowa-aplikacja`)
2. **Przygotuj kod aplikacji** (HTML/JS lub React/Vite — zależnie od projektu)
3. **Dodaj plik CNAME** w głównym folderze repo z zawartością `nowa.beagleapps.pl` (jedna linia, bez `https://`, bez ukośnika)
4. **Dodaj plik `.well-known/assetlinks.json`** (na razie z placeholderami SHA-256 — wypełnisz po wygenerowaniu kluczy w Play Console)
5. **Push do `main`**
6. **Skonfiguruj GitHub Pages:** Settings → Pages → Source: Deploy from a branch → Branch: `main` (lub `gh-pages` jeśli używasz Vite z `npm run deploy`)
7. **Dodaj Custom domain:** `nowa.beagleapps.pl` → Save
8. **W panelu HitMe.pl** dodaj rekord DNS:
   ```
   Typ: CNAME
   Nazwa: nowa
   Wartość: marcinchudaszek-cmd.github.io.
   TTL: 3600
   ```
9. **Poczekaj** na propagację DNS (5-30 minut)
10. **Sprawdź** czy `https://nowa.beagleapps.pl` ładuje aplikację

### 6.2. Część TWA (Android)

1. **Utwórz nowy folder** (np. `twa-nowa-aplikacja`) na pulpicie
2. **Wygeneruj projekt TWA** komendą:
   ```powershell
   bubblewrap init --manifest=https://nowa.beagleapps.pl/manifest.json
   ```
3. **Wypełnij dane** (package name: `com.beagleappsstudio.nowa`, host: `nowa.beagleapps.pl`)
4. **Wygeneruj keystore** (lub użyj istniejącego — Bubblewrap zapyta)
5. **Build:**
   ```powershell
   bubblewrap build
   ```
6. **Otrzymujesz** plik `app-release-bundle.aab`
7. **Wgraj** AAB do Google Play Console (utworzysz tam nową aplikację)
8. **Po pierwszym uploadzie** Google wygeneruje **klucz podpisywania** (App signing key) — pobierz go z Play Console
9. **Zaktualizuj `assetlinks.json`** w repo z prawdziwymi SHA-256 (klucz podpisywania + upload key)
10. **Push zmian** → GitHub Pages wdraża → testuj na telefonie

---

## 7. 📋 Lista typowych problemów i rozwiązań

### Problem: Aplikacja w Play Store pokazuje biały/czarny ekran
**Przyczyna:** Zły `base` path w `vite.config.js` (np. `/<repo>/` zamiast `/`)
**Rozwiązanie:** Zmień `base` na `/` w `vite.config.js`, zbuduj i wdroż ponownie.

### Problem: Subdomena pokazuje portfolio zamiast aplikacji
**Przyczyna:** Plik `index.html` w repo zawiera kod portfolio (przypadkowo podmieniony)
**Rozwiązanie:** Sprawdź zawartość `index.html` w repo (przez `curl.exe -s ... | Select-String "<title>"`). Jeśli widzisz tytuł portfolio — wgraj poprawny plik z lokalnej kopii projektu i zrób commit + push.

### Problem: TWA pokazuje pasek URL na górze
**Przyczyna 1:** `assetlinks.json` ma BOM
**Rozwiązanie 1:** Sprawdź pierwsze 3 bajty pliku. Jeśli `239 187 191` — zapisz plik na nowo używając `[System.IO.File]::WriteAllText` z `UTF8Encoding($false)`.

**Przyczyna 2:** SHA-256 w `assetlinks.json` nie pasują do kluczy z Play Console
**Rozwiązanie 2:** Pobierz aktualne klucze z Play Console (klucz podpisywania + upload key) i zaktualizuj plik.

**Przyczyna 3:** Cache weryfikacji TWA na telefonie
**Rozwiązanie 3:** Pełna procedura czyszczenia z punktu 4 tego dokumentu.

### Problem: GitHub odrzuca push z błędem "rejected (fetch first)"
**Przyczyna:** Zmiany na GitHubie wyprzedzają lokalne (np. ktoś edytował przez interfejs www)
**Rozwiązanie:**
```powershell
git pull
# Jeśli otworzy się Vim, wpisz :wq i Enter
git push
```

### Problem: Przy `npm run deploy` znika plik CNAME z brancha gh-pages
**Przyczyna:** Vite nie kopiuje CNAME bo nie ma go w `public/`
**Rozwiązanie:** Dodaj plik `CNAME` z zawartością `<sub>.beagleapps.pl` do folderu `public/` w repo. Vite skopiuje go automatycznie do `dist/` przy każdym buildzie.

### Problem: Custom domain w GitHub Pages mówi "DNS check in progress" i nie kończy
**Przyczyna:** Tymczasowy stan po zmianach w konfiguracji
**Rozwiązanie:** Poczekaj 5-15 minut. Jeśli nadal nie działa — sprawdź `nslookup -type=CNAME <sub>.beagleapps.pl` (musi zwracać `marcinchudaszek-cmd.github.io`).

---

## 8. 🔐 Bezpieczeństwo

### 8.1. Co NIE jest tajne
- SHA-256 fingerprints (`assetlinks.json` jest publiczny)
- Package names
- Adresy URL i subdomen
- Repo na GitHubie (są public)

### 8.2. Co JEST tajne
- **Plik keystore** (`android.keystore`) — jeśli go stracisz, **nigdy** więcej nie podpiszesz nowej wersji aplikacji upload keyem
- **Hasło do keystore** — bez niego keystore jest bezużyteczny
- **Hasło do Google Play Console**
- **Hasło do panelu HitMe.pl**

### 8.3. Backup
- Trzymaj **kopię keystore** w bezpiecznym miejscu (np. zaszyfrowany folder w chmurze)
- Trzymaj **dokumentację haseł** w menedżerze haseł (nigdy w plain text na pulpicie)

---

## 9. 📞 Linki referencyjne

- **GitHub:** https://github.com/marcinchudaszek-cmd
- **Google Play Console:** https://play.google.com/console
- **HitMe panel:** https://panel.hitme.pl/
- **Digital Asset Links validator:** https://developers.google.com/digital-asset-links/tools/generator
- **Bubblewrap docs:** https://github.com/GoogleChromeLabs/bubblewrap

---

## 10. 📝 Historia zmian dokumentu

| Wersja | Data | Zmiana |
|---|---|---|
| 1.0 | 1 maja 2026 | Pierwsza wersja — utworzona po naprawie ekosystemu Beagle Apps |

---

**Trzymaj ten dokument w bezpiecznym miejscu. Aktualizuj go za każdym razem, gdy:**
- Dodajesz nową aplikację
- Zmieniasz klucze SHA-256 (np. po reset upload key)
- Zmieniasz hosting / DNS
- Odkrywasz nowy typowy problem (rozdział 7)
