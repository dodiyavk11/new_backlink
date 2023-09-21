import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

  email: yup.string().email('You must enter a valid email').required('You must enter a email'),

  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {

  email: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ displayName, password, email }) {
    jwtService
      .createUser({
        displayName,
        password,
        email,
      })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-480 sm:w-480 mx-auto sm:mx-0">
          <img className="w-80 mx-auto" src="assets/images/logo/link_6994770.png" alt="logo" />

          <Typography className="mt-32 mx-auto text-center text-3xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex mx-auto text-center items-baseline mt-2 font-medium">
            <Typography className='text-sm mx-auto text-center'>Register for an account in the Selllinked Marketplace.</Typography>

          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >


            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />





            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                  <FormControlLabel
                    label="I read and accept the Terms of use and Privacy policy. Our product is only available for business customers. (B2B) The registration is protected with reCAPTCHA. The Google Privacy policy and Terms of use apply."
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
            <div className="flex items-baseline mt-2 mx-auto text-center font-medium">
              <Typography>Already have an account?</Typography>
              <Link className="ml-4" to="/sign-in">
                Sign in
              </Link>
            </div>
            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />

              <div className="flex-auto mt-px border-t" />
            </div>
            <div class="flex mt-20 space-x-16">
              <div className="w-2/5 "><Typography className='text-sm'>© s 2023</Typography></div>
              <div className="w-3/5 flex">
                <Typography className='text-sm mx-auto'>Terms of Service</Typography>
                <Typography className='text-sm mx-auto'>Privacy Policy</Typography>
                <Typography className='text-sm mx-auto'>Imprint</Typography></div>
            </div>


          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpPage;
