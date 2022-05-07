import { Moon, Sun } from "phosphor-react"
import { useEffect, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const html = document.getElementsByTagName('html')[0]

  async function handleSetTheme() {
    setTheme((old) => old === 'dark' ? 'light' : 'dark')
    console.log(theme)
  }

  useEffect(() => {
    html.setAttribute('class', `${theme}`)
    localStorage.setItem('theme', `${theme}`)
  }, [theme])

  return (
    <>
      <header>
        <div
          className='absolute top-5 left-5 cursor-pointer'
          onClick={handleSetTheme}
        >
          {
            theme
              ?
              <Sun />
              :
              <Moon />
          }
        </div>
        <span className='text-xl leading-6'>Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className='dark:bg-zinc-800 bg-zinc-100 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              type='button'
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}