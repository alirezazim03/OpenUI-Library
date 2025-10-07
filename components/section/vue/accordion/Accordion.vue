<template>
  <div
    class="w-full border border-gray-200 dark:border-gray-700 rounded-2xl divide-y divide-gray-200 dark:divide-gray-700"
  >
    <div v-for="(item, index) in items" :key="index" class="group">
      <!-- Header -->
      <button
        @click="toggle(index)"
        class="w-full flex items-center justify-between py-4 px-5 text-left font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
      >
        <span>{{ item.title }}</span>
        <svg
          :class="[
            'w-5 h-5 transform transition-transform duration-300',
            openIndex === index ? 'rotate-180' : 'rotate-0',
          ]"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Content -->
      <transition
        enter-active-class="transition-all duration-300 ease-in-out"
        leave-active-class="transition-all duration-300 ease-in-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-screen opacity-100"
        leave-from-class="max-h-screen opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div
          v-show="openIndex === index"
          class="overflow-hidden px-5 pb-4 text-gray-600 dark:text-gray-300"
        >
          <!-- Slot or default content -->
          <slot :name="'content-' + index">{{ item.content }}</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Accordion items, e.g.
     * [{ title: 'Section 1', content: 'Content 1' }]
     */
    items: {
      type: Array,
      default: () => [
        {
          title: "What is Vue.js?",
          content: "Vue.js is a progressive framework for building UIs.",
        },
        {
          title: "What is TailwindCSS?",
          content: "TailwindCSS is a utility-first CSS framework.",
        },
        {
          title: "Why use both?",
          content: "Because they're fast, flexible, and fun!",
        },
      ],
    },
    /**
     * Whether multiple items can be open at once
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Index or indices of initially open items
     */
    defaultOpen: {
      type: [Number, Array],
      default: () => [],
    },
  },
  data() {
    return {
      openIndex: null,
      openIndexes: [], // for multiple mode
    }
  },
  watch: {
    defaultOpen: {
      handler(val) {
        if (this.multiple) {
          this.openIndexes = Array.isArray(val) ? val : [val]
        } else {
          this.openIndex = Array.isArray(val) ? val[0] : val
        }
      },
      immediate: true,
    },
  },
  methods: {
    toggle(index) {
      if (this.multiple) {
        if (this.openIndexes.includes(index)) {
          this.openIndexes = this.openIndexes.filter(i => i !== index)
        } else {
          this.openIndexes.push(index)
        }
      } else {
        this.openIndex = this.openIndex === index ? null : index
      }
    },
  },
}
</script>
