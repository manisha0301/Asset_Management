import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

const textFields = [
  { name: 'assetModelNo', label: 'Asset Model No', placeholder: 'Dell Inspiron 2332' },
  { name: 'name', label: 'Name', placeholder: 'MBA' },
  { name: 'description', label: 'Description', placeholder: 'good' },
  { name: 'location', label: 'Location', placeholder: 'workings' },
  { name: 'note', label: 'Note', placeholder: 'ftytyyt' },
];

const selectFields = [
  {
    name: 'assetStatus',
    label: 'Asset Status',
    options: ['Available', 'Assigned', 'Under Maintenance', 'Disposed'],
  },
  {
    name: 'category',
    label: 'Category',
    options: ['IT', 'Furniture', 'Equipment', 'Vehicle'],
  },
  {
    name: 'subCategory',
    label: 'Sub Category',
    options: ['IT', 'Hardware', 'Software', 'Accessories'],
  },
  {
    name: 'supplier',
    label: 'Supplier',
    options: ['Rakesh Jain', 'Supplier 2', 'Supplier 3'],
  },
  {
    name: 'department',
    label: 'Department',
    options: ['Information Technology', 'Human Resources', 'Finance', 'Marketing'],
  },
  {
    name: 'subDepartment',
    label: 'Sub Department',
    options: ['Procurement Specialist', 'IT Support', 'Development', 'Security'],
  },
  {
    name: 'assignEmployee',
    label: 'Assign Employee',
    options: ['Radhika Gandhi', 'Rakesh Jain', 'Employee 3'],
  },
];

const dateFields = [
  { name: 'dateOfPurchase', label: 'Date Of Purchase' },
  { name: 'dateOfManufacture', label: 'Date Of Manufacture' },
  { name: 'createdDate', label: 'Created Date' },
];

const numberFields = [
  { name: 'warrantyInMonth', label: 'Warranty In Month' },
];

const fileFields = [
  { name: 'image', label: 'Image' },
];

const initialForm = {
  assetModelNo: '',
  name: '',
  description: '',
  assetStatus: 'Available',
  dateOfPurchase: '',
  category: 'IT',
  subCategory: 'IT',
  supplier: 'Rakesh Jain',
  department: 'Information Technology',
  subDepartment: 'Procurement Specialist',
  dateOfManufacture: '',
  warrantyInMonth: '',
  location: '',
  note: '',
  createdDate: '',
  assignEmployee: 'Radhika Gandhi',
  image: null,
  barcodeSVG: '',
};

const EditAssetForm = ({ isOpen, onClose, onSubmit, asset }) => {
  const [formData, setFormData] = useState(initialForm);
  const [isJsBarcodeLoaded, setIsJsBarcodeLoaded] = useState(false);

  // Load JsBarcode
  useEffect(() => {
    if (window.JsBarcode) {
      setIsJsBarcodeLoaded(true);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js';
      script.async = true;
      script.onload = () => setIsJsBarcodeLoaded(true);
      script.onerror = () => console.error('Failed to load JsBarcode');
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // Initialize form data
  useEffect(() => {
    if (asset) {
      setFormData({
        ...initialForm,
        ...asset,
        assetStatus: asset.status || 'Available',
        assignEmployee: asset.assignedEmployee || 'Radhika Gandhi',
        barcodeSVG: asset.barcodeSVG || '',
      });
    } else {
      setFormData(initialForm);
    }
  }, [asset]);

  // Generate barcode when assetModelNo changes
  useEffect(() => {
    const barcodeElement = document.getElementById('barcode');
    if (barcodeElement) {
      barcodeElement.innerHTML = ''; // Clear previous barcode
    }

    if (isJsBarcodeLoaded && formData.assetModelNo && barcodeElement) {
      try {
        window.JsBarcode('#barcode', formData.assetModelNo, {
          format: 'CODE128',
          displayValue: true,
          fontSize: 14,
          height: 60,
          width: 2,
          textMargin: 2,
          margin: 10,
          background: '#ffffff',
          lineColor: '#000000',
        });
        // Capture the SVG content
        const svgContent = barcodeElement.outerHTML;
        setFormData((prev) => ({ ...prev, barcodeSVG: svgContent }));
      } catch (error) {
        console.error('Barcode generation failed:', error);
        if (barcodeElement) {
          barcodeElement.innerHTML = `<text x="10" y="30" font-size="14" fill="#000">Invalid model number</text>`;
        }
        setFormData((prev) => ({ ...prev, barcodeSVG: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, barcodeSVG: '' }));
    }
  }, [formData.assetModelNo, isJsBarcodeLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: asset?.id }); // Include the asset ID
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Asset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {textFields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <input
                  type={f.type || 'text'}
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            {selectFields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <select
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {f.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {dateFields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <div className="relative">
                  <input
                    type="date"
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            ))}
            {numberFields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <input
                  type="number"
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            {fileFields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                <div className="flex items-center gap-4">
                  {formData[f.name] && (
                    <img
                      src={formData[f.name]}
                      alt={f.label}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, f.name)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
              <div className="flex items-center gap-4">
                {isJsBarcodeLoaded && formData.assetModelNo ? (
                  <svg
                    id="barcode"
                    className="w-60 h-16"
                    style={{ display: 'block' }}
                  ></svg>
                ) : (
                  <div className="flex items-center justify-center border border-gray-300 rounded">
                    <span className="text-xs text-gray-600">
                      {isJsBarcodeLoaded
                        ? 'Enter model number to generate barcode'
                        : 'Loading barcode generator...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetForm;