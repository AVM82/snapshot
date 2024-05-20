import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { getStatistics } from '../../../../store/reducers/profile/actions';
import StatisticsTable from './StatisticsTable';

function Statistics(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [fulfilled, setFulfilled] = useState(false);
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
    dispatch(getStatistics({ id: Number(userId), from: formData.from, to: formData.to })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') setFulfilled(!fulfilled);
    });
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
      {fulfilled && <StatisticsTable />}
    </div>
  );
}

export default Statistics;
