
import { useState } from 'react';
import { FormData, initialFormData } from '@/types/formTypes';
import { validateForm } from '@/utils/formValidation';
import { useToast } from "@/hooks/use-toast";

export const useOfferLetterForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData, toast)) return;
    
    setIsGenerating(true);
    
    // Simulate document generation process
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast({
        title: "Success!",
        description: "Your offer letter has been generated successfully.",
      });
    }, 3000);
  };

  const handleDownload = () => {
    // In a real implementation, this would trigger the actual PDF download
    toast({
      title: "Download Started",
      description: "Your offer letter PDF is being downloaded.",
    });
  };

  const handleReset = () => {
    setIsGenerated(false);
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return {
    formData,
    isGenerating,
    isGenerated,
    currentStep,
    handleInputChange,
    handleSubmit,
    handleDownload,
    handleReset
  };
};
