type InterviewStatuses = 'PLANNED' | 'ACTIVE' | 'FINISHED' | 'COMPLETED' | 'CANCELLED' | '';

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
  questions: IQuestion[]
}
export type { IInterview, InterviewStatuses };

