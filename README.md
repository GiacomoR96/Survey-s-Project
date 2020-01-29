# Survey-s-Project

To start the project use the command:
    expo-cli start

# Technical and Functional Analysis
Survey-s-Project
Generazione di un applicativo per la creazione e gestione di questionari, i quali verranno utilizzati dagli utenti registrati alla piattaforma per approfondire le proprie conoscenze.

Attraverso l'applicativo deve essere possibile poter creare dei questionari, modificare i questionari esistenti ed eliminarli nel caso in cui i questionari risultano vuoti.
L'inclusione di un nuovo questionario deve prevedere l'inserimento di almeno una domanda che comprenda: 
  - Il testo relativo alla domanda
  - 4 risposte multiple alla domanda fornita nel testo
  - 1 risposta corretta appartenente alle 4 risposte descritte nel punto precedente

Inoltre l'applicativo deve poter fornire uno strumento sulla monitorizzazione delle risposte fornite dai vari utenti della piattaforma, facendo una statistica complessiva di dati in modo da fornire informazioni sul questionario selezionato.
Di ogni singolo questionario, deve essere possibile visualizzare:
  - Il numero di domande di ogni singolo questionario
  - Il numero di persone che hanno partecipato al questionario
  - La media delle risposte corrette fornite dagli utenti

Integrare l'interno applicativo con l'utilizzo di firebase per il salvataggio dei dati.

# Traccia esame:
Realizzare una applicazione cross-platform in grado di costruire dei questionari a risposta multipla in maniera tale da essere memorizzati anche in  formato json.
I questionari dovranno essere ospitati su  un server e memorizzati in file denominati codicequestionario.json; di seguito il formato:
{
  "array": [
    {
      "Domanda": "DOMANDA N. 1",
      "A": "Risposta A",
      "B": "Risposta B",
      "C": "Risposta C",
      "D": "Risposta D",
      "Esatta": "A"
    },
    {
      "Domanda": "DOMANDA N. 2",
      "A": "Risposta A",
      "B": "Risposta B",
      "C": "Risposta C",
      "D": "Risposta D",
      "Esatta": "A"
    },
    {
      "Domanda": "DOMANDA N. 3",
      "A": "Risposta A",
      "B": "Risposta A",
      "C": "Risposta A",
      "D": "Risposta A",
      "Esatta": "A"
    }
  ]
}