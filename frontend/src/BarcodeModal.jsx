import { X, Printer } from "lucide-react";

const BarcodeModal = ({ isOpen, onClose, barcodeSVG }) => {
  if (!isOpen || !barcodeSVG) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: #fff;
            }
            svg {
              max-width: 90%;
              max-height: 90%;
              width: 300px;
              height: auto;
            }
            @media print {
              body {
                margin: 0;
              }
              svg {
                max-width: 100%;
                max-height: 100%;
                width: 300px;
                height: auto;
              }
            }
          </style>
        </head>
        <body>
          ${barcodeSVG}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    
    // Use setTimeout to ensure the print dialog is triggered after the document is fully loaded
    setTimeout(() => {
      printWindow.print();
      // Close the window after a delay to allow the print dialog to appear
      setTimeout(() => {
        printWindow.close();
      }, 100);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-52 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <Printer className="w-4 h-4" />
            Print Barcode
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex justify-center items-center">
          <div
            className="w-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: barcodeSVG }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarcodeModal;