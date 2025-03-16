"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, ChevronLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Card designs
const designs = [
  // Eid ul Fitr designs
  {
    type: "fitr",
    background: "https://placehold.co/600x400/4CAF50/FFFFFF",
    thumbnail: "https://placehold.co/100x80/4CAF50/FFFFFF",
    name: "Crescent Moon",
  },
  {
    type: "fitr",
    background: "https://placehold.co/600x400/2196F3/FFFFFF",
    thumbnail: "https://placehold.co/100x80/2196F3/FFFFFF",
    name: "Lanterns",
  },
  {
    type: "fitr",
    background: "https://placehold.co/600x400/9C27B0/FFFFFF",
    thumbnail: "https://placehold.co/100x80/9C27B0/FFFFFF",
    name: "Mosque Silhouette",
  },
  // Eid ul Adha designs
  {
    type: "adha",
    background: "https://placehold.co/600x400/F44336/FFFFFF",
    thumbnail: "https://placehold.co/100x80/F44336/FFFFFF",
    name: "Kaaba",
  },
  {
    type: "adha",
    background: "https://placehold.co/600x400/FF9800/FFFFFF",
    thumbnail: "https://placehold.co/100x80/FF9800/FFFFFF",
    name: "Sacrifice",
  },
  {
    type: "adha",
    background: "https://placehold.co/600x400/009688/FFFFFF",
    thumbnail: "https://placehold.co/100x80/009688/FFFFFF",
    name: "Pilgrimage",
  },
]

// Color options
const colors = [
  { name: "Green", value: "#4CAF50" },
  { name: "Blue", value: "#2196F3" },
  { name: "Purple", value: "#9C27B0" },
  { name: "Red", value: "#F44336" },
  { name: "Orange", value: "#FF9800" },
  { name: "Teal", value: "#009688" },
]

// Quotes
const quotes = [
  // Eid ul Fitr quotes
  {
    type: "fitr",
    text: "May the blessings of Allah fill your life with happiness and open all the doors of success now and always.",
  },
  {
    type: "fitr",
    text: "After a month of devotion and reflection, may Allah's blessings light up your path and lead you to happiness, success, and prosperity.",
  },
  {
    type: "fitr",
    text: "May this Eid bring joy, health, and wealth to you and your family.",
  },
  // Eid ul Adha quotes
  {
    type: "adha",
    text: "May the divine blessings of Allah bring you hope, faith, and joy on Eid ul Adha and forever. Happy Eid ul Adha!",
  },
  {
    type: "adha",
    text: "May Allah accept your sacrifice and shower you with his divine blessings.",
  },
  {
    type: "adha",
    text: "On this Eid ul Adha, may your faith in Allah bring you peace and prosperity.",
  },
]

export default function CardCreator() {
  const [eidType, setEidType] = useState("fitr")
  const [sender, setSender] = useState("")
  const [recipient, setRecipient] = useState("")
  const [selectedDesign, setSelectedDesign] = useState(0)
  const [selectedColor, setSelectedColor] = useState("#4CAF50")
  const [selectedQuote, setSelectedQuote] = useState("0")
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // Reset selected design when eid type changes
  useEffect(() => {
    setSelectedDesign(0)
    setSelectedQuote("0")
  }, [eidType])

  // Filtered designs based on eid type
  const filteredDesigns = designs.filter((design) => design.type === eidType)

  // Current design
  const currentDesign = filteredDesigns[selectedDesign] || filteredDesigns[0]

  // Filtered quotes based on eid type
  const filteredQuotes = quotes.filter((quote) => quote.type === eidType)

  // Current quote
  const currentQuote = filteredQuotes[Number.parseInt(selectedQuote)] || filteredQuotes[0]

  // Share link
  const shareLink = `https://eidcards.example.com/share?eid=${eidType}&design=${selectedDesign}&color=${encodeURIComponent(selectedColor)}&quote=${selectedQuote}&from=${encodeURIComponent(sender)}&to=${encodeURIComponent(recipient)}`

  // Copy share link
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create Your Eid Card</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Customization Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Eid Type Selection */}
                  <div>
                    <Label className="mb-2 block">Select Eid Type</Label>
                    <Tabs defaultValue="fitr" value={eidType} onValueChange={setEidType} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fitr">Eid ul Fitr</TabsTrigger>
                        <TabsTrigger value="adha">Eid ul Adha</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Names Input */}
                  <div>
                    <Label htmlFor="sender" className="mb-2 block">
                      From
                    </Label>
                    <Input
                      id="sender"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="recipient" className="mb-2 block">
                      To
                    </Label>
                    <Input
                      id="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Recipient's name"
                    />
                  </div>

                  {/* Card Design Selection */}
                  <div>
                    <Label className="mb-2 block">Select Design</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {filteredDesigns.map((design, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedDesign(index)}
                          className={`cursor-pointer border-2 rounded-md overflow-hidden h-20 ${
                            selectedDesign === index ? "border-primary" : "border-muted"
                          }`}
                        >
                          <img
                            src={design.thumbnail || "/placeholder.svg"}
                            alt={design.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <Label className="mb-2 block">Select Color</Label>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center">
                          <RadioGroupItem value={color.value} id={`color-${index}`} className="sr-only" />
                          <Label
                            htmlFor={`color-${index}`}
                            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                              selectedColor === color.value ? "border-black dark:border-white" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.value }}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quote Selection */}
                  <div>
                    <Label htmlFor="quote" className="mb-2 block">
                      Select Quote
                    </Label>
                    <Select value={selectedQuote} onValueChange={setSelectedQuote}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a quote" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredQuotes.map((quote, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {quote.text.substring(0, 30)}...
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Share Button */}
                  <Button onClick={() => setShowShareModal(true)} className="w-full bg-primary hover:bg-primary/90">
                    Share Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>

                <div
                  className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3] max-w-2xl mx-auto"
                  style={{ backgroundColor: selectedColor }}
                >
                  {/* Card Design */}
                  <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-repeat bg-center opacity-20"></div>
                  <img
                    src={currentDesign.background || "/placeholder.svg"}
                    alt="Card background"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />

                  {/* Card Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-md font-arabic">
                      {eidType === "fitr" ? "عيد الفطر مبارك" : "عيد الأضحى مبارك"}
                    </h3>
                    <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                      {eidType === "fitr" ? "Eid ul Fitr Mubarak" : "Eid ul Adha Mubarak"}
                    </h4>

                    <p className="text-white text-lg mb-6 max-w-md drop-shadow-md">{currentQuote.text}</p>

                    <div className="mt-auto w-full flex justify-between text-white">
                      <p className="font-medium drop-shadow-md">From: {sender || "Your Name"}</p>
                      <p className="font-medium drop-shadow-md">To: {recipient || "Recipient"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Card</DialogTitle>
            <DialogDescription>Copy this link to share your Eid card</DialogDescription>
          </DialogHeader>

          <div className="flex mb-4">
            <Input readOnly value={shareLink} className="flex-grow rounded-r-none" />
            <Button onClick={copyShareLink} className="rounded-l-none" variant="secondary">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

