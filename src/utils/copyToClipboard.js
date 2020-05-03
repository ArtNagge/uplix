import { toast } from 'react-toastify'
import checkLang from './checkLang'

const copyToClipboard = (text) => {
  const lang = JSON.parse(localStorage.getItem('lang_source')).data

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')

    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
  toast(checkLang(lang, 'ref.copied'))
}

export default copyToClipboard
