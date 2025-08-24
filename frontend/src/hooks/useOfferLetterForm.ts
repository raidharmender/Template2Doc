
import { useState } from 'react';
import { FormData, initialFormData } from '@/types/formTypes';
import { validateForm } from '@/utils/formValidation';
import { useToast } from "@/hooks/use-toast";

export const useOfferLetterForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [offerId, setOfferId] = useState<string | null>(null);
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
    try {
      const response = await fetch("/api/offer-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData })
      });
      if (!response.ok) throw new Error("Failed to submit form");
      const result = await response.json();
      setIsGenerating(false);
      setIsGenerated(true);
      setOfferId(result.id);
      toast({
        title: "Success!",
        description: "Your offer letter has been saved.",
      });
    } catch (err) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: (err as Error).message || "Failed to connect to backend.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (!offerId) return;
    try {
      const pdfResp = await fetch(`/api/offer-letter/${offerId}/pdf`);
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
      } else {
        toast({
          title: "Error",
          description: "Failed to download PDF.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message || "Failed to download PDF.",
        variant: "destructive"
      });
    }
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
    handleDownloadPdf,
    handleReset,
    offerId
  };
};
