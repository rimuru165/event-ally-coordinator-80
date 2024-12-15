import { useState, useEffect } from "react";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { ParticipantCard } from "@/components/gallery/ParticipantCard";

interface Registration {
  id: string;
  name: string;
  school: string;
  eventType: string;
  course: string;
  year: string;
  status: string;
  qualification: string;
}

const OfficialGallery = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [schoolFilter, setSchoolFilter] = useState<string>("all");
  const [participants, setParticipants] = useState<Registration[]>([]);
  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]') as Registration[];
    const qualifiedParticipants = registrations.filter(
      (r) => r.status === 'approved' && r.qualification === 'qualified'
    );
    setParticipants(qualifiedParticipants);

    const uniqueSchools = Array.from(new Set(qualifiedParticipants.map(p => p.school)));
    setSchools(uniqueSchools);
  }, []);

  const filteredParticipants = participants.filter((participant) => {
    return (
      (eventTypeFilter === "all" || participant.eventType === eventTypeFilter) &&
      (schoolFilter === "all" || participant.school === schoolFilter)
    );
  });

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Participant Gallery</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            .card {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 8px;
            }
            .name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            @media print {
              .card {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Official Participant Gallery</h1>
            <p>Total Participants: ${filteredParticipants.length}</p>
          </div>
          <div class="grid">
            ${filteredParticipants.map(p => `
              <div class="card">
                <div class="name">${p.name}</div>
                <p><strong>School:</strong> ${p.school}</p>
                <p><strong>Event Type:</strong> ${p.eventType}</p>
                <p><strong>Course:</strong> ${p.course}</p>
                <p><strong>Year Level:</strong> ${p.year}</p>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        <GalleryHeader onPrint={handlePrint} />

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 tracking-wide text-center mb-8">
            Official Participant Gallery
          </h1>
          
          <GalleryFilters
            schools={schools}
            onEventTypeChange={setEventTypeFilter}
            onSchoolChange={setSchoolFilter}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParticipants.map((participant) => (
              <ParticipantCard
                key={participant.id}
                name={participant.name}
                school={participant.school}
                eventType={participant.eventType}
                course={participant.course}
                year={participant.year}
              />
            ))}
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cyan-300 text-lg">No qualified participants found matching the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialGallery;