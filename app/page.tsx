import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Islamic Pattern Header */}
      <div className="relative h-[40vh] overflow-hidden bg-emerald-900">
        <div className="absolute inset-0 opacity-20 bg-[url('/islamic-pattern.svg')] bg-repeat bg-center"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-arabic">عيد مبارك</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">Create and share beautiful Eid greeting cards</p>
            <Link href="/create">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Create Your Card
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Share the joy of Eid with your loved ones</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <span className="text-2xl">🌙</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Eid ul Fitr</h3>
            <p className="text-muted-foreground">
              Create beautiful cards to celebrate the end of Ramadan with your family and friends.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <span className="text-2xl">🕋</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Eid ul Adha</h3>
            <p className="text-muted-foreground">
              Share the blessings of sacrifice and devotion with specially designed Eid ul Adha cards.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized</h3>
            <p className="text-muted-foreground">
              Customize colors, designs, and add personal messages to make your Eid greetings special.
            </p>
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Beautiful Card Designs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    i % 3 === 0
                      ? "from-emerald-500 to-emerald-700"
                      : i % 3 === 1
                        ? "from-blue-500 to-blue-700"
                        : "from-purple-500 to-purple-700"
                  }`}
                ></div>
                <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-repeat bg-center opacity-20"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{i <= 3 ? "Eid ul Fitr" : "Eid ul Adha"} Mubarak</h3>
                  <p className="text-sm text-center opacity-90">May Allah's blessings be with you today and always</p>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href="/create">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                      Customize This Design
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <p className="italic text-muted-foreground mb-4">
              "I sent these beautiful Eid cards to my family overseas. They loved the designs and personal touch!"
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                <span className="font-medium">AK</span>
              </div>
              <div>
                <p className="font-medium">Ahmed K.</p>
                <p className="text-sm text-muted-foreground">London, UK</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <p className="italic text-muted-foreground mb-4">
              "The Eid ul Adha designs are so beautiful. I shared cards with all my friends and received many
              compliments."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                <span className="font-medium">FZ</span>
              </div>
              <div>
                <p className="font-medium">Fatima Z.</p>
                <p className="text-sm text-muted-foreground">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to create your Eid card?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Spread joy and blessings this Eid with personalized greeting cards for your loved ones.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Eid Cards. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

