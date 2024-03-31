import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';

//GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params?.userId;

    if (!userId) {
      return new Response('User Id is required', {
        status: 401,
        message: 'Please login',
      });
    }
    const properties = await Property.find({ owner: userId });

    if (!properties || properties.length === 0) {
      return new Response('Properties not found', { status: 404 });
    }

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error on finding properties', { status: 500 });
  }
};
