// src/components/reports/ReportGenerator.js - Generator raportów
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { adminService } from "@/lib/services/adminService";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { format } from "date-fns";

export default function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const reportType = watch("reportType");

  const onSubmit = async (data) => {
    try {
      setIsGenerating(true);

      let reportData;
      switch (data.reportType) {
        case "financial":
          reportData = await adminService.getFinancialReport(
            data.startDate,
            data.endDate
          );
          break;
        case "patient":
          reportData = await adminService.getPatientStats(data.period);
          break;
        case "visit":
          reportData = await adminService.getVisitStats(data.period);
          break;
        default:
          throw new Error("Unknown report type");
      }

      // Download as PDF or CSV
      if (data.format === "pdf") {
        const blob = await adminService.exportData(data.reportType, {
          startDate: data.startDate,
          endDate: data.endDate,
          format: "pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `raport-${data.reportType}-${format(
          new Date(),
          "yyyy-MM-dd"
        )}.pdf`;
        a.click();
      } else {
        // Display in table format
        console.log("Report data:", reportData);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Generator Raportów</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Typ raportu"
          {...register("reportType", { required: true })}
        >
          <option value="">Wybierz typ raportu</option>
          <option value="financial">Raport finansowy</option>
          <option value="patient">Statystyki pacjentów</option>
          <option value="visit">Statystyki wizyt</option>
          <option value="employee">Statystyki pracowników</option>
        </Select>

        {reportType === "financial" && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data od" type="date" {...register("startDate")} />
            <Input label="Data do" type="date" {...register("endDate")} />
          </div>
        )}

        {["patient", "visit"].includes(reportType) && (
          <Select label="Okres" {...register("period")}>
            <option value="week">Ostatni tydzień</option>
            <option value="month">Ostatni miesiąc</option>
            <option value="quarter">Ostatni kwartał</option>
            <option value="year">Ostatni rok</option>
          </Select>
        )}

        <Select label="Format" {...register("format")}>
          <option value="table">Tabela</option>
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
        </Select>

        <Button type="submit" variant="primary" disabled={isGenerating}>
          {isGenerating ? "Generowanie..." : "Generuj Raport"}
        </Button>
      </form>
    </Card>
  );
}
