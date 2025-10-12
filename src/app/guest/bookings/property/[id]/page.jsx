import { fetchPublicPropertiesApi } from '@/services/apis/publicPropertyApi';
import PropertyDetailClient from '../PropertyDetailClient';

export async function generateStaticParams() {
  try {
    const properties = await fetchPublicPropertiesApi();
    console.log('Properties:', properties); // Debug: Log the properties
    return properties
      .filter((property) => property.id !== undefined && property.id !== null)
      .map((property) => ({
        id: String(property.id),
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
