import IQuestion from "../../models/profile/IQuestion.ts";

function formatQuestionsWithLocalDate(questions:IQuestion[]) {
  return questions.map((question) => {
    const localDate = new Date(question.createdAt);
    const offsetMinutes = localDate.getTimezoneOffset();
    const actualDate = new Date(localDate.getTime() - (offsetMinutes * 60000));
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userDate = actualDate.toLocaleString(undefined, { timeZone: userTimeZone});
    const parts = userDate.split(', ');
    const trimmedTime = parts[1].slice(0, -3);

    const trimmedUserDate = `${parts[0]}, ${trimmedTime}`;
    return {
      ...question,
      createdAt: trimmedUserDate
    };
  });
}
export default formatQuestionsWithLocalDate
