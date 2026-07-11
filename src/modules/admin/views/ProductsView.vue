<template>
  <div class="bg-white px-5 py-4 rounded-2xl">
    <h1 class="text-3xl">Products</h1>

    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th class="w-28 py-3 px-4 uppercase font-semibold text-sm">Price</th>
              <th class="w-60 py-3 px-4 uppercase font-semibold text-sm">Sizes</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{
                'bg-gray-100': index % 2 === 0,
              }"
            >
              <td class="text-left py-3 px-4">
                <img :src="product.images[0]" :alt="product.title" class="h-10 w-10 object-cover" />
              </td>
              <td class="text-left py-3 px-4">
                <RouterLink :to="`/admin/products/${product.id}`">{{ product.title }}</RouterLink>
              </td>
              <td class="text-left py-3 px-4">
                <span> ${{ product.price }} </span>
              </td>
              <td class="text-left py-3 px-4">
                {{ product.sizes.join(',') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonPagination from '@/modules/common/componentes/ButtonPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsAction } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const queryClient = useQueryClient();
const { page } = usePagination();

const { data: products = [] } = useQuery({
  queryKey: ['products', { page }],
  queryFn: () => getProductsAction(page.value),
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1),
  });
});
</script>
