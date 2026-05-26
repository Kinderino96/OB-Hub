import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "OB Hub",
  description: "Accesso centralizzato ai cruscotti aziendali",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="it">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f4f0" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
