import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Download } from "lucide-react";
import { FormData } from '@/types/formTypes';

interface SuccessCardProps {
  formData: FormData;
  onDownload: () => void;
  onReset: () => void;
}

const SuccessCard = ({ formData, onDownload, onReset }: SuccessCardProps) => {
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
        
        <div className="space-y-6">
          <Button 
            onClick={onDownload}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.05] hover:shadow-xl rounded-xl h-14"
          >
            <Download className="h-6 w-6 mr-3" />
            Download PDF Document
          </Button>
          
          <div className="pt-6">
            <Button 
              variant="outline"
              onClick={onReset}
              className="text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium rounded-xl h-12 transition-all duration-200"
            >
              Generate Another Letter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
