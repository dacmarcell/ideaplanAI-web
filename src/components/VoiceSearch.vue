<template>
  <div>
    <button
      v-if="!isRecording"
      type="button"
      @click="startRecording"
      :disabled="isRecording"
      class="icon-button"
    >
      <FontAwesomeIcon
        :icon="faMicrophone"
        :class="isRecording ? 'inactive' : 'active'"
      />
    </button>
    <button
      v-if="isRecording"
      type="button"
      @click="stopRecording"
      :disabled="!isRecording"
      class="icon-button"
    >
      <FontAwesomeIcon
        :icon="faStopCircle"
        :class="!isRecording ? 'inactive' : 'active'"
      />
    </button>
    <div v-for="(clip, index) in audioClips" :key="index" class="clip">
      <audio :src="clip.url" controls></audio>
      <p>{{ clip.name }}</p>
      <button @click="deleteClip(index)" class="delete-button">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const isRecording = ref(false)
const chunks = ref<Blob[]>([])
const audioClips = ref<{ name: string; url: string }[]>([])
let mediaRecorder: MediaRecorder | null = null

const startRecording = async () => {
  if (!navigator.mediaDevices) {
    alert('Microphone feature not supported on your browser!')
    return
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = event => {
      chunks.value.push(event.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.value, { type: 'audio/ogg; codecs=opus' })
      const url = URL.createObjectURL(blob)
      audioClips.value.push({ name: new Date().getTime().toString(), url })
      chunks.value = []
    }

    mediaRecorder.start()
    isRecording.value = true
  } catch (error) {
    alert('Oops! An error ocurred while trying to record your audio.')
    console.error(error)
  }
}

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

const deleteClip = (index: number) => audioClips.value.splice(index, 1)
</script>
<style scoped>
.icon-button {
  background: transparent;
  cursor: pointer;
  border: none;
  font-size: 24px;
  margin: 5px;
  color: var(--background-secoundary-color);
}
.icon-button .active {
  color: red;
}
.icon-button .inactive {
  color: gray;
}
.clip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.delete-button {
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: red;
}
</style>
