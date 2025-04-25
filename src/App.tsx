import { createSignal, onMount } from 'solid-js'
import './assets/App.css'
import parts from './parts.json'
import PWABadge from './PWABadge'

const pick = (source: string[]) => {
  return source[Math.floor(source.length * Math.random())]
}

const getPrompt = () => {
  let prompt = ""
  do {
    prompt += pick(parts.adjective) + ' '
  } while (Math.random() > 0.8)
  if (Math.random() > 0.5) {
    prompt += pick(parts.mod) + ' '
  }
  while (Math.random() > 0.75) {
    prompt += pick(parts.animal) + '/'
  }
  prompt = prompt.slice(0, -1)
  prompt += " " + pick(parts.jobs)
  return prompt
}

function App() {
  const [suggestion, setSuggestion] = createSignal("")
  onMount(() => {
    setSuggestion(getPrompt())
  })

  return (
    <>
      <div>You should draw {['a','e','i','o','u'].includes(suggestion().charAt(0)) ? 'an' : 'a'}</div>
      <div class="prompt">{suggestion()}</div>
      <button id="regenerate" on:click={() => {
        setSuggestion(getPrompt())
      }}>
        ↻
      </button>
      <PWABadge />
    </>
  )
}

export default App
