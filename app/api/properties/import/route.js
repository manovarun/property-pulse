import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

//POST /api/properties/import
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    const userId = userId;

    const propertyData = [
      {
        owner: userId,
        name: 'Boston Commons Retreat',
        type: 'Apartment',
        description:
          'This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.',
        location: {
          street: '120 Tremont Street',
          city: 'Boston',
          state: 'MA',
          zipcode: '02108',
        },
        beds: 2,
        baths: 1,
        square_feet: 1500,
        amenities: [
          'Wifi',
          'Full kitchen',
          'Washer & Dryer',
          'Free Parking',
          'Hot Tub',
          '24/7 Security',
          'Wheelchair Accessible',
          'Elevator Access',
          'Dishwasher',
          'Gym/Fitness Center',
          'Air Conditioning',
          'Balcony/Patio',
          'Smart TV',
          'Coffee Maker',
        ],
        rates: {
          weekly: 1100,
          monthly: 4200,
        },
        seller_info: {
          name: 'John Doe',
          email: 'john@gmail.com',
          phone: '617-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711708574/propertypulse/a1_hlwbrf.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711708574/propertypulse/a2_kaj95u.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711708574/propertypulse/a3_semacx.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711708647/propertypulse/a4_pxhlzp.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Cozy Downtown Loft',
        type: 'Apartment',
        description: 'A cozy downtown loft with great city views.',
        location: {
          street: '45 Main Street',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
        },
        beds: 1,
        baths: 1,
        square_feet: 1800,
        amenities: [
          'Wifi',
          'Full kitchen',
          'Washer & Dryer',
          'Free Parking',
          'Hot Tub',
          '24/7 Security',
          'Wheelchair Accessible',
          'Elevator Access',
          'Dishwasher',
          'High-Speed Internet',
          'Air Conditioning',
          'Smart TV',
          'Outdoor Grill/BBQ',
        ],
        rates: {
          weekly: 1000,
          monthly: 4000,
        },
        seller_info: {
          name: 'Jane Smith',
          email: 'jane@gmail.com',
          phone: '212-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711708677/propertypulse/b1_g9maqw.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711708677/propertypulse/b2_cyefsb.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711708678/propertypulse/b3_n68fiv.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-02T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Luxury Condo with a View',
        type: 'Condo',
        description:
          'Experience luxury in this stunning condo with breathtaking views.',
        location: {
          street: '500 Lux Lane',
          city: 'Los Angeles',
          state: 'CA',
          zipcode: '90001',
        },
        beds: 3,
        baths: 2,
        square_feet: 2200,
        amenities: [
          'Wifi',
          'Full kitchen',
          'Washer & Dryer',
          'Free Parking',
          'Hot Tub',
          '24/7 Security',
          'Wheelchair Accessible',
          'Elevator Access',
          'Dishwasher',
          'Swimming Pool',
          'Gym/Fitness Center',
          'Air Conditioning',
          'Smart TV',
          'Coffee Maker',
        ],
        rates: {
          nightly: 200,
          weekly: 750,
          monthly: 3300,
        },
        seller_info: {
          name: 'David Johnson',
          email: 'david@gmail.com',
          phone: '213-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709207/propertypulse/c1_s1461u.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709208/propertypulse/c2_r8torr.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709213/propertypulse/c3_c7zt4w.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709208/propertypulse/c4_pjv7vt.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-03T00:00:00.000Z',
        updatedAt: '2024-01-03T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Charming Cottage Getaway',
        type: 'Cottage Or Cabin',
        description: 'Escape to this charming cottage for a peaceful retreat.',
        location: {
          street: '123 Countryside Lane',
          city: 'Austin',
          state: 'TX',
          zipcode: '78701',
        },
        beds: 1,
        baths: 1,
        square_feet: 900,
        amenities: [
          'Fireplace',
          'Outdoor Grill/BBQ',
          'Balcony/Patio',
          'Coffee Maker',
        ],
        rates: {
          weekly: 2000,
        },
        seller_info: {
          name: 'Emily Davis',
          email: 'emily@gmail.com',
          phone: '512-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709224/propertypulse/d1_x9sl5y.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709226/propertypulse/d2_fuuhqx.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709230/propertypulse/d3_r7sfme.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-04T00:00:00.000Z',
        updatedAt: '2024-01-04T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Modern Downtown Studio',
        type: 'Studio',
        description: 'Stay in style in this modern downtown studio apartment.',
        location: {
          street: '75 Urban Avenue',
          city: 'Chicago',
          state: 'IL',
          zipcode: '60601',
        },
        beds: 1,
        baths: 1,
        square_feet: 900,
        amenities: [
          'High-Speed Internet',
          'Smart TV',
          'Air Conditioning',
          'Gym/Fitness Center',
          'Outdoor Grill/BBQ',
        ],
        rates: {
          weekly: 1100,
          monthly: 4200,
        },
        seller_info: {
          name: 'Michael Brown',
          email: 'michael@gmail.com',
          phone: '312-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709222/propertypulse/e1_zgyjib.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709222/propertypulse/e2_uhla8b.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709229/propertypulse/e3_qplsrg.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709233/propertypulse/e4_zonhh7.jpg',
        ],
        is_featured: true,
        createdAt: '2024-01-05T00:00:00.000Z',
        updatedAt: '2024-01-05T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Seaside Retreat',
        type: 'House',
        description: 'Escape to this seaside house for a relaxing getaway.',
        location: {
          street: '456 Oceanfront Drive',
          city: 'Miami',
          state: 'FL',
          zipcode: '33101',
        },
        beds: 4,
        baths: 3,
        square_feet: 2800,
        amenities: [
          'Beach Access',
          'Swimming Pool',
          'Balcony/Patio',
          'Smart TV',
          'Outdoor Grill/BBQ',
        ],
        rates: {
          nightly: 500,
          weekly: 2500,
        },
        seller_info: {
          name: 'Sarah Wilson',
          email: 'sarah@gmail.com',
          phone: '305-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709239/propertypulse/f1_kifz8q.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709233/propertypulse/f2_k7kheb.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709235/propertypulse/f3_isdqfy.jpg',
        ],
        is_featured: true,
        createdAt: '2024-01-06T00:00:00.000Z',
        updatedAt: '2024-01-06T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Rustic Cabin in the Woods',
        type: 'Cottage Or Cabin',
        description: 'Experience nature in this cozy rustic cabin.',
        location: {
          street: '789 Forest Lane',
          city: 'Denver',
          state: 'CO',
          zipcode: '80201',
        },
        beds: 2,
        baths: 1,
        square_feet: 1100,
        amenities: [
          'Fireplace',
          'Outdoor Grill/BBQ',
          'Hiking Trails Access',
          'Pet-Friendly',
        ],
        rates: {
          nightly: 475,
          weekly: 2000,
        },
        seller_info: {
          name: 'Robert Anderson',
          email: 'robert@gmail.com',
          phone: '303-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709232/propertypulse/g1_qalvis.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709239/propertypulse/g2_w8yhgn.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709236/propertypulse/g3_ph5ekn.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709238/propertypulse/g4_f06tqu.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-07T00:00:00.000Z',
        updatedAt: '2024-01-07T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Ski-In/Ski-Out Chalet',
        type: 'Chalet',
        description: 'Hit the slopes from this cozy ski-in/ski-out chalet.',
        location: {
          street: '321 Mountain Road',
          city: 'Aspen',
          state: 'CO',
          zipcode: '81611',
        },
        beds: 3,
        baths: 2,
        square_feet: 1800,
        amenities: [
          'Ski Equipment Storage',
          'Fireplace',
          'Balcony/Patio',
          'Smart TV',
        ],
        rates: {
          nightly: 300,
          weekly: 1100,
        },
        seller_info: {
          name: 'Jennifer Martin',
          email: 'jennifer@gmail.com',
          phone: '970-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709255/propertypulse/h1_yqfltx.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709255/propertypulse/h2_xohv6z.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709258/propertypulse/h3_ozvlun.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-08T00:00:00.000Z',
        updatedAt: '2024-01-08T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Mountain View Retreat',
        type: 'House',
        description:
          'Enjoy stunning mountain views from this spacious retreat.',
        location: {
          street: '600 Summit Drive',
          city: 'Boulder',
          state: 'CO',
          zipcode: '80301',
        },
        beds: 4,
        baths: 3,
        square_feet: 2400,
        amenities: [
          'Mountain View',
          'Hiking Trails Access',
          'Air Conditioning',
          'Smart TV',
          'Outdoor Grill/BBQ',
        ],
        rates: {
          weekly: 1000,
          monthly: 3800,
        },
        seller_info: {
          name: 'Lisa Taylor',
          email: 'lisa@gmail.com',
          phone: '303-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709260/propertypulse/i1_vzebqi.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709263/propertypulse/i2_hyqvhx.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709262/propertypulse/i3_jbyqgn.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-09T00:00:00.000Z',
        updatedAt: '2024-01-09T00:00:00.000Z',
      },
      {
        owner: userId,
        name: 'Historic Downtown Loft',
        type: 'Apartment',
        description:
          'Step back in time with a stay in this historic downtown loft.',
        location: {
          street: '123 History Lane',
          city: 'Philadelphia',
          state: 'PA',
          zipcode: '19101',
        },
        beds: 2,
        baths: 1,
        square_feet: 1200,
        amenities: [
          'High-Speed Internet',
          'Air Conditioning',
          'Smart TV',
          'Coffee Maker',
        ],
        rates: {
          weekly: 550,
          monthly: 2100,
        },
        seller_info: {
          name: 'Matthew Harris',
          email: 'matthew@gmail.com',
          phone: '215-555-5555',
        },
        images: [
          'https://res.cloudinary.com/varun-next/image/upload/v1711709263/propertypulse/j1_zq5tfg.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709261/propertypulse/j2_ofx5ox.jpg',
          'https://res.cloudinary.com/varun-next/image/upload/v1711709263/propertypulse/j3_y5wxgm.jpg',
        ],
        is_featured: false,
        createdAt: '2024-01-10T00:00:00.000Z',
        updatedAt: '2024-01-10T00:00:00.000Z',
      },
    ];

    const properties = await Property.insertMany(propertyData);

    return new Response(JSON.stringify(properties), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error on creating property', { status: 500 });
  }
};
