<template>
  <div :class="['min-h-screen transition-colors duration-300', isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50']">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="mb-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold dark:text-white">Eid Mubarak Cards</h1>
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <SunIcon v-if="isDarkMode" class="h-6 w-6 text-yellow-400" />
          <MoonIcon v-else class="h-6 w-6 text-gray-700" />
        </button>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Card Customization Panel -->
        <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 dark:text-white">Customize Your Card</h2>
          
          <!-- Eid Type Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Select Eid Type</label>
            <div class="flex space-x-4">
              <button 
                @click="eidType = 'fitr'" 
                :class="[
                  'px-4 py-2 rounded-md transition-colors',
                  eidType === 'fitr' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                Eid ul Fitr
              </button>
              <button 
                @click="eidType = 'adha'" 
                :class="[
                  'px-4 py-2 rounded-md transition-colors',
                  eidType === 'adha' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                Eid ul Adha
              </button>
            </div>
          </div>
          
          <!-- Names Input -->
          <div class="mb-6">
            <label for="sender" class="block text-sm font-medium mb-2 dark:text-gray-300">From</label>
            <input 
              id="sender" 
              v-model="sender" 
              type="text" 
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your name"
            />
          </div>
          
          <div class="mb-6">
            <label for="recipient" class="block text-sm font-medium mb-2 dark:text-gray-300">To</label>
            <input 
              id="recipient" 
              v-model="recipient" 
              type="text" 
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Recipient's name"
            />
          </div>
          
          <!-- Card Design Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Select Design</label>
            <div class="grid grid-cols-3 gap-2">
              <div 
                v-for="(design, index) in filteredDesigns" 
                :key="index"
                @click="selectedDesign = index"
                :class="[
                  'cursor-pointer border-2 rounded-md overflow-hidden h-20',
                  selectedDesign === index ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-700'
                ]"
              >
                <img :src="design.thumbnail" alt="Card design" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <!-- Color Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Select Color</label>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(color, index) in colors" 
                :key="index"
                @click="selectedColor = color.value"
                :class="[
                  'w-8 h-8 rounded-full cursor-pointer border-2',
                  selectedColor === color.value ? 'border-black dark:border-white' : 'border-transparent'
                ]"
                :style="{ backgroundColor: color.value }"
              ></div>
            </div>
          </div>
          
          <!-- Quote Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Select Quote</label>
            <select 
              v-model="selectedQuote" 
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option v-for="(quote, index) in filteredQuotes" :key="index" :value="index">
                {{ quote.text.substring(0, 30) }}...
              </option>
            </select>
          </div>
          
          <!-- Share Button -->
          <button 
            @click="shareCard" 
            class="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md font-medium transition-colors"
          >
            Share Card
          </button>
        </div>
        
        <!-- Card Preview -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">Preview</h2>
            
            <div 
              class="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3] max-w-2xl mx-auto"
              :style="{ backgroundColor: selectedColor }"
            >
              <!-- Card Design -->
              <img 
                :src="currentDesign.background" 
                alt="Card background" 
                class="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              
              <!-- Card Content -->
              <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h3 class="text-4xl font-bold text-white mb-4 drop-shadow-md">
                  {{ eidType === 'fitr' ? 'Eid ul Fitr Mubarak' : 'Eid ul Adha Mubarak' }}
                </h3>
                
                <p class="text-white text-lg mb-6 max-w-md drop-shadow-md">
                  {{ currentQuote.text }}
                </p>
                
                <div class="mt-auto w-full flex justify-between text-white">
                  <p class="font-medium drop-shadow-md">From: {{ sender || 'Your Name' }}</p>
                  <p class="font-medium drop-shadow-md">To: {{ recipient || 'Recipient' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Share Modal -->
    <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold mb-4 dark:text-white">Share Your Card</h3>
        <p class="mb-4 dark:text-gray-300">Copy this link to share your Eid card:</p>
        
        <div class="flex mb-4">
          <input 
            type="text" 
            readonly 
            :value="shareLink" 
            class="flex-grow px-3 py-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button 
            @click="copyShareLink" 
            class="bg-emerald-500 text-white px-4 py-2 rounded-r-md"
          >
            <ClipboardCopyIcon v-if="!copied" class="h-5 w-5" />
            <CheckIcon v-else class="h-5 w-5" />
          </button>
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="showShareModal = false" 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md dark:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SunIcon, MoonIcon, ClipboardCopyIcon, CheckIcon } from 'lucide-vue-next';

// State
const isDarkMode = ref(false);
const eidType = ref('fitr');
const sender = ref('');
const recipient = ref('');
const selectedDesign = ref(0);
const selectedColor = ref('#4CAF50');
const selectedQuote = ref(0);
const showShareModal = ref(false);
const copied = ref(false);

// Card designs
const designs = [
  // Eid ul Fitr designs
  {
    type: 'fitr',
    background: 'https://placehold.co/600x400/4CAF50/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/4CAF50/FFFFFF',
    name: 'Crescent Moon'
  },
  {
    type: 'fitr',
    background: 'https://placehold.co/600x400/2196F3/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/2196F3/FFFFFF',
    name: 'Lanterns'
  },
  {
    type: 'fitr',
    background: 'https://placehold.co/600x400/9C27B0/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/9C27B0/FFFFFF',
    name: 'Mosque Silhouette'
  },
  // Eid ul Adha designs
  {
    type: 'adha',
    background: 'https://placehold.co/600x400/F44336/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/F44336/FFFFFF',
    name: 'Kaaba'
  },
  {
    type: 'adha',
    background: 'https://placehold.co/600x400/FF9800/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/FF9800/FFFFFF',
    name: 'Sacrifice'
  },
  {
    type: 'adha',
    background: 'https://placehold.co/600x400/009688/FFFFFF',
    thumbnail: 'https://placehold.co/100x80/009688/FFFFFF',
    name: 'Pilgrimage'
  }
];

// Color options
const colors = [
  { name: 'Green', value: '#4CAF50' },
  { name: 'Blue', value: '#2196F3' },
  { name: 'Purple', value: '#9C27B0' },
  { name: 'Red', value: '#F44336' },
  { name: 'Orange', value: '#FF9800' },
  { name: 'Teal', value: '#009688' }
];

// Quotes
const quotes = [
  // Eid ul Fitr quotes
  {
    type: 'fitr',
    text: 'May the blessings of Allah fill your life with happiness and open all the doors of success now and always.'
  },
  {
    type: 'fitr',
    text: 'After a month of devotion and reflection, may Allah\'s blessings light up your path and lead you to happiness, success, and prosperity.'
  },
  {
    type: 'fitr',
    text: 'May this Eid bring joy, health, and wealth to you and your family.'
  },
  // Eid ul Adha quotes
  {
    type: 'adha',
    text: 'May the divine blessings of Allah bring you hope, faith, and joy on Eid ul Adha and forever. Happy Eid ul Adha!'
  },
  {
    type: 'adha',
    text: 'May Allah accept your sacrifice and shower you with his divine blessings.'
  },
  {
    type: 'adha',
    text: 'On this Eid ul Adha, may your faith in Allah bring you peace and prosperity.'
  }
];

// Computed properties
const filteredDesigns = computed(() => {
  return designs.filter(design => design.type === eidType.value);
});

const currentDesign = computed(() => {
  const designsOfType = filteredDesigns.value;
  const index = selectedDesign.value < designsOfType.length ? selectedDesign.value : 0;
  return designsOfType[index];
});

const filteredQuotes = computed(() => {
  return quotes.filter(quote => quote.type === eidType.value);
});

const currentQuote = computed(() => {
  const quotesOfType = filteredQuotes.value;
  const index = selectedQuote.value < quotesOfType.length ? selectedQuote.value : 0;
  return quotesOfType[index];
});

const shareLink = computed(() => {
  // In a real app, this would generate a shareable link with parameters
  return `https://eidcards.example.com/share?eid=${eidType.value}&design=${selectedDesign.value}&color=${encodeURIComponent(selectedColor.value)}&quote=${selectedQuote.value}&from=${encodeURIComponent(sender.value)}&to=${encodeURIComponent(recipient.value)}`;
});

// Methods
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const shareCard = () => {
  showShareModal.value = true;
};

const copyShareLink = () => {
  navigator.clipboard.writeText(shareLink.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style>
.dark {
  color-scheme: dark;
}
</style>

