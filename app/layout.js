import localFont from "next/font/local";
import "./globals.css";
import SideNavbar from "../components/SideNavbar"
import { Work_Sans, Nunito } from 'next/font/google'
import TopBar from "../components/TopBar"

const workSans = Work_Sans({ 
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: 'swap', 
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: 'swap',
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: "Infinion Project",
  description: "A pre interview test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${nunito.variable} antialiased flex`}
      >
        <SideNavbar />
        <div className="w-full flex flex-col">
          <TopBar />
          {children}
        </div>
        
      </body>
    </html>
  );
}
