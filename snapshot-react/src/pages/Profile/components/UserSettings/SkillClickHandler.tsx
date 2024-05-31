import React from 'react';

type SkillClickHandlerProps = {
  id: number,
  name: string,
  childrenLength: number,
  handleSkillClick: (id: number, name: string) => void,
  children: React.ReactNode
};

function SkillClickHandler({ 
  id, name, childrenLength, handleSkillClick, children }: SkillClickHandlerProps): JSX.Element {
  const handleClick = (): void => {
    if (childrenLength === 0) {
      handleSkillClick(id, name);
    }
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

export default SkillClickHandler;

