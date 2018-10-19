# IT2810 - Prosjekt 3 - Gruppe 32
Project 3 - IT 2810 created by GitHub Classroom  

README only available in Norwegian language.

---

### Applikasjonen er et gruppeprosjekt utført i forbindelse med emnet IT2810 - Webutvikling ved Institutt for datateknologi og informatikk ved NTNU Gløshaugen, Trondheim.

##### Prosjektet er utviklet for mobile enheter og skrevet i [React Native](https://facebook.github.io/react-native/)

##### Appen krever [Google Fit](https://www.google.com/fit/) for å kunne brukes på Android.

---


## Innhold og funksjonalitet

Applikasjonen er ment å være en prototype på personlig informasjon- og motivasjonsmanager. Appen håndterer gjøremål, avtaler og kalenderhendelser, samt at den motiverer brukeren til å opprettholde sitt daglige mål for antall skritt / aktivitet. Applikasjonen er bygd opp av ulike faner som man kan bla i mellom. I forhold til oppgaven muliggjør applikasjonen både lagring av oppgaver, todos, avtaler, motivasjoner og målinger i form av skrittelleren. Appen lagrer også tilstand selv om appen avsluttes ved bruk av AsyncStorage. Under følger mer informasjon om funksjonaliteten: 

#### Startskjerm

På startskjermen vises en oversikt over dine tre øverste events fra kalenderen, og dine tre øverste todos. Dersom det ikke finnes noen events eller todos, vil det komme opp en boks hvor det står "No upcoming events", og/eller "No upcoming todos". Det finnes også en refresh-knapp, som vil refreshe listen på hjemskjermen. Dette kan være nyttig hvis man har lagt til en todo eller et event, og ønsker å få opp dette på hjemskjermen. 

