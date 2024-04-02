import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

//GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response('Property not found', { status: 404 });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error on finding property', { status: 500 });
  }
};

//DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', {
        status: 401,
        message: 'Please login',
      });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response('Property not found', { status: 404 });
    }

    if (property.owner.toString() !== userId) {
      return new Response('You are not the owner of this property', {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response('Property deleted successfully', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error on deleting property', { status: 500, error });
  }
};

//PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', {
        status: 401,
        message: 'Please login',
      });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response('Property not found', { status: 404 });
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorised Access', {
        status: 401,
      });
    }

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    const property = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error on creating property', { status: 500 });
  }
};
