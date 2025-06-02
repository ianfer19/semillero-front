import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const show = ref(false)
  const title = ref('')
  const message = ref('')
  const confirmText = ref('')
  const cancelText = ref('')
  let confirmCallback: (() => void) | null = null
  let cancelCallback: (() => void) | null = null

  function open({
    title: t,
    message: m,
    confirmText: cText = 'Confirm',
    cancelText: xText = 'Cancel',
    onConfirm,
    onCancel
  }: {
    title: string,
    message: string,
    confirmText?: string,
    cancelText?: string,
    onConfirm?: () => void,
    onCancel?: () => void
  }) {
    title.value = t
    message.value = m
    confirmText.value = cText
    cancelText.value = xText
    confirmCallback = onConfirm || null
    cancelCallback = onCancel || null
    show.value = true
  }

  function confirm() {
    show.value = false
    confirmCallback?.()
  }

  function cancel() {
    show.value = false
    cancelCallback?.()
  }

  return { show, title, message, confirmText, cancelText, open, confirm, cancel }
}) 