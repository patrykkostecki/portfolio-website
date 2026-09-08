# Firebase deploy (Next.js)

## 1) Ustaw `projectId`
W pliku `.firebaserc` podmień:

- `YOUR_FIREBASE_PROJECT_ID` -> Twój prawdziwy project id z Firebase Console

## 2) Zaloguj się do Firebase CLI
```bash
firebase login
```

## 3) Wdróż
```bash
npm run firebase:deploy
```

## 4) Jeśli CLI zgłasza problem z uprawnieniami do `~/.config`
```bash
sudo chown -R $USER:$(id -gn $USER) ~/.config
```

## 5) Jeśli chcesz ręcznie wskazać projekt (bez `.firebaserc`)
```bash
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```
