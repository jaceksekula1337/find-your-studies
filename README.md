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

- ✅ Połączenie z API i pobieranie prawdziwych danych o kierunkach
- ✅ Zbudowana baza danych z kierunkami + cechami (Django ORM)
- ✅ Obecnie zaimplementowane są pytania na sztywno z poziomu Frontu, dla weryfikacji wizualnej
- ✅ Frontend w React z quizem (przygotowany do połączenia z backendem)
- ✅ Algorytm dopasowujący odpowiedzi użytkownika do kierunków (punktacja + alerty)
- ✅ Wysyłanie odpowiedzi z quizu do backendu (POST + JSON)

---

## Co jeszcze do zrobienia?

- 🔲 Przede wszystkim połączenie wszystkiego w całość (interakcja Frontu z Backendem)
- 🔲 Wdrożenie drzewa decyzyjnego (dla dynamicznych pytań)
- 🔲 Poprawienie struktury backendu oraz weryfikacja pytań zaimplementowanych na stronie
- 🔲 Zapisywanie wyników dopasowania (logi + feedback od usera)
- 🔲 Widok wizualny Frontu - obecny jest pewnym "szkieletem"

---

## Algorytm dopasowania

W skrócie:
1. Każde pytanie przypisane jest do jednej z 5 cech Big Five (np. empatia → ugodowość).
2. Każdy kierunek w bazie ma przypisane wartości do pytań (jak bardzo dana cecha jest potrzebna).
3. Użytkownik wypełnia quiz → odpowiedzi trafiają na backend.
4. Backend porównuje odpowiedzi z wymaganiami kierunków → liczy punktację.
5. Zwracane są top 5 kierunków z największą zgodnością.

---

## Stack technologiczny

- **Frontend:** React + Tailwind
- **Backend:** Django + Django REST Framework
- **Baza danych:** PostgreSQL
- **Import danych:** API Radon (POLON)
- **Testowanie:** Postman + dev server

---

## 💬 Dlaczego ten projekt?

Bo wybór studiów często przypomina rzut monetą – a może da się to zrobić lepiej, mądrzej i nowocześniej? Find Your Studies ma być narzędziem pomocnym dla uczniów, doradców kariery i uczelni.

Projekt rozwijany jako praca dyplomowa, ale z ambicją, żeby realnie opublikować go jako działającą stronę.

---
Obecny widok:

![image](https://github.com/user-attachments/assets/f002756a-45e3-4fee-832a-799059bd7844)
![image](https://github.com/user-attachments/assets/96f2b58b-d872-4e8e-8a2d-44857a22903b)

