<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button :disabled="page === 1" @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-400 transition-all cursor-pointer">
      <span>Anteriores</span>
    </button>

    <button :disabled="hasMoreData" @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-400 transition-all cursor-pointer">
      <span>Siguientes</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page: number,
  hasMoreData: boolean
}

defineProps<Props>()

</script>
