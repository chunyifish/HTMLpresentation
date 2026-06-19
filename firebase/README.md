# Firebase setup

This project uses Firebase only for anonymous live polls in the static web presentation.

## Required services

- Firebase Authentication: enable Anonymous sign-in.
- Cloud Firestore: create a Firestore database.
- Firestore Security Rules: deploy `firebase/firestore.rules`.

`firebase.json` points the Firebase CLI to the rules file.

## Web config

Add the Firebase Web App config to `window.PRESENTATION_FIREBASE_CONFIG` in `app/index.html`.

Firebase API keys for Firebase services are not authorization secrets, but Firestore access must be protected with Security Rules.

## Data model

```text
sessions/default/polls/{pollId}/votes/{uid}
```

The static app owns poll questions in code. The public client may read poll paths and may only write its own anonymous vote document with one of the option ids allowed in `firestore.rules`.

## Local testing without Firebase

Open the local preview with:

```text
http://127.0.0.1:8000/?pollMode=local
```

This stores votes in browser `localStorage` and is only for checking the interaction flow. It does not test Firestore writes or Security Rules.

Use `pollUser` to simulate different participants in separate tabs:

```text
http://127.0.0.1:8000/?pollMode=local&pollUser=teacher-a
http://127.0.0.1:8000/?pollMode=local&pollUser=teacher-b
```
