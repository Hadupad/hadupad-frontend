import { fetchPublicPropertiesApi } from '@/services/apis/publicPropertyApi';
import PropertyDetailClient from '../PropertyDetailClient';

export async function generateStaticParams() {
  try {
    const properties = await fetchPublicPropertiesApi();
    console.log('Properties:', properties); // Debug: Log the properties
    return properties.map((property) => ({
      id: property.id, // Ensure property.id is a string and matches the expected format
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PropertyPage({ params }) {
  const { id } = params;
  return <PropertyDetailClient propertyId={id} />;
}
