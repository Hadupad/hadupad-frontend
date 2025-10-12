// import { getPropertyById, properties } from '../../../../../../data/properties';
// import AdminPropertyDetailClient from './AdminPropertyDetailClient';

// export async function generateStaticParams() {
//   return properties.map((property) => ({
//     id: property.id, // No need to call toString() as IDs are already strings (UUIDs)
//     name: property.name.toLowerCase().replace(/\s+/g, '-'),
//   }));
// }

// export default async function AdminPropertyDetail({ params }) {
//   const resolvedParams = await params;
//   const property = getPropertyById(resolvedParams.id);

//   if (!property) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="p-6">
//           <div className="max-w-6xl mx-auto text-center">
//             <h1 className="text-2xl font-semibold text-gray-900">Property not found</h1>
//             <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return <AdminPropertyDetailClient property={property} />;
// }

import { getPropertyById, properties } from '../../../../../../data/properties';
import AdminPropertyDetailClient from './AdminPropertyDetailClient';

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: String(property.id), // ✅ ensure it's a string
    name: property.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function AdminPropertyDetail({ params }) {
  const property = getPropertyById(params.id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Property not found</h1>
            <p className="text-gray-600 mt-2">
              The property you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminPropertyDetailClient property={property} />;
}
