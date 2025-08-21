import { getPropertyById, properties } from '../../../../../data/properties';
import PropertyDetailClient from './PropertyDetailClient';

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id.toString(),
    name: property.name.toLowerCase().replace(/\s+/g, '-')
  }));
}

export default async function PropertyDetail({ params }) {
  const resolvedParams = await params;
  const property = getPropertyById(resolvedParams.id);

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-[100px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Property not found</h1>
            <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return <PropertyDetailClient property={property} />;
}
