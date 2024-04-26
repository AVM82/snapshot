import Question from './IQuestion';

interface IFeedback {
  questions: Question[],
  feedback: string,
}

export default IFeedback;
