import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getStatistics } from '../../../../store/reducers/profile/actions';
import StatisticsItem from './StatisticsItem';

function Statistics(): JSX.Element {
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => state.profile.statistics);
  const { userId } = useParams();
  const [formData, setFormData] = useState<{
    from: string,
    to: string
  }>({
    from: '',
    to: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(getStatistics({ id: Number(userId), from: formData.from, to: formData.to }));
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from" />
        <input type="date" id="from" name="from" required onChange={handleChange} />
        <label htmlFor="to" />
        <input type="date" name="to" id="to" required onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {statistics && statistics.map((stat) => <StatisticsItem {...stat} />) }
    </div>
  );
}

export default Statistics;
