// src/app/(dashboard)/documents/page.js
"use client";
import { useEffect, useState } from "react";
import { documentService } from "@/lib/services/documentService";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function DocumentsPage() {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    documentService.getAll().then(setDocs);
  }, []);

  if (!docs)
    return (
      <div className="p-12 text-center">
        <Spinner />
      </div>
    );

  return (
    <div className="space-y-4">
      {docs.map((d) => (
        <Card key={d._id} className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">{d.title}</p>
            <p className="text-sm text-gray-500">{d.type}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => documentService.previewPDF(d._id)}
            >
              Podgląd
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                documentService.downloadPDF(d._id, `${d.title}.pdf`)
              }
            >
              Pobierz PDF
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
