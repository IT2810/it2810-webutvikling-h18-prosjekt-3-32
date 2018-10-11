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

## Teknologi

#### Komponentarkitektur



#### React Native

Som nevnt tidligere er dette prosjektet utviklet i React Native. Som det ble oppfordret til i oppgaveteksten, har vi brukt en rekke tredjepartskomponenter for å ha tilstrekkelig med funksjonalitet i applikasjonen. Vi har brukt følgende tredjepartskomponenter:

* React Native Elements [https://react-native-training.github.io/react-native-elements/]
* React Native Datepicker [https://github.com/xgfe/react-native-datepicker]

#### AsyncStorage

Som det står i oppgaveteksten, så har vi tatt i bruk AsyncStorage. [https://facebook.github.io/react-native/docs/asyncstorage] Her lagres alt av data mellom hver gang applikasjonen kjøres, slik at neste gang brukeren går inn på applikasjonen, er det ingen data som har gått tapt. Ulik data har ulike nøkler, slik at det lett å skille mellom hva som skal hentes ut, når det hentes ut.

## Testing

#### Jest 

## Versjonskontroll
