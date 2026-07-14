import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    console.log('hola mundo!');

    return {
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    };
  },
});
