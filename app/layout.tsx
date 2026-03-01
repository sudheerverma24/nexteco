import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NextECO - Premium Software Downloads",
    description: "Secure, high-performance software for Windows and Android.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased min-h-screen bg-slate-950 text-slate-50">
                {children}
            </body>
        </html>
    );
}
