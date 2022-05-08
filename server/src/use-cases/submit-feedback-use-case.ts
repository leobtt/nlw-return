import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedback {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private NodemailerEmailAdapter: MailAdapter
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    if (!type) {
      throw new Error('type is required.')
    }

    if (!comment) {
      throw new Error('comment is required.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.NodemailerEmailAdapter.sendEmail({
      subject: 'Novo feedback',
      body: [
        `<div style="
            width: 600px;
            margin: 0 auto;
          ">
        `,
        `
        <header style="
          text-align: center;
          background-color: #8257E5;
          padding: 60px 0;
          color: #fff;
          font-weight: bold;
          font-size: 32px;
          box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
          text-shadow: 0px 2px 2px rgba(0,0,0,0.5);
          font-family:  'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        ">`,
        `Feedback da aplicação`,
        `</header>`,
        `
        <div style="
          background-color: #996DFF;
          padding: 10px 0;
          color: white;
          font-size: 10px;
          text-align: center;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          box-shadow: 0px 3px 5px rgba(0,0,0,0.5);
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        ">`,
        `Tipo do feedback:`,
        ` 
        <div style="
          color: yellow;
          font-weight: bold;
          font-size: 20px;
          letter-spacing: .2rem;
          ">${type}</div>
        </div>
        `,
        `
        <div style="
          max-width: 300px;
          margin: 0 auto;
          padding-top: 20px;
        ">
        `,
        `
        <h2 style="text-align:center; font-family: 'Arial', sans-serif;">Relato</h2>
        `,
        `<p style="text-align: justify;font-size: 18px;">${comment}</p> `,
        `</div>`,
        `<div style="
          border: 1px solid #996DFF;
          margin-top: 40px;
        "></div>`,
        screenshot ?
          `<image src="${screenshot}" width="800" style="margin: 0 auto;" />`
          :
          ``,
        `</div>`
      ].join('\n')
    })
  }
}

