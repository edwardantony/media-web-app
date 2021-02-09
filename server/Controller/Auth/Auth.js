import { userModel } from '../../Models/User/User';
import { userSessionModel } from '../../Models/UserSession/Session';
import { IncomingForm } from 'formidable';
import { genSalt, compare, hash } from 'bcrypt';

class AuthController {
  SignUp(request, response) {
    const form = new IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({ msg: 'Network Error: Failed to sign you up please try again later' });
        }

        const { firstname, lastname, email, password, tosAgreement } = fields;

        if (!firstname || !lastname || !email || !password || !tosAgreement) {
          return response.status(400).json({ msg: 'All fields are required' });
        }

        if (password.length < 6) {
          return response.status(400).json({ msg: 'Password has to be at least 6 characters long' });
        }

        const isEmailAlreadyExisting = await userModel.findOne({ email: email });

        if (isEmailAlreadyExisting) {
          return response.status(400).json({ msg: 'Account with this email already exist' });
        }

        const salt = await genSalt(15);
        const hashedPassword = await hash(password, salt);

        const newUser = new userModel({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          tosAgreement,
        });

        const savedUser = await newUser.save();

        return response.status(200).json({ msg: 'Accounr successfully created' });
      });
    } catch (error) {
      return response.status(500).json({ msg: 'Network Error: Failed to sign you up please try again later' });
    }
  }

  SignIn(request, response) {
    const form = new IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({ msg: 'Network Error: Failed to sign you in please try again later' });
        }

        const { email, password } = fields;

        if (!email || !password) {
          return response.status(400).json({ msg: 'All fields are required' });
        }

        const isUserExisting = await userModel.findOne({ email: email });

        if (!isUserExisting) {
          return response.status(404).json({ msg: 'Account with this email does not exist' });
        }

        const user = isUserExisting;
        const usersHashedPassword = user.password;
        const isPasswordValid = await compare(password, usersHashedPassword);

        if (!isPasswordValid) {
          return response.status(400).json({ msg: 'Invalid Credentials' });
        }

        const userSessionObject = {
          _id: user._id,
          email: user.email,
        };

        const isUserSessionExisting = await userSessionModel.findOne({ 'session.user._id': user._id });

        if (isUserSessionExisting) {
          return response.status(200).json({ msg: 'Already signed in' });
        }

        request.session.user = userSessionObject;

        return response.status(200).send(request.session);
      });
    } catch (error) {
      return response.status(500).json({ msg: 'Network Error: Failed to sign you in please try again later' });
    }
  }

  isUserLoggedIn(request, response) {
    try {
      const userSession = request.session;

      if (userSession) {
        return response.status(200).json({ auth_status: true });
      }

      return response.status(302).json({ auth_status: false });
    } catch (error) {
      return response.status(500).json({ msg: 'Network Error: Failed to validate user session please try again later' });
    }
  }
}

export { AuthController };
