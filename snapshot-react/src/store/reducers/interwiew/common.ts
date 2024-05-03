enum ActionType {
  GET_USER_BY_EMAIL = 'user/getUserByEmail',
  GET_ALL_SKILLS = 'skills/getAllSkills',
  GET_INTERVIEW_ID = 'interview/getInterviewById',
  Add_INTERVIEW = 'interview/addInterview',
  ADD_QUESTION_TO_SKILL = 'interview/skill/addQuestion',
  CHANGE_INTERVIEW_STATUS = 'interview/changeStatus',
  GET_SKILL_QUESTIONS_BY_ID = 'interview/getSkillQuestions',
}

export default ActionType;
