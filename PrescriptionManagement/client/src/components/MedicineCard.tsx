import React, { useState } from 'react';
import { Link } from 'wouter';
import { Medicine } from '../types/Medicine';
import { ShieldCheck, ShieldAlert, Pill } from 'lucide-react'; // 🆕 Icons for prescription
import { getThumbnailUrl } from '@/lib/cloudinaryUtils';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const originalImageUrl = (medicine.image_url || '').trim();
  const optimizedImageUrl = getThumbnailUrl(originalImageUrl);
  const [imageSrc, setImageSrc] = useState<string>(originalImageUrl || optimizedImageUrl);

  return (
    <Link                                             
      href={`/medicine/${medicine._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-4 hover:scale-105"
    >
      <div className="flex items-start gap-4">
        {/* Image Section */}
        <div className="relative w-20 h-20 flex-shrink-0">
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
              )}
              <img
                src={imageSrc}
                alt={medicine.name}
                className={`w-full h-full object-contain rounded-lg bg-gray-50 transition-opacity ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  // Try original first (best if you store Cloudinary URLs in DB),
                  // then fall back to Cloudinary "fetch" optimized URL.
                  if (imageSrc === originalImageUrl && optimizedImageUrl && optimizedImageUrl !== originalImageUrl) {
                    setImageLoading(true);
                    setImageSrc(optimizedImageUrl);
                    return;
                  }
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            </>
          ) : (
            // Fallback: Placeholder with medicine icon
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
              <Pill className="w-10 h-10 text-blue-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-lg text-gray-900 truncate flex-1">
              {medicine.name}
            </h3>
            {/* 🆕 Prescription Badge */}
            {medicine.prescriptionRequired && (
              <div className="ml-2 flex items-center text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                <ShieldAlert className="w-3 h-3 mr-1" />
                Rx
              </div>
            )}
          </div>
          
          {medicine.manufacturer && (
            <p className="text-sm text-gray-600 mb-1">
              by {medicine.manufacturer}
            </p>
          )}
          
          {medicine.composition && (
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              <span className="font-medium">Composition:</span> {medicine.composition}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {medicine.price && (
              <span className="text-lg font-bold text-primary-600">
                {medicine.price}
              </span>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {medicine.letter}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MedicineCard;
