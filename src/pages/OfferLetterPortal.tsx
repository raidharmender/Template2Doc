import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type OfferLetter = {
  id: string;
  data: Record<string, any>;
};

const OfferLetterPortal = () => {
  const [offers, setOffers] = useState<OfferLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [searchFin, setSearchFin] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const fetchOffers = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/offer-letter/all")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDownloadPdf = async (id: string) => {
    const pdfResp = await fetch(`http://localhost:8000/api/offer-letter/${id}/pdf`);
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer letter?")) return;
    const resp = await fetch(`http://localhost:8000/api/offer-letter/${id}`, { method: "DELETE" });
    if (resp.ok) fetchOffers();
  };

  const filteredOffers = offers.filter((offer) => {
    return (
      (!searchId || offer.id.includes(searchId)) &&
      (!searchFin || (offer.data.nricFin || "").toLowerCase().includes(searchFin.toLowerCase())) &&
      (!searchPhone || (offer.data.mobileNumber || "").includes(searchPhone))
    );
  });

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">All Offer Letters</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Search by FIN/NRIC"
          value={searchFin}
          onChange={e => setSearchFin(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchPhone}
          onChange={e => setSearchPhone(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Full Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Designation</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{offer.id}</td>
                  <td className="px-4 py-2">{offer.data.fullName}</td>
                  <td className="px-4 py-2">{offer.data.emailAddress}</td>
                  <td className="px-4 py-2">{offer.data.designation}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button onClick={() => handleDownloadPdf(offer.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Download PDF
                    </Button>
                    <Button onClick={() => handleDelete(offer.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfferLetterPortal; 