import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Download } from "lucide-react";
import { FormData } from '@/types/formTypes';

interface SuccessCardProps {
  formData: FormData;
  onDownload?: () => void;
  onReset: () => void;
  offerId?: string;
}

const SuccessCard = ({ formData, onReset, offerId }: SuccessCardProps) => {
  const handleDownloadPdf = async () => {
    if (!offerId) return;
    const pdfResp = await fetch(`http://localhost:8000/api/offer-letter/${offerId}/pdf`);
    if (pdfResp.ok) {
      const blob = await pdfResp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'offer_letter.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <CardTitle className="flex items-center text-2xl font-bold">
            <CheckCircle className="h-7 w-7 mr-3" />
            Offer Letter Generated Successfully!
          </CardTitle>
          <CardDescription className="text-green-100 text-lg mt-2">
            Your personalized offer letter is ready for download
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-10 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Offer Letter for {formData.fullName}
          </h3>
          <p className="text-gray-600 text-lg">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        {offerId && (
          <Button onClick={handleDownloadPdf} className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold mb-4">
            <Download className="h-5 w-5 mr-2" /> Download PDF Document
          </Button>
        )}
        <div>
          <Button onClick={onReset} className="mt-4 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold">
            Fill Another Offer Letter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
