
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, User } from "lucide-react";
import { useOfferLetterForm } from '@/hooks/useOfferLetterForm';
import FormHeader from './forms/FormHeader';
import ProgressSteps from './forms/ProgressSteps';
import BackendIntegrationNotice from './forms/BackendIntegrationNotice';
import PersonalInfoSection from './forms/PersonalInfoSection';
import AddressInfoSection from './forms/AddressInfoSection';
import EmploymentDetailsSection from './forms/EmploymentDetailsSection';
import CompensationSection from './forms/CompensationSection';
import SuccessCard from './forms/SuccessCard';

const OfferLetterForm = () => {
  const {
    formData,
    isGenerating,
    isGenerated,
    currentStep,
    handleInputChange,
    handleSubmit,
    handleDownload,
    handleReset,
    offerId,
    handleDownloadPdf
  } = useOfferLetterForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <FormHeader />
        <ProgressSteps currentStep={currentStep} />

        {!isGenerated ? (
          <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <User className="h-6 w-6 mr-3" />
                  Employee Information Form
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-2">
                  Please provide accurate information for the offer letter generation
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-12">
                <PersonalInfoSection formData={formData} handleInputChange={handleInputChange} />
                <AddressInfoSection formData={formData} handleInputChange={handleInputChange} />
                <EmploymentDetailsSection formData={formData} handleInputChange={handleInputChange} />
                <CompensationSection formData={formData} handleInputChange={handleInputChange} />

                {/* Submit Button */}
                <div className="pt-8 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    disabled={isGenerating}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:transform-none disabled:opacity-70 rounded-xl"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        Generating Your Offer Letter...
                      </>
                    ) : (
                      <>
                        <FileText className="h-6 w-6 mr-3" />
                        Generate Professional Offer Letter
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <SuccessCard 
            formData={formData} 
            onReset={handleReset} 
            offerId={offerId}
          />
        )}

        <BackendIntegrationNotice />
      </div>
    </div>
  );
};

export default OfferLetterForm;
