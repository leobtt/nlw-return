import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestarted: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestarted,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setSreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const { title, image } = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault()

    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    })

    onFeedbackSent()
    setIsSendingFeedback(false)
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute dark:text-zinc-400 text-zinc-500 dark:hover:text-zinc-100 hover:text-zinc-800"
          onClick={onFeedbackRestarted}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className='text-xl leading-6 flex items-start gap-2'>
          <img src={image.source} alt={image.alt} className='w-6 h-6' />
          {title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm dark:placeholder-zinc-400 placeholder-zinc-500 dark:text-zinc-100 text-zinc-800 dark:border-zinc-600 border-zinc-300 rounded-md bg-transparent focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-200 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhers o que está acontecendo"
          onChange={(e) => setComment(e.target.value)}
        >

        </textarea>

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setSreenshot}
          />
          <button
            disabled={comment.length === 0 || isSendingFeedback}
            type="submit"
            className="p-2 bg-brand-500 text-zinc-100 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 focus:ring-offset-white focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : " Enviar feedback"}
          </button>
        </footer>
      </form>


    </>
  )
}