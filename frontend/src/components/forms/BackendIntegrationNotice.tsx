
import React from 'react';
import { FileText } from "lucide-react";

const BackendIntegrationNotice = () => {
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Backend Integration Required</h3>
          <div className="text-blue-800">
            <p className="mb-3">
              To complete the PDF generation functionality, you'll need to integrate with a backend service that can:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Process Word (.docx) templates with placeholder replacement</li>
              <li>Convert populated documents to PDF format</li>
              <li>Handle file downloads securely</li>
            </ul>
            <p>
              Consider using libraries like <code className="px-2 py-1 bg-blue-100 rounded-lg font-mono">docxtemplater</code> for template processing 
              and <code className="px-2 py-1 bg-blue-100 rounded-lg font-mono">pdf-lib</code> or <code className="px-2 py-1 bg-blue-100 rounded-lg font-mono">puppeteer</code> for PDF generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendIntegrationNotice;
