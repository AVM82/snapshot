import { IInterview } from '../../models/profile/IInterview';
import IInterviewPreview from '../../models/profile/IInterviewPreview';

function buildInterviewPreview(payload: IInterview): IInterviewPreview {
  return {
    id: payload.id,
    title: payload.title,
    interviewerFullName: `${payload.interviewer.username} ${payload.interviewer.lastname}`,
    searcherFullName: `${payload.searcher.username} ${payload.searcher.lastname}`,
    status: payload.status || 'PLANNED',
    startDateTime: String(payload.startDateTime),
    endDateTime: String(payload.endDateTime),
    plannedDateTime: String(payload.plannedDateTime),
  };
}
export default buildInterviewPreview;
