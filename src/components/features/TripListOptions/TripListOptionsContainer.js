import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, createActionChangeTag, createActionChangeDuration} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeTag: tag => dispatch(createActionChangeTag(tag)),
  changeDuration: (type, value) => dispatch(createActionChangeDuration(type, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
