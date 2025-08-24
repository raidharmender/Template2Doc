
import OfferLetterForm from "@/components/OfferLetterForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end mb-6">
        <Button onClick={() => navigate("/portal")} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
          View All Offer Letters
        </Button>
      </div>
      <OfferLetterForm />
    </>
  );
};

export default Index;
