import { DateRangePicker } from 'react-date-range';
import Addresse from '../../InputType/Addresse/Addresse';
import Button from '../../InputType/Button/Button';
import DateSelect from '../../InputType/DatePiker/DateSelect';
import DateRangeSelect from '../../InputType/DatePiker/DateRangeSelect';

import './InputSearch.scss';

function InputSearch() {
  return (
    <div className="inputSearch">
      <form>
        <Addresse style={undefined} />
        <Button prop={'Recherche'} />
      </form>
    </div>
  );
}

export default InputSearch;
