import { IUser } from '../user/IUser';

type InterviewStatuses = 'PLANNED' | 'ACTIVE' | 'FINISHED' | 'COMPLETED' | 'CANCELLED';

interface IInterview {
  id:number,
  title :string
  status: InterviewStatuses
  interviewer: IUser
  searcher: IUser
  plannedDateTime:Date | null
  startDateTime:Date | null
  endDateTime:Date | null
  feedback: string
}
export type { IInterview, InterviewStatuses };
