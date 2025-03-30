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
import html2canvas from "html2canvas" // Import html2canvas

// Card designs
const designs = [
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

  // Function to download the card as an image
  const downloadCard = async () => {
    const cardElement = document.getElementById("card-preview") // Reference the card preview element
    if (!cardElement) return

    try {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(cardElement, {
        useCORS: true, // Enable cross-origin resource sharing for external images
        scale: 2, // Increase resolution for better quality
      });

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "eid-card.png";
      document.body.appendChild(link); // Append the link to the document
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link after download
    } catch (error) {
      console.error("Failed to generate image:", error)
    }
  }

  // Function to share the card using the Browser Share API
  const shareCard = async () => {
    const cardElement = document.getElementById("card-preview") // Reference the card preview element
    if (!cardElement) return

    try {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(cardElement, {
        useCORS: true, // Enable cross-origin resource sharing for external images
        scale: 2, // Increase resolution for better quality
      });

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Convert the data URL to a Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Check if the browser supports the Share API
      if (navigator.share) {
        const file = new File([blob], "eid-card.png", { type: "image/png" });

        // Use the Share API to share the image
        await navigator.share({
          title: "Eid Card",
          text: "Check out this Eid card I created!",
          files: [file], // Share the image file
        });
      } else {
        alert("Your browser does not support the Share API.");
      }
    } catch (error) {
      console.error("Failed to share the card:", error);
    }
  }

  // Reset selected design and quote when eid type changes
  useEffect(() => {
    setSelectedDesign(0)
    setSelectedQuote("0")
  }, [eidType])

  const filteredDesigns = designs.filter((design) => design.type === eidType)
  const currentDesign = filteredDesigns[selectedDesign] || filteredDesigns[0]
  const filteredQuotes = quotes.filter((quote) => quote.type === eidType)
  const currentQuote = filteredQuotes[Number.parseInt(selectedQuote)] || filteredQuotes[0]

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

                  {/* Share and Download Buttons */}
                  <Button onClick={shareCard} className="w-full bg-primary hover:bg-primary/90">
                    Share Card
                  </Button>
                  <Button onClick={downloadCard} className="mt-4 w-full bg-primary hover:bg-primary/90">
                    Download Card
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
                  id="card-preview" // Add an ID to the card preview container
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
    </div>
  )
}