![Hjemskjerm](https://imgur.com/59tKaly.png)

#### Gjøremål

I "To do"-fanen kan du holde styr på todos og viktige gjøremål. Har kan man sette opp diverse man må huske å gjøre, og eventuellt sette en frist på det. Følgende funksjonalitet finner du på denne fanen:

* Legge til todo
* Legge til dato på en todo (listen vil oppdatere seg basert på dato). Dersom en dato er nåværende dato eller har vært vil teksten bli markert som rød, som en påminnelse om at tiden har gått ut på denne todoen. 
* Slette en todo
* Markerere en todo som ferdig (ved å trykke på sjekkboksen)
* Når applikasjonen lukkes vil todos som er ferdig havne i en egen liste over ferdige todos. Trykker man på knappen "Show finished todos" får man opp en liste over todos man allerede har gjort.

Her er noen skjermbilder fra der todolisten er i bruk. På bilde 1 er det lagt til todos med dato, på bilde 2 er øverste todo huket av for ferdig, og neste gang applikasjonen åpnes er denne havnet på listen over ferdige todos.

![Todobilde1](https://imgur.com/pxJYrOQ.png)
![Todobilde2](https://imgur.com/0XBxpCq.png)
![Todobilde3](https://imgur.com/vIUouB6.png)

#### Skritteller

Appen inneholder også en skritteller. Denne viser brukeren hvor mange skritt den har beveget seg i løpet av dagen, 
samt et daglig gjennomsnitt basert på aktiviteten siste 7 dager. Brukeren har også mulighet til å selv velge hvor mange skritt som skal være det daglige målet. Dette gjøres ved hjelp av en glidebryter som i seg selv skal være svært intuitiv. Appen viser også brukerens progresjon i forhold til sitt eget mål, som vises ved hjelp av en sirkel som går fra 0 til brukerens mål. Det vises også en melding som skal motivere brukeren til å nå sine mål. 

![Skritteller](https://imgur.com/wTLy8r4.png)

#### Kalender

I kalenderen får man oversikt over sine avtaler. Man får først og fremst oversikt over den kommende uken, men man kan også bla seg frem og tilbake i tid. Dette gjøres ved å trykke på eller dra ned blå linjen under datoene, som man kan se på bildene under. Bildet til høyre viser startskjermen i kalenderen, og bildet til venstre viser hvordan det ser ut når man trykker på eller drar ned den blå linjen:


![Kalender1](https://imgur.com/Nmp8Bf2.png) 
![Kalender2](https://imgur.com/BnbNthu.png)

Vi kunne valgt å gå for et annet design på kalenderen, men grunnen til at vi valgte denne løsningen, var at vi synes det er bedre å få opp oversikt over alle kommende avtaler med én gang, siden det som oftest vil være det man er interessert i. Agenda-komponenten fra React Native Calendars passet bra i forhold til hva vi var ute etter, og vi bestemte oss for å bruke den.

I tillegg til å kunne se avtaler, har kalenderen følgende funksjonaliteter:

* Legge til avtaler
* Endre avtaler. Her kan man endre selve avtaleteksten, datoen eller tidspunktet for avtalen.
* Slette avtaler

## Teknologi

#### Komponentarkitektur

Prosjektet er satt opp med det vi ser på som en fornuftig komponentarkitektur med fokus på å unngå å skrive samme kode flere ganger, samt å holde koden lett lesbar og vedlikeholdbar. Vi har også forsøkt å følge det som regnes som best practice. For detaljer se diagrammet under:

![Komponentarkitektur](http://i66.tinypic.com/30kaouo.png)


#### React Native og tredjepartskomponenter

Som nevnt tidligere er dette prosjektet utviklet i React Native, noe som medfører at applikasjonen og all funksjonalitet er plattformuavhengig. Som det ble oppfordret til i oppgaveteksten, har vi brukt en rekke tredjepartskomponenter kompatible med både iOS og Android for å ha tilstrekkelig med funksjonalitet i applikasjonen. Vi har brukt følgende tredjepartskomponenter:

* [React Native Calendars](https://github.com/wix/react-native-calendars)
  * React Native Calendars brukers vi for å vise kalender og tilknyttede hendelser.
* [React Native Datepicker](https://github.com/xgfe/react-native-datepicker)
  * React Native Datepicker brukes til å vise en liten kalender når brukeren ved ulike anledninger skal velge en dato. 
* [React Native Elements](https://react-native-training.github.io/react-native-elements/)
  * React Native Elements er et UI toolkit som vi har tatt i bruk da det sparer oss en del arbeid og gir oss bedre UI-komponenter enn vi kunne lagd med begrensede tidsressurser.
* [React Native Progress Circle](https://www.npmjs.com/package/react-native-progress-circle)
  * React Native Progress Circle blir brukt for å visualisere en progressbar på skrittelleren. Prosenten som vises er gjennomsnitt antall skritt gått daglig per uke, i forhold til målet man har satt seg. 
* [React Navigation Material Bottom Tabs](https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html)
  * React Navigation Material Bottom Tabs bruker fordi denne forenkler navigasjon i appen. Vi valgte biblioteket da det gir oss en nært native følelse på iOS, samt at vi mener det er mer hensiktsmessig å ha tabvalg nederst i stedet for øverst på mobiltelefoner.
* [Moment](https://momentjs.com/)
  * Moment blir brukt da det forenkler en del operasjoner knyttet til dato og tid, noe som er kjekt når en arbeider med hendelser og kalendere.


#### AsyncStorage

I tråd med oppgaveteksten har vi tatt i bruk [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage) Her lagres alt av data mellom hver gang applikasjonen kjøres, slik at neste gang brukeren går inn på applikasjonen, er det ingen data som har gått tapt. Ulik data har ulike nøkler, slik at det lett å skille mellom hva som skal hentes ut, når det hentes ut. 

For de som ikke er kjent med AsyncStorage fungerer det omtrent på samme måte som [Web Storage APIet fra HTML5](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). Det vil si at APIet tilbyr metodene `setItem` og `getItem` for å henholdsvis lagre og hente ut data. `setItem` er metoden som lagrer til AsyncStorage og tar parametrene key og value. Av disse er key parameteret i `getItem` som gjør at du senere kan hente ut value. Se [dokumentasjonen](https://facebook.github.io/react-native/docs/asyncstorage) om du vil lære mer om AsyncStorage.

#### Skritteller

Skrittelleren er utviklet ved hjelp av Expo sitt [Pedometer API](https://docs.expo.io/versions/latest/sdk/pedometer) ettersom dette virket godt dokumentert. Dette APIet henter data fra iOS sitt Core API samt Android sitt Google Fit API, noe som medfører at appen krever at appen [Google Fit](https://www.google.com/fit/) er installert dersom appen skal brukes på Android.

Det kan kanskje være av interesse å vite at Pedometer APIet håndterer tilkoblingen til de bakomliggende APIene med metodene `_subscribe` og `_unsubscribe`. For å bruke APIet må du derfor sørge for at du kaller `_subscribe` før du kaller på metodene det tilbyr, samt at du lukker tilkoblingen til APIet ved å kalle på `_unsubscribe` før du unmounter komponenten. Du vil ellers kunne oppleve problemer med flere samtidige tilkoblinger. Videre kan APIet benyttes ved å hente ut data om aktivetet basert på et start-tidspunkt og et slutt-tidspunkt. Et eksempelkall på APIet er vist under:
```
// Requires that start and end are timestamps

Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({
                    stepsToday: result.steps,
                });
            },
            error => {
                this.setState({
                    stepsToday: "Could not get stepCount: " + error
                });
            }
        );
```

Se [dokumentasjonen](https://docs.expo.io/versions/latest/sdk/pedometer) om du vil lære mer om Expo sitt Pedometer API.


## Testing

#### Brukstesting

Vi har testet at appen fungerer like godt på både Android og iOS. Enhetene vi har testet på er følgende: 

* iPhone 6s
* iPhone XS ([Xcode Simulator](https://developer.apple.com/xcode/))
* Motorola Moto G6 Plus
* Motorola Moto G5 Plus

Brukstestingen vår har i stor grad foregått ved at vi har testet funksjonalitet på samme vis på en iOS-enhet og en eller flere Android-enheter. Det har vært viktig at appen fungerer likt både på iOS og Android. Under testene har vi fulgt listen over funksjonalitet under, og testet med tilfeldige verdier:

+ Legge til to-dos
+ Slette to-dos
+ Endre to-dos
+ Sjekke at to-dos forsvinner om du krysser av for "utført" og restarter appen

+ Endre mål for antall skritt
+ Sjekke at det legges til skritt ved aktivitet (krever Google Fit på Android)

+ Legge til kalenderhendelser
+ Endre kalenderhendelser
+ Slette kalenderhendelser


#### Enhetstesting

Vi har også brukt [Jest](https://jestjs.io/) for å teste applikasjonens funksjonalitet og underliggende arkitektur.
Dette har vi gjort på det vi selv anser som en god og systematisk måte, som er dokumentert under. Vi har hatt fokus på å oppnå en akseptabel testcoverage, uten å bruke i overkant mye ressursser på dette i henhold til den korte tidsfristen vi har hatt.

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

* CalendarDisplayer.js

| Test | Beskrivelse |
| --- | --- |
| ??????????????????????????????????????????????????????????????????????????? | ??????????????????????????????????????????????????????????????????????????? |

* StepCounter.js

| Test | Beskrivelse |
| --- | --- |
| render | Verifiserer at komponenten laster som forventet. |
| motivationalMessage | Verifiserer at meldingen som skal motiverere brukren endrer seg i henhold til målet og stegsnittet. |
| retrieveGoal | Verifiserer at brukerens satte mål blir lastet korrekt inn fra AsyncStorage til State. |
| storeGoal | Verifiserer at strukturen i bakkant blir oppdatert dersom brukeren setter et nytt mål. |


## Versjonskontroll

Som tilrettelagt av fagstaben har vi benyttet oss av Git og github for versjonskontroll av prosjektet. 
Vi har også brukt Node og npm for å holde kontroll på pakker og dependencies. Begge deler har fungert godt. 

Vi gjør oppmerksom på at vi har slettet feature- og bugbrancher etterhvert som de er merget inn til master. 
I tillegg til dette minner vi om at tallene for kodelinjer, ikke kan brukes til å måle andel utført arbeid ettersom en del operasjoner genererer veldig mange linjer kode.

I tillegg til dette har vi hatt som rutine å kommentere alle commits med issuenummer, noe som er fulgt til punkt og prikke bortsett fra noen automatiske commits gjort i Github sitt nettlesergrensesnitt. 
Vi har også brukt prosjekt-funksjonaliteten Github tilbyr, og innser at denne er noe bedre i Gitlab som skal brukes til neste prosjekt. 


## Medvirkende

- Jonas Jevnaker Aas
- Svenn Roland Refsnes Grønbeck
- Tore Stensaker Tefre
