<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger -->
    <button
      @click="toggle"
      class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none"
      :class="buttonClasses"
    >
      {{ label }}
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            v-for="(item, index) in items"
            :key="index"
            @click="handleItemClick(item)"
            class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 transition"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Menu' },
  items: {
    type: Array,
    default: () => [
      { label: 'Profile', action: () => console.log('Profile clicked') },
      { label: 'Settings', action: () => console.log('Settings clicked') },
      { label: 'Logout', action: () => console.log('Logout clicked') },
    ],
  },
  variant: { type: String, default: 'primary' }, // 'primary', 'secondary', 'outline'
})

const open = ref(false)
const dropdownRef = ref(null)

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    case 'outline':
      return 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
    default:
      return 'bg-blue-600 hover:bg-blue-700 text-white'
  }
})

function toggle() {
  open.value = !open.value
}

function handleItemClick(item) {
  if (typeof item.action === 'function') item.action()
  open.value = false
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
