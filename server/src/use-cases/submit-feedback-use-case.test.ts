import { SubmitFeedback } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendEmail: sendEmailSpy }
)

describe('Submmit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,fd5g48'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toBeCalled()
    expect(sendEmailSpy).toBeCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,fd5g48'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,fd5g48'
    })).rejects.toThrow()
  })
  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'example.jpg'
    })).rejects.toThrow()
  })
})