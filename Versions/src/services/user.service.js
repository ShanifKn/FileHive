import UserHelper from "../api/helpers/user.helper.js"

class UserService {

      constructor() {
            this.helper = new UserHelper()
      }

      async CreateNewUser({ name, email, password }) {
            return await this.helper.CreateNewUser({ name, email, password })
      }

      async UserLogin({ email, password }) {
            return await this.helper.UserLogin({ email, password })
      }


      async FindUserById({ _id }) {
            return await this.helper.FindUserById({ _id })
      }


}


export default UserService