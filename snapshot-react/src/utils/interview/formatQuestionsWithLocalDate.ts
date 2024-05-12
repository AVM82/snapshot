import IQuestion from '../../models/profile/IQuestion';

const formatToLocalDate = (date:string):Date => {
  const localDate = new Date(date);
  const offsetMinutes = localDate.getTimezoneOffset();

  return new Date(localDate.getTime() - (offsetMinutes * 60000));
};
const formatQuestionsWithLocalDate = (questions:IQuestion[]):IQuestion[] => questions.map((question) => {
  const date = formatToLocalDate(question.createdAt);
  const parts = date.toLocaleString().split(', ');
  const trimmedTime = parts[1].slice(0, -3);

  return {
    ...question,
    createdAt: `${parts[0]}, ${trimmedTime}`,
  };
});
export { formatQuestionsWithLocalDate, formatToLocalDate };
