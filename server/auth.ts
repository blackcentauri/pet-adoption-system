'use server';

import { AdminSignUpSchema, SignInSchema, UserSignUpSchema } from '@/lib/auth';
import { ActionResponse } from './response';
import {
  getOrganizationInfo,
  getUserInfo,
  getUsername,
  insertOrganization,
  insertUser,
  verifyPassword,
} from '@/model/user';
import { createSession } from '@/lib/session';

export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Validate form data using zod sign in schema
    const validateResult = SignInSchema.safeParse(data);

    if (!validateResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        error: 'An error occured while validating',
        errors: validateResult.error.flatten().fieldErrors,
      };
    }

    // Query user info if it exists
    const userInfo = await getUserInfo(data.email);

    if (
      !userInfo.success ||
      userInfo.data === null ||
      typeof userInfo.data !== 'object'
    ) {
      return {
        success: false,
        message: 'User does not exists',
        error: 'No user found',
        errors: {
          email: ['Invalid email or password'],
        },
      };
    }

    // Validate user password
    const isPasswordValid = await verifyPassword(
      data.password,
      userInfo.data?.password
    );

    if (!isPasswordValid.success) {
      return {
        success: false,
        message: 'Invalid username or password',
        error: 'Invalid username or password',
      };
    }

    // Type check if role and username is string and not null
    if (
      typeof userInfo.data.username !== 'string' ||
      typeof userInfo.data.role !== 'string'
    ) {
      return {
        success: false,
        message: 'Invalid user data',
        error: 'User information is incomplete',
      };
    }

    // Create session using JWT token
    const session = await createSession(
      userInfo.data.user_id,
      userInfo.data.username,
      userInfo.data.role
    );

    // Checks if session creation is successful
    if (!session) {
      return {
        success: false,
        message: 'Failed to create session',
        error: 'Session failed',
      };
    }

    // Return true if successful
    return {
      success: true,
      message: 'Sign in successfully!',
    };
  } catch (error) {
    console.error('An error occured while signing you in', error);
    return {
      success: false,
      message: 'Sign in failed. An error occured',
      error: 'Failed to validate information. An error occured',
    };
  }
}

export async function userSignUp(formData: FormData): Promise<ActionResponse> {
  try {
    // Get form data
    const data = {
      firstName: formData.get('firstname') as string,
      lastName: formData.get('lastname') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate form input using zod
    const validateResult = UserSignUpSchema.safeParse(data);

    if (!validateResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.flatten().fieldErrors,
      };
    }

    // Checks if the user already exists
    const isUserEmailExists = await getUserInfo(data.email);

    if (isUserEmailExists.success) {
      return {
        success: false,
        message: 'User exists',
      };
    }

    // Checks if the username already exists
    const isUsernameExists = await getUsername(data.username);

    if (isUsernameExists.success) {
      return {
        success: false,
        message: 'Username already exists',
      };
    }

    // Insert user data to the database
    const createUser = await insertUser(
      data.firstName,
      data.lastName,
      data.username,
      data.email,
      data.password
    );

    if (
      !createUser.success ||
      createUser.data === null ||
      createUser.data === undefined ||
      createUser.data.role === null
    ) {
      return {
        success: false,
        message: 'Failed to create user ',
      };
    }

    // Create JWT token session
    const session = await createSession(
      createUser.data.user_id,
      createUser.data.username,
      createUser.data.role
    );

    if (!session) {
      return {
        success: false,
        message: 'Failed to create session',
      };
    }

    return {
      success: true,
      message: 'Sign up successful!',
    };
  } catch (error) {
    console.error('An error occured during sign up', error);
    return {
      success: false,
      message: 'Failed to sign up',
      error: 'An error occured while signing you up',
    };
  }
}

export async function adminSignUp(formData: FormData): Promise<ActionResponse> {
  try {
    // Get form data
    const data = {
      organizationName: formData.get('organizationName') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate result using zod
    const validateResult = AdminSignUpSchema.safeParse(data);

    if (!validateResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.flatten().fieldErrors,
      };
    }

    // Checks if organization already exists
    const isOrganizationExists = await getOrganizationInfo(data.email);

    if (isOrganizationExists.success) {
      return {
        success: false,
        message: 'Organization already exists',
      };
    }

    // Checks if username already taken
    const organizationUsername = await getUsername(data.username);

    if (organizationUsername.success) {
      return {
        success: false,
        message: 'Username already taken',
      };
    }

    // Insert organization info to the database
    const organization = await insertOrganization({
      organizationName: data.organizationName,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (
      !organization.success ||
      organization.data === undefined ||
      organization.data.role === null
    ) {
      return {
        success: false,
        message: 'Insertion failed',
        error: 'Failed to insert organization data',
      };
    }

    const session = await createSession(
      organization.data.user_id,
      organization.data.username,
      organization.data.role
    );

    if (!session) {
      return {
        success: false,
        message: 'Failed to create session',
        error: 'Session creation failed',
      };
    }

    return {
      success: true,
      message: 'Sign up successfully!',
    };
  } catch (error) {
    console.error('An error occured:', error);
    return {
      success: false,
      message: 'Failed to sign up',
      error: 'Server error. Failed to sign up',
    };
  }
}
