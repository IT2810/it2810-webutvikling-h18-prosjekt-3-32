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

På hjemskjermen vises en oversikt over dine tre øverste events fra kalenderen, og dine tre øverste todos. Dersom det ikke finnes noen events eller todos, vil det komme opp en boks hvor det står "No upcoming events", og/eller "No upcoming todos". Det finnes også en refresh-knapp, som vil refreshe listen på hjemskjermen. Dette kan være nyttig hvis man har lagt til en todo eller et event, og ønsker å få opp dette på hjemskjermen. 

#### "To do"

På to do fanen kan du holde styr på todos og viktige gjøremål. Har kan man sette opp diverse man må huske å gjøre, og eventuellt sette en frist på det. Følgende funksjonalitet finner du på denne fanen:

* Legge til todo
* Legge til dato på en todo (listen vil oppdatere seg basert på dato). Dersom en dato er nåværende dato eller har vært vil teksten bli markert som rød, som en påminnelse om at tiden har gått ut på denne todoen. 
* Slette en todo
* Markerere en todo som ferdig (ved å trykke på sjekkboksen)
* Når applikasjonen lukkes vil todos som er ferdig havne i en egen liste over ferdige todos. Trykker man på knappen "Show finished todos" får man opp en liste over todos man allerede har gjort.

Her er noen skjermbilder fra der todolisten er i bruk. På bilde 1 er det lagt til todos med dato, på bilde 2 er øverste todo huket av for ferdig, og neste gang applikasjonen åpnes er denne havnet på listen over ferdige todos.

![Todobilde1](http://i65.tinypic.com/mmep6t.jpg)
![Todobilde2](http://i66.tinypic.com/2qisp5g.jpg)
![Todobilde3](http://i63.tinypic.com/1zz2la9.jpg)

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

![Komponentarkitektur](http://i66.tinypic.com/30kaouo.png)


#### React Native

Som nevnt tidligere er dette prosjektet utviklet i React Native. Som det ble oppfordret til i oppgaveteksten, har vi brukt en rekke tredjepartskomponenter for å ha tilstrekkelig med funksjonalitet i applikasjonen. Vi har brukt følgende tredjepartskomponenter:

* React Native Calendars [https://github.com/wix/react-native-calendars]
  * 
* React Native Datepicker [https://github.com/xgfe/react-native-datepicker]
* React Native Elements [https://react-native-training.github.io/react-native-elements/]
* React Native Navigation [https://reactnavigation.org/docs/en/getting-started.html]
* React Native Progress Circle [https://www.npmjs.com/package/react-native-progress-circle]
  * React Native Progress Circle blir brukt for å visualisere en progressbar på skrittelleren. Prosenten som vises er gjennomsnitt antall skritt gått daglig per uke, i forhold til målet man har satt seg. 
* React Navigation Material Bottom Tabs [https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html]
* Moment [https://momentjs.com/]
#### AsyncStorage

Som det står i oppgaveteksten, så har vi tatt i bruk AsyncStorage. [https://facebook.github.io/react-native/docs/asyncstorage] Her lagres alt av data mellom hver gang applikasjonen kjøres, slik at neste gang brukeren går inn på applikasjonen, er det ingen data som har gått tapt. Ulik data har ulike nøkler, slik at det lett å skille mellom hva som skal hentes ut, når det hentes ut.

## Testing

#### Jest 

I dette prosjektet har vi brukt Jest [https://jestjs.io/] for å teste applikasjonens funksjonalitet. Vi har testet at appen fungerer like godt på både Android og iOS. Enhetene vi har testet på er følgende: 

* Iphone 6s
* 
*

## Enhetstesting

Vi har testet de ulike kompenentene og det som finnes av funksjonalitet. 

* TodoList.js

| Test | Beskrivelse |
| --- | --- |
| snapshot | En enkel snapshot test av siden. Sjekker om siden er den samme som forrige snapshot. |
| addTodo | Denne testen sjekker om det blir lagt til en todo. Testen setter *todoText* i state til å være "test", og kjører funksjonen *addTodo(1)*, for å opprette en todo med todonr: *todo1*. Deretter sammenligner den *state.todoList* til å være lik som en testListe, som er ment til å være helt lik listen som opprettes i *addtodo*   |
| handleFinishedTodo | blabla |
| handleShowFinishedTodos | blabla |
| updateSortedList | blabla |
| deleteTodo | blabla |
| sortByDate | blabla |
| updateShowList | blabla |
| updateTodoList | blabla |

* ListItem.js

* CalendarDisplayer.js

* 


## Versjonskontroll
