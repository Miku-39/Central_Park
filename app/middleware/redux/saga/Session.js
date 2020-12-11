import { call, put } from 'redux-saga/effects'

import { login, isLogging, logged, loginFailed } from '../actions/Session'
import api from '../../api'

function * loginSaga(action) {
    const { user, password } = action.payload
    yield put(isLogging())

    try {
        const loginResponse = yield call(api.login, user, password)

        const { access_token } = loginResponse.data
        yield call(api.setAuthHeader, access_token)

        const sessionResponse = yield call(api.authorize)
        const { id, name, companyId, accountId, department,
           accountName, roles, company } = sessionResponse.data

        const phone = (yield call(api.fetchPhone, id)).data[0].phone
        const carParkings = (yield call(api.fetchParkingsForCars)).data
        const isLesnaya = accountId == '14366'
        console.log(phone)
        const session = {
            token: access_token,
            userId: id,
            user: name,
            companyId: companyId,
            accountId: accountId,
            account: accountName,
            roles: roles,
            carParkings: carParkings,
            isLesnaya: isLesnaya,
            department: company.departmentId,
            departmentId: department,
            phone: phone
            //goodsParkings: goodsParkings,
            //services: services
        }

        //yield put(isLogging(false))
        yield put(logged(session))
    }
    catch (error) {
        //yield put(isLogging(false))
        yield put(loginFailed(error.message))
    }
}

export default loginSaga
