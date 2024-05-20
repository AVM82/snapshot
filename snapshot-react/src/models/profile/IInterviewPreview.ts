import { InterviewStatuses } from './IInterview';

interface IInterviewPreview {
  id: number,
  title: string,
  status: InterviewStatuses,
  interviewerFullName: string,
  searcherFullName: string,
  plannedDateTime: string,
  startDateTime: string,
  endDateTime: string
}

export default IInterviewPreview;
