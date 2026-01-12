<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">About</h1>
        <div class="prose prose-lg">
          <p class="text-gray-600 mb-4">
            This is a Nuxt 3 project template generated from the <strong>vue-nuxt</strong> template.
          </p>
          <p class="text-gray-600 mb-4">
            It includes:
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Nuxt 3 with Vue 3</li>
            <li>TypeScript support</li>
            <li>Tailwind CSS for styling</li>
            <li>File-based routing</li>
            <li>Auto-imports for components and composables</li>
          </ul>
        </div>
        
        <div class="mt-8">
          <NuxtLink
            to="/"
            class="text-indigo-600 hover:text-indigo-800 underline"
          >
            ← Back to home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
  meta: [
    { name: 'description', content: 'About page of {{projectName}}' }
  ]
})
</script>

