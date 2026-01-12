<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Welcome to {{projectName}}
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          A modern Nuxt 3 application with TypeScript and Tailwind CSS
        </p>
        
        <div class="flex justify-center gap-4 mb-12">
          <NuxtLink
            to="/about"
            class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            About
          </NuxtLink>
          <a
            href="https://nuxt.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-white text-indigo-600 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Documentation
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            title="TypeScript"
            description="Full TypeScript support with strict type checking"
            icon="⚡"
          />
          <FeatureCard
            title="Tailwind CSS"
            description="Utility-first CSS framework for rapid UI development"
            icon="🎨"
          />
          <FeatureCard
            title="Auto-imports"
            description="Components, composables, and utilities auto-imported"
            icon="🚀"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
  meta: [
    { name: 'description', content: 'Home page of {{projectName}}' }
  ]
})
</script>

