# IT2810 - Prosjekt 3 - Gruppe 32
Project 3 - IT 2810 created by GitHub Classroom  

README only available in Norwegian language.

---

### Applikasjonen er et gruppeprosjekt utført i forbindelse med emnet IT2810 - Webutvikling ved Institutt for datateknologi og informatikk ved NTNU Gløshaugen, Trondheim.

##### Prosjektet er utviklet for mobile enheter og skrevet i React-Native [https://facebook.github.io/react-native/]

---

## Bruk

Applikasjonen er ment å være en personlig informasjon og motivasjons manager. Her kan du holde styr todos, ha en oversikt over avtaler og eventer i en kalender, samt prøve å opprettholde ditt daglige mål for antall skritt. Applikasjonen er bygd opp av ulike faner som man kan bla i mellom. Her er nærmere informasjon om de ulike fanene: 

#### "Home"

#### "To do"

På to do fanen kan du holde styr på todos og viktige gjøremål. Følgende funksjonalitet finner du på denne fanen:

* Legge til todo
* Legge til dato på en todo (listen vil oppdatere seg basert på dato)
* Slette en todo
* Markerere en todo som ferdig (ved å trykke på sjekkboksen)
* Når applikasjonen lukkes vil todos som er ferdig havne i en egen liste over ferdige todos. Trykker man på knappen "Show finished todos" får man opp en liste over todos man allerede har gjort. 

#### "Pedometer"

#### "Calendar"

I kalenderen får man oversikt over sine avtaler. Man får først og fremst oversikt over den kommende uken, men man kan også bla seg frem og tilbake i tid. Dette gjøres ved å trykke på eller dra ned blå linjen under datoene, som man kan se på bildene under. Bildet til høyre viser startskjermen i kalenderen, og bildet til venstre viser hvordan det ser ut når man trykker på eller drar ned den blå linjen:


![Bilde 1](https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/44188828_249232519280528_4348971510405267456_n.png?_nc_cat=105&oh=9f66978508821adafa441700f3461b65&oe=5C463EBA) 
![Bilde 2](https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/44096668_926757400858481_4816407275268734976_n.png?_nc_cat=105&oh=019fe0f44cddfbe24065bf010c4882b0&oe=5C56D07A)

Vi kunne valgt å gå for et annet design på kalenderen, men grunnen til at vi valgte denne løsningen, var at vi synes det er bedre å få opp oversikt over alle kommende avtaler med én gang, siden det som oftest vil være det man er interessert i. Agenda-komponenten fra React Native Calendars passet bra i forhold til hva vi var ute etter, og vi bestemte oss for å bruke den.

I tillegg til å kunne se avtaler, har kalenderen følgende funksjonaliteter:

* Legge til avtaler
* Endre avtaler. Her kan man endre selve avtaleteksten, datoen eller tidspunktet for avtalen.
* Slette avtaler


## Teknologi

#### Komponentarkitektur



#### React Native

Som nevnt tidligere er dette prosjektet utviklet i React Native. Som det ble oppfordret til i oppgaveteksten, har vi brukt en rekke tredjepartskomponenter for å ha tilstrekkelig med funksjonalitet i applikasjonen. Vi har brukt følgende tredjepartskomponenter:

* React Native Elements [https://react-native-training.github.io/react-native-elements/]
* React Native Datepicker [https://github.com/xgfe/react-native-datepicker]
* React Native Calendars [https://github.com/wix/react-native-calendars]
* React Native Navigation [https://reactnavigation.org/docs/en/getting-started.html]

#### AsyncStorage

Som det står i oppgaveteksten, så har vi tatt i bruk AsyncStorage. [https://facebook.github.io/react-native/docs/asyncstorage] Her lagres alt av data mellom hver gang applikasjonen kjøres, slik at neste gang brukeren går inn på applikasjonen, er det ingen data som har gått tapt. Ulik data har ulike nøkler, slik at det lett å skille mellom hva som skal hentes ut, når det hentes ut.

## Testing

#### Jest 

## Versjonskontroll
