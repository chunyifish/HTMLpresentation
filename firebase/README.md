# Firebase setup

This project uses Firebase only for anonymous live polls in the static web presentation.

## Required services

- Firebase Authentication: enable Anonymous sign-in.
- Cloud Firestore: create a Firestore database.
- Firestore Security Rules: deploy `firebase/firestore.rules`.

`firebase.json` points the Firebase CLI to the rules file.

## Web config

The Firebase Web App config is stored in `window.PRESENTATION_FIREBASE_CONFIG` in `app/index.html` and `app/vote.html`.

Firebase API keys for Firebase services are not authorization secrets, but Firestore access must be protected with Security Rules.

## Data model

```text
sessions/default
- activePollId
- updatedAt

sessions/default/polls/{pollId}/votes/{uid}
```

The static app owns poll questions in code. The presentation writes `sessions/default.activePollId` when the instructor reaches or leaves a poll slide. The student voting page listens to that value and only shows the currently open poll.

The public client may read poll paths and may only write its own anonymous vote document with one of the option ids allowed in `firestore.rules`.

## Local testing without Firebase

Open the local preview with:

```text
http://127.0.0.1:8000/app/?pollMode=local
http://127.0.0.1:8000/app/vote.html?pollMode=local
```

This stores votes and the active poll id in browser `localStorage` and is only for checking the interaction flow. It does not test Firestore writes or Security Rules.

Use `pollUser` to simulate different participants in separate tabs:

```text
http://127.0.0.1:8000/app/?pollMode=local&pollUser=teacher-a
http://127.0.0.1:8000/app/vote.html?pollMode=local&pollUser=student-a
```
