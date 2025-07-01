// src/app/(dashboard)/documents/page.js
"use client";

import { useEffect, useState } from "react";
import { documentService } from "@/lib/services/documentService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentService
      .getAll()
      .then(setDocuments)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Dokumenty</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc._id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{doc.title}</h3>
              <p className="text-sm text-gray-500">{doc.type}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => documentService.previewPDF(doc._id)}
              >
                Podgląd
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => documentService.downloadPDF(doc._id)}
              >
                Pobierz
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
