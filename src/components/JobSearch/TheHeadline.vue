<template>
  <section class="mb-16">
    <h1 class="mb-14 pt-4 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Myszojeleń Corp</h2>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import nextElementInList from '@/utils/nextElementInList'

const action = ref('Build')
const interval = ref<ReturnType<typeof setInterval>>()

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true
  }
})

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
}

onMounted(changeTitle)

onBeforeUnmount(() => clearInterval(interval.value))

// export default {

//   },
//   created() {
//     this.changeTitle()
//   },
//   beforeUnmount() {
//     clearInterval(this.interval)
//   },
//   methods: {
//     changeTitle() {
//       this.interval = setInterval(() => {
//         const actions = ['Build', 'Create', 'Design', 'Code']
//         this.action = nextElementInList(actions, this.action)
//       }, 3000)
//     }
//   }
// }
</script>

<style scope>
span {
  transition: all 0.6s;
}

.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
