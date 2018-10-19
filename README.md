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
![Todobilde4](https://imgur.com/x79cyoj.png)

#### Skritteller

Appen inneholder også en skritteller. Denne viser brukeren hvor mange skritt den har beveget seg i løpet av dagen, 
samt et daglig gjennomsnitt basert på aktiviteten siste 7 dager. Brukeren har også mulighet til å selv velge hvor mange skritt som skal være det daglige målet. Dette gjøres ved hjelp av en glidebryter som i seg selv skal være svært intuitiv. Appen viser også brukerens progresjon i forhold til sitt eget mål, som vises ved hjelp av en sirkel som går fra 0 til brukerens mål. Det vises også en melding som skal motivere brukeren til å nå sine mål. 

![Skritteller](https://imgur.com/wTLy8r4.png)

#### Kalender

I kalenderen får man oversikt over sine avtaler. Man får først og fremst oversikt over den kommende uken, men man kan også bla seg frem og tilbake i tid. Dette gjøres ved å trykke på eller dra ned blå linjen under datoene, som man kan se på bildene under. Bildet til høyre viser startskjermen i kalenderen, og bildet til venstre viser hvordan det ser ut når man trykker på eller drar ned den blå linjen.


![Kalender1](https://imgur.com/Nmp8Bf2.png) 
![Kalender2](https://imgur.com/BnbNthu.png)
![Kalender3](https://imgur.com/vhZ0PNe.png)

**NB!** Noen iOs-versjoner opplever problemer med å scrolle i kalenderen etter at man har dratt ned linjen under datoene. Når man begynner å scrolle, vil kalenderen kollapse og forsvinne opp igjen. Vi fant derimot en quick-fix på dette: 
Gå inn i filen `project3\node_modules\react-native-calendars\src\agenda\index.js`, naviger til linje 365 og endre fra:

`const scrollPadPosition = (shouldAllowDragging ? HEADER_HEIGHT  : 0) - KNOB_HEIGHT;`

til

`const scrollPadPosition = (shouldAllowDragging ? HEADER_HEIGHT  : 300) - KNOB_HEIGHT;`

Dette vil løse problemet.

Ved å trykke på en avtale, får man opp et Modal-vindu der man kan endre avtaleteksten, datoen eller tidspunktet for avtalen. Her kan man også slette avtalen om man vil. 
Vi kunne valgt å gå for et annet design på kalenderen, men grunnen til at vi valgte denne løsningen, var at vi synes det er bedre å få opp oversikt over alle kommende avtaler med én gang, siden det som oftest vil være det man er interessert i. Agenda-komponenten fra React Native Calendars passet bra i forhold til hva vi var ute etter, og vi bestemte oss for å bruke den.

I tillegg til å kunne se avtaler, har kalenderen følgende funksjonaliteter:

* Legge til avtaler
* Endre avtaler. Her kan man endre selve avtaleteksten, datoen eller tidspunktet for avtalen.
* Slette avtaler

Som nevnt brukes det en Modal-komponent i CalendarDisplayer-komponenten, fordi det er en simpel og intuitiv måte å lage et "pop-up"-vindu på i React Native. Denne Modal-komponenten brukes når det en avtale skal legges til og når en avtale skal endres. Til å begynne med hadde dekket Modal-komponenten hele skjermen, men det ble så mye dødplass på skjermen der det ikke ble vist noe, så vi bestemte oss for å gjøre Modal-komponenten mindre og sentrere den. Det endte opp med å se mye bedre ut. 

## Teknologi

#### Komponentarkitektur

Prosjektet er satt opp med det vi ser på som en fornuftig komponentarkitektur med fokus på å unngå å skrive samme kode flere ganger, samt å holde koden lett lesbar og vedlikeholdbar. Vi har også forsøkt å følge det som regnes som best practice. For detaljer se diagrammet under:

![Komponentarkitektur](http://i66.tinypic.com/30kaouo.png)


#### React Native og tredjepartskomponenter

Som nevnt tidligere er dette prosjektet utviklet i React Native, noe som medfører at applikasjonen og all funksjonalitet er plattformuavhengig. Som det ble oppfordret til i oppgaveteksten, har vi brukt en rekke tredjepartskomponenter kompatible med både iOS og Android for å ha tilstrekkelig med funksjonalitet i applikasjonen. Vi har brukt følgende tredjepartskomponenter:

* [React Native Calendars](https://github.com/wix/react-native-calendars)
  * React Native Calendars brukers vi for å vise kalender og tilknyttede hendelser. React Native Calendars har flere komponenter som går an å bruke, blant annet Calendar og Agenda. Calendar er som en tradisjonell kalender, og det var den vi brukte i begynnelsen. Etter å ha prøvd Agenda-komponenten, fant vi fort ut at den passet mye bedre i forhold til våre ønsker om funksjonalitet og design. Derfor endte vi opp med å kun bruke Agenda-komponenten fra React Native Calendars.
* [React Native Datepicker](https://github.com/xgfe/react-native-datepicker)
  * React Native Datepicker brukes til å vise en liten kalender når brukeren ved ulike anledninger skal velge en dato. I tillegg viser den en tidspunkt-velger for å velge tidspunkt på avtaler. Denne velgeren varierer litt i design ut fra hvilken enhet du er på og hvilken versjon av operativsystemet du har.
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
+ Sjekke at to-dos legges til/ fjernes fra Home-siden når man trykker på refresh-knappen der

+ Endre mål for antall skritt
+ Sjekke at det legges til skritt ved aktivitet (krever Google Fit på Android)

+ Legge til kalenderhendelser
+ Endre kalenderhendelser
+ Slette kalenderhendelser
+ Sjekke at kalenderhendelser legges til/ fjernes fra Home-siden når man trykker på refresh-knappen der

Resultatet av alle testene var utelukkende som forventet. Alle funksjonene oppførte seg som de skulle, og vi fant ingen feil eller mangler. 


#### Enhetstesting

Vi har også brukt [Jest](https://jestjs.io/) for å teste applikasjonens funksjonalitet og underliggende arkitektur.
Dette har vi gjort på det vi selv anser som en god og systematisk måte, som er dokumentert under. Vi har hatt fokus på å oppnå en akseptabel testcoverage, uten å bruke i overkant mye ressursser på dette i henhold til den korte tidsfristen vi har hatt.

#### TodoList-test.js

| Test | Beskrivelse |
| --- | --- |
| snapshot | Sjekker om siden er den samme som forrige snapshot. | 
| addTodo | Verfiserer at funksjonen addTodo fungerer, at det blir lagt til en todo. State sammenlignes med en testliste for å sjekke at funksjonen faktisk la til en liste.|
| deleteTodo | Verifiserer at funksjonen deleteTodo fungerer, at en todo blir slettet. State sammenlignes med en tom liste for å sjekke at funksjonen faktisk slettet todoen  |
| updateSortedList | Verifiserer at funksjonen updateSortedList fungerer. Sjekker at når en todo får en todo, at denne todoen blir lagt til. |
| sortByDate | Verifiserer at funksjonen sortByDate fungerer. Den får inn to todos som er sortert i feil rekkefølge, og sjekker at de er sortert i riktig rekkefølge etter funksjonen er kjørt. |
| handleFinishedTodo | Verifiserer at funksjonen handleFinishedTodo fungerer. Oppretter en testliste hvor `done:true`, og sjekker at listen over finished-todos er oppdatert. |
| handleShowFinishedTodos | Verifiserer at funksjonen handleShowFinishedTodos fungerer. Oppretter først en testliste med med en todo som er ferdig, og sjekker at listen som vises til brukeren (showList), viser denne testlisten. Sjekker så det motsatte, at en todo med som er uferdig, vises i listen (showList). |
| onChangeText | Bruker mockfunksjon til å verifisere at onChangeValue på TextInput reagerer på en endring. |
| onPress | Bruker mockfunksjon til å verifiserer at onPress på TouchableOpacity reagerer på en endring. |
| storeTodo / removeTodo | Oppretter en mock av AsyncStorage, og bruker denne for å teste at det fungerer å legge til verdier i AsyncStorage, samt. slette dem derfra. Dette gjennom å bruke funksjonene storeTodo and removeTodo i Todolist.js. |

#### ListItem-test.js

| Test | Beskrivelse |
| --- | --- |
| checkDueDate | Verifiserer at funksjonen checkDueDate fungerer. Henter først inn en dato som har vært, og sjekker da at den returnerer true (siden datoen har vært). Sjekker så med en dato som er i fremtiden, og verifiserer da at den returngerer false. |
| handlePressedCheckbox | Verifiserer at funksjonen handlePressedCheckbox fungerer. Sjekker at ved å kjøre denne funksjonen, at state.done er true. Noe den naturligvis vil være om todoen er ferdig. |
| handlePressedCheckbox | Verifiserer at funksjonen handlePressedCheckbox fungerer. Kjører denne funksjonen med en dato som parameter, og sjekker at state for dato har oppdatert seg. |
| setModalVisible | Verifiserer at funksjonen setModalVisible fungerer. Sjekker at ved å trykke på en todo, at modalen åpner seg. Dette sjekkes ved å sjekke at staten for om modal er synlig er true. |
| deleteTodo | Verifiserer at funksjonen deleteTodo fungerer. Oppretter to mockfunksjoner: en for deleteTodo, og en for onPress (for å sjekke at funksjonen ble kjørt). Sjekker at ved å kjøre funksjonen deleteTodo, så reagerer mockOnPress på dette. |
| onPress | Bruker mockfunksjon til å verifiserer at onPress på TouchableOpacity reagerer på en endring. |
| onIconPress | Bruker mockfunksjon til å verfisere at onIconPress på Checkbox reagerer på en endring. |
| onRequestClose | Bruker mockfunksjon til å verifisere at onRequestClose på Modal reagerer på en endring. |
| onChangeText | Bruker mockfunksjon til å verifisere at onChangeValue på TextInput reagerer på en endring. |

#### CalendarDisplayer-test.js

| Test | Beskrivelse |
| --- | --- |
| closeModal | Verifiserer at Modal-viewet lukkes som forventet. |
| setModalVisible | Verifiserer at Moda-viewet åpnes som forventet. |
| addEvent | Verifiserer at avtaler legges til i state som forventet. Denne funksjonen testes i tre scenarier; når det ikke er noen avtaler fra før, når det er én avtale (som egentlig ikke er en avtale, men som forteller brukeren at den ikke har noen avtaler) og når avtalen som skal bli lagt til allerede finnes.|
| deleteEvent | Verifiserer at avtaler faktisk blir slettet når funksjonen kalles. |
| loadItems | Verifiserer at avtaler lastes som de skal og lagres i state. Testes i to scenarier; når det ikke er noen avtaler i state og når det er avtaler i state, men ikke i den aktuelle dagen. |
| showItemInfo | Verifiserer at staten endres til infoen om den aktuelle avtalen, og at det er denne infoen som vises i Modal.  |
| onPress | Vi bruker mock i flere tester for å verifisere at alle knappene i komponenten faktisk fungerer som de skal når de trykkes på. |
| onRequestClose | Mock brukes også til å verifisere at tilbake-knappen på Android-telefoner også fungerer som den skal. |
| onDateChange | Her brukes også mock for å verifisere at det fungerer å bytte dato og klokkeslett i Modal |
| onChangeText | Verifiserer at teksten i state endres ut fra hva som er i inputfeltet i Modal. |
| renderItem | Verifiserer at avtaler, enten de er tomme eller ei, rendres som forventet. |
| storeEvent | Verifiserer at avtaler blir korrekt lagret i AsyncStorage. |

#### StepCounter-test.js

| Test | Beskrivelse |
| --- | --- |
| render | Verifiserer at komponenten laster som forventet. |
| motivationalMessage | Verifiserer at meldingen som skal motiverere brukren endrer seg i henhold til målet og stegsnittet. |
| retrieveGoal | Verifiserer at brukerens satte mål blir lastet korrekt inn fra AsyncStorage til State. |
| storeGoal | Verifiserer at strukturen i bakkant blir oppdatert dersom brukeren setter et nytt mål. |

#### Home-test.js

| Test | Beskrivelse |
| --- | --- |
| snapshot | Sjekker om siden er den samme som forrige snapshot. | 
| sortByDate | Verifiserer at funksjonen sortByDate fungerer. Den får inn to todos som er sortert i feil rekkefølge, og sjekker at de er sortert i riktig rekkefølge etter funksjonen er kjørt. |
| AsyncStorage | Oppretter en mock av AsyncStorage, og bruker denne for å teste at det fungerer å legge til verdier i AsyncStorage, samt. slette dem derfra. |

#### HomeListItem-test.js

| Test | Beskrivelse |
| --- | --- |
| snapshot | Sjekker om siden er den samme som forrige snapshot. | 

#### AssetsTransformer-test.js

| Test | Beskrivelse |
| --- | --- |
| process | Verifiserer at funksjonen process fungerer som den skal. Sjekker at den returnerer korrekt verdi. |

#### Coverage 

Vi hadde som mål å teste majoriteten av de viktigste funksjonene i applikasjonen. Ved å gjøre dette, endte vi opp med en test-coverage på følgende:

![Coverage](https://imgur.com/zw1xcDz.png)

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
