export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>Header</h1>
        <div style={{border: "1px solid black"}}>
          {children}
        </div>
      </body>
    </html>
  );
}
