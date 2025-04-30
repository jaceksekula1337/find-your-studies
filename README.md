# Find Your Studies – system dopasowywania kierunków studiów

> Projekt magisterski, który ma na celu stworzenie narzędzia wspierającego wybór kierunku studiów na podstawie cech osobowości i preferencji użytkownika.
---
## O co chodzi?

Find Your Studies to aplikacja, która:
- pobiera dane o kierunkach studiów z publicznego API (POLON),
- zapisuje je do lokalnej bazy danych (PostgreSQL),
- pyta użytkownika o preferencje i cechy osobowości (Big Five),
- porównuje odpowiedzi z profilem kierunków,
- wypluwa listę najlepiej dopasowanych propozycji

---

## Co już działa?

- ✅ Połączenie z API POLON i import danych do bazy (Django)
- ✅ Baza danych z kursami i powiązaniami do pytań (Question → CourseQuestionScore)
- ✅ Frontend w React z quizem (15 pytań Big Five, paginacja, logika interpretacji odpowiedzi)
- ✅ Backendowy algorytm dopasowania (punktacja + alerty na niedopasowania)
- ✅ Połączenie Front–Back (wysyłka JSON + odbiór rekomendacji)
- ✅ Przetestowane lokalnie z użyciem Postmana i konsoli Reacta
- ✅ Dane w backendzie testowo przypisane do trzech kierunków

---

## Co jeszcze do zrobienia?

- 🔲 Dodanie większej liczby kierunków i ich profili cech
- 🔲 Stylizacja wyników dopasowania i UX (np. opis cech, feedback)
- 🔲 Możliwość zapisywania wyników i odpowiedzi użytkowników
- 🔲 Zapisywanie wyników dopasowania (logi + feedback od usera)
- 🔲  Wersja produkcyjna (Netlify + Render)

---

## Algorytm dopasowania

W skrócie:
1. Użytkownik odpowiada na 15 pytań – każde z nich reprezentuje jedną z cech modelu Big Five (np. neurotyczność, ugodowość).
2. Każde pytanie ma swój identifier, np. O_try_new_things.
3. Kierunki studiów mają przypisaną wartość 0–2 do każdego pytania (jak bardzo ta cecha jest istotna).
4. Backend porównuje odpowiedzi użytkownika z wymaganiami kierunków:
- trafienie = +2 pkt
- różnica o 1 = +1 pkt
- różnica o 2 = 0 + alert
5. Zwracane są TOP kierunki wraz z liczbą punktów i listą potencjalnych niezgodności.

---

## Stack technologiczny

- **Frontend:** React + Tailwind
- **Backend:** Django + Django REST Framework
- **Baza danych:** PostgreSQL
- **Import danych:** API Radon (POLON)
- **Testowanie:** Postman + dev server

---

## Dlaczego ten projekt?

Bo wybór studiów często przypomina rzut monetą – a może da się to zrobić lepiej, mądrzej i nowocześniej? Find Your Studies ma być narzędziem pomocnym dla uczniów, doradców kariery i uczelni.

Projekt rozwijany jako praca dyplomowa, ale z ambicją, żeby realnie opublikować go jako działającą stronę.

---
Obecny widok:

![image](https://github.com/user-attachments/assets/f002756a-45e3-4fee-832a-799059bd7844)
![image](https://github.com/user-attachments/assets/96f2b58b-d872-4e8e-8a2d-44857a22903b)

