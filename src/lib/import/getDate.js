import moment from 'moment';

const getDate = vidDate => {
  const dateObj = new Date(vidDate);
  const unixTimestamp = moment(dateObj).unix();

  return unixTimestamp;
};

export default getDate;
