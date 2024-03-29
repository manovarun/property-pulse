import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

//GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error on finding properties', { status: 500 });
  }
};

//POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', {
        status: 401,
        message: 'Please login',
      });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image.name != '');

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

    //upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert the image data to base64
      const imageBased64 = imageData.toString('base64');

      //Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBased64}`,
        {
          folder: 'propertypulse',
        }
      );

      imageUploadPromises.push(result.secure_url);

      //Wait for all images to be uploaded
      const uploadedImages = await Promise.all(imageUploadPromises);

      //Add uploaded images to propertyData object
      propertyData.images = uploadedImages;
    }

    const property = new Property(propertyData);

    await property.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${property._id}`
    );

    // return new Response(JSON.stringify(property), {
    //   status: 201,
    // });
  } catch (error) {
    console.log(error);
    return new Response('Error on creating property', { status: 500 });
  }
};
