import IInterviewPreview from '../../models/profile/IInterviewPreview';
import { formatToLocalDate } from '../interview/formatQuestionsWithLocalDate';

const getPlannedInterviews = (interviews: IInterviewPreview[]): IInterviewPreview[] => interviews.filter((
  interview,
) => interview.status === 'PLANNED');

const getNearestInterview = (plannedInterviews: IInterviewPreview[]): IInterviewPreview | undefined => {
  if (plannedInterviews.length === 0) return undefined;

  if (plannedInterviews.length === 1) return { ...plannedInterviews[0] };

  return plannedInterviews.reduce((nearest, current) => {
    const nearestTime = new Date(nearest.plannedDateTime).getTime();
    const currentTime = new Date(current.plannedDateTime).getTime();

    return currentTime < nearestTime ? current : nearest;
  });
};

const getTimeToInterview = (interviews: IInterviewPreview[]): number => {
  if (!interviews) return 0;

  const plannedInterviews = getPlannedInterviews(interviews);
  const nearestInterview = getNearestInterview(plannedInterviews);
  let nearestInterviewTime:number;

  if (nearestInterview) {
    const actualDate = formatToLocalDate(nearestInterview.plannedDateTime);
    nearestInterviewTime = actualDate.getTime();
  } else {
    nearestInterviewTime = 0;
  }
  const currentTime = new Date().getTime();

  return nearestInterviewTime - currentTime;
};

export default getTimeToInterview;
