Kody pozwalają na łatwe sygnalizowanie o jakimś evencie. Kod jest umieszczony na początku atrybutu *.message* wiadomości (pierwsze 4 znaki). Zawsze zaczyna się od znaku '#' a następnie są 3 cyfry. Jeżeli wiadomość nie posiada kodu, wtedy domyślnie jest traktowana jako zwykła wiadomość tekstowa (może również mieć kod #000). 
Wiadomość może mieć tylko jeden kod lub żadnego.

#000 (lub brak kodu na początku) - domyślna wiadomość tekstowa
#001 - nadawca wiadomości chce ujawnienia
#002 - sygnał wysyłany przez serwer dla klientów, że następuje ujawnienie