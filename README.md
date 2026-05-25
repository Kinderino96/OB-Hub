# Dashboard Hub — Deploy su Vercel

## 1. Configura le dashboard

Apri `lib/dashboards.js` e modifica l'array con i tuoi dati reali:

```js
{
  id: "nome-univoco",          // usato nell'URL: /dashboard/nome-univoco
  title: "Titolo dashboard",
  description: "Descrizione breve",
  url: "https://tuo-url.com/file.html",  // URL del file HTML
  password: "la-tua-password",
  category: "Categoria",
  icon: "📊",
  iconBg: "#e8f5e9",
  iconColor: "#2e7d32",
}
```

## 2. Deploy su Vercel

### Opzione A — da GitHub (consigliata)

1. Carica questa cartella su un repository GitHub (anche privato)
2. Vai su [vercel.com](https://vercel.com) → **Add New Project**
3. Importa il repository
4. Vercel rileva Next.js automaticamente → clicca **Deploy**

### Opzione B — da CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 3. Variabile d'ambiente (importante per sicurezza)

Nel pannello Vercel → **Settings → Environment Variables**, aggiungi:

| Nome | Valore |
|------|--------|
| `SESSION_SECRET` | una stringa casuale lunga almeno 32 caratteri |

Esempio di valore: `xK9#mP2$vL8nQw4rZjY6tH1cA5bE3fG7`

Se non la imposti, il sistema usa la chiave di fallback nel codice (meno sicuro).

## 4. Funzionamento

- **`/`** — hub con tutte le dashboard (🔒 bloccate, 🔓 già sbloccate)
- **`/login/[id]`** — pagina di login per la singola dashboard
- **`/dashboard/[id]`** — dashboard protetta (redirect al login se senza sessione)

Le sessioni durano **8 ore** e sono cookie `HttpOnly` — non accessibili da JavaScript.
Chi tenta di aprire direttamente `/dashboard/[id]` senza aver fatto login
viene reindirizzato automaticamente alla pagina password.

## 5. Aggiungere/modificare password

Modifica `lib/dashboards.js` e rideploya (su Vercel basta fare push su GitHub).
