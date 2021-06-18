import { fork } from 'redux-saga/effects';
import personalInfSaga from './user.sage';
import companyInfSaga from './company.saga';
import schoolInfSaga from './school.saga';
import managerInfSaga from './manager.saga';
import leaderInfSaga from './leader.saga';
import internsInfSaga from './interns.saga';
import facultyInfSaga from './faculty.saga';
import homeInfSaga from './home.saga';
export default function* mySaga() {
  yield fork(personalInfSaga);
  yield fork(companyInfSaga);
  yield fork(schoolInfSaga);
  yield fork(managerInfSaga);
  yield fork(leaderInfSaga);
  yield fork(internsInfSaga);
  yield fork(facultyInfSaga);
  yield fork(homeInfSaga);
}
