import fireDb from '../../firebase';
import { fireDbAuth } from '../../firebase';
import axios from 'axios';

class Auth {
  async SignIn(email, password) {
    const response = await fireDbAuth.signInWithEmailAndPassword(email, password);

    return response;
  }

  async SignUp(email, password, firstname, lastname, tosAgreement) {
    let signUpSuccessObj;
    fireDbAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      signUpSuccessObj = res;
    });
    const baseURL = {
      dev: 'http://localhost:5000/api/user-signup',
      prod: '',
    };
    const url = process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('tosAgreement', tosAgreement);

    try {
      const response = await axios.post(url, formData, { withCredentials: true });
      console.log(signUpSuccessObj);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { Auth };
