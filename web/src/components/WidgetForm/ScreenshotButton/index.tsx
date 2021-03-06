import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null
  onScreenshotTook: (screenshot: string | null) => void
}

export function ScreenshotButton({ onScreenshotTook, screenshot }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTook(base64image)

    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type='button'
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end test-zinc-400 dark:hover:text-zinc-100 hover:text-zinc-800 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
        onClick={() => onScreenshotTook(null)}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 dark:bg-zinc-800 bg-zinc-100 rounded-md border-transparent dark:hover:bg-zinc-700 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 focus:ring-offset-white focus:ring-brand-500 transition-colors"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ?
        <Loading />
        :
        <Camera className="w-6 h-6" />
      }
    </button>
  )
}