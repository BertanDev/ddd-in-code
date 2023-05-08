import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/repositories/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Test Comment',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Test Comment',
    )
  })
})
