import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswerRepository = {
	create: async (answer: Answer) => {
		return
	}
}

test('create an answer', async () => {
	const answeQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

	const answer = await answeQuestion.execute({
		instructorId: '1',
		questionId: '1',
		content: 'Nova resposta'
	})

	expect(answer.content).toEqual('Nova resposta')
})