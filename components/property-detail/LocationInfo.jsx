import Map from './Map';
import PropTypes from 'prop-types';

export default function LocationInfo({ property }) {
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Where you'll be</h2>
        
        {/* Interactive Map */}
        <div className="w-full h-48 mb-3">
          <Map />
        </div>
        
        {/* Location description */}
        <p className="text-gray-700 text-sm mb-4">
          {property.description || 'This is an amazing self con apartment available at the university of abuja'}
        </p>
      </div>

      {/* Address details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">Address</h3>
          <p className="text-gray-900 text-sm">
            {`${property.streetAddress || 'Area 3 garki abuja nigeria'}, ${property.aptSuiteNumber || 'Area 10, garki abuja'}`}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">City</h3>
          <p className="text-gray-900 text-sm">{property.city || 'Abuja'}</p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">State</h3>
          <p className="text-gray-900 text-sm">{property.state || 'Abuja'}</p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">Country</h3>
          <p className="text-gray-900 text-sm">{property.country || 'Nigeria'}</p>
        </div>
      </div>
    </div>
  );
}

LocationInfo.propTypes = {
  property: PropTypes.shape({
    description: PropTypes.string,
    streetAddress: PropTypes.string,
    aptSuiteNumber: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};