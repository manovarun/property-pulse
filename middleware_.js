import { NextResponse } from 'next/server';
import { getSessionUser } from './utils/getSessionUser';

export async function middleware(request) {
  const session = await getSessionUser();

  console.log('Sessionz:', session);

  // If the user is authenticated with Google, allow access to specified paths
  if (session?.user?.provider === 'google') {
    console.log('User authenticated with Google');
    return NextResponse.next();
  } else {
    console.log('User not authenticated with Google');
  }

  // If the user is not authenticated with Google, redirect to '/'
  console.log('Redirecting to home');
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
