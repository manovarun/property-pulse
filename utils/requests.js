const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
//Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      {
        cache: 'no-store',
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Could not fetch properties: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Could not fetch properties: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

//Fetch single property
export { fetchProperties, fetchProperty };
