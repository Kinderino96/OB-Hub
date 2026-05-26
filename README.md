# OB Hub — Dashboard con autenticazione Clerk

## Come funziona

- Gli utenti accedono con **username + password** tramite Clerk
- Ogni utente vede solo le dashboard a cui ha accesso
- L'admin gestisce gli utenti dal pannello Clerk senza toccare il codice

---

## 1. Variabili d'ambiente su Vercel

Vai su **Settings → Environment Variables** e aggiungi:

| Nome | Valore |
|------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` |

---

## 2. Aggiungere utenti (da Clerk)

1. Vai su [dashboard.clerk.com](https://dashboard.clerk.com)
2. Seleziona il progetto **OB Hub**
3. Clicca su **Users → Create user**
4. Inserisci username e password
5. Clicca **Create**

---

## 3. Controllare chi vede cosa

Apri `lib/dashboards.js` e per ogni dashboard imposta `allowedUsers`:

```js
// Tutti gli utenti loggati possono vedere questa dashboard
allowedUsers: []

// Solo utenti specifici
allowedUsers: ["mario", "sara", "luca"]

// Solo un utente
allowedUsers: ["mario"]
```

Gli utenti vengono identificati tramite il loro **username** impostato su Clerk.

---

## 4. Aggiungere nuove dashboard

Aggiungi un oggetto in `lib/dashboards.js`:

```js
{
  id: "nome-univoco",
  title: "Titolo dashboard",
  description: "Descrizione breve",
  url: "/nome-file.html",       // file nella cartella public/
  category: "Categoria",
  icon: "📊",
  iconBg: "#e8f5e9",
  iconColor: "#2e7d32",
  allowedUsers: ["mario"],      // chi può vederla
}
```

Poi carica il file HTML corrispondente nella cartella `public/`.

---

## 5. Deploy su Vercel

1. Carica su GitHub
2. Importa su Vercel
3. Aggiungi le variabili d'ambiente
4. Deploy
