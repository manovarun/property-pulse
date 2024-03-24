const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

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

export { fetchProperties };
