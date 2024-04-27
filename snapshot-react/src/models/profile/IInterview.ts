type InterviewStatuses = 'prepare' | 'start' | 'finish' | 'end';

interface IInterview {
  id:number,
  title :string
  status: InterviewStatuses
  interviewer_id: number
  searcher_id: number
  planned_date_time:Date | null
  start_date_time:Date | null
  end_date_time:Date | null
  feedback: string
}
export type { IInterview, InterviewStatuses };