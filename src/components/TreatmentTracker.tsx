
import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Pill, TrendingUp } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface TreatmentSchedule {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  duration: string;
  completed: number;
  total: number;
  nextDose: string;
  adherence: number;
}

const TreatmentTracker = () => {
  const { toast } = useToast();
  const [treatments] = useState<TreatmentSchedule[]>([
    {
      id: '1',
      patientName: 'Adamu Ibrahim',
      medication: 'MDT-PB (Paucibacillary)',
      dosage: 'Rifampicin 600mg + Dapsone 100mg',
      frequency: 'Monthly supervised + Daily self-administered',
      startDate: '2024-01-15',
      duration: '6 months',
      completed: 16,
      total: 24,
      nextDose: '2024-06-18',
      adherence: 89
    },
    {
      id: '2',
      patientName: 'Fatima Yusuf',
      medication: 'MDT-MB (Multibacillary)',
      dosage: 'Rifampicin 600mg + Clofazimine 300mg + Dapsone 100mg',
      frequency: 'Monthly supervised + Daily self-administered',
      startDate: '2024-03-20',
      duration: '12 months',
      completed: 8,
      total: 48,
      nextDose: '2024-06-20',
      adherence: 95
    }
  ]);

  const markDoseCompleted = (treatmentId: string) => {
    toast({
      title: "Dose Recorded",
      description: "Treatment dose has been marked as completed.",
    });
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 90) return 'text-green-600 bg-green-100';
    if (adherence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'from-green-500 to-green-600';
    if (percentage >= 50) return 'from-blue-500 to-blue-600';
    return 'from-yellow-500 to-yellow-600';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Treatment Tracker</h2>
        <p className="text-lg text-gray-600">Monitor medication schedules and treatment adherence</p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Treatments</p>
              <p className="text-2xl font-bold text-gray-800">{treatments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Adherence</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(treatments.reduce((acc, t) => acc + t.adherence, 0) / treatments.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Due Today</p>
              <p className="text-2xl font-bold text-gray-800">
                {treatments.filter(t => t.nextDose === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Cards */}
      <div className="space-y-6">
        {treatments.map((treatment) => {
          const progressPercentage = (treatment.completed / treatment.total) * 100;
          const isOverdue = new Date(treatment.nextDose) < new Date();
          
          return (
            <div key={treatment.id} className="bg-white rounded-xl shadow-lg p-6 border">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {treatment.patientName}
                  </h3>
                  <p className="text-gray-600">{treatment.medication}</p>
                  <p className="text-sm text-gray-500 mt-1">{treatment.dosage}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAdherenceColor(treatment.adherence)}`}>
                    {treatment.adherence}% Adherence
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Next Dose</p>
                    <p className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
                      {new Date(treatment.nextDose).toLocaleDateString()}
                      {isOverdue && (
                        <span className="ml-2 text-red-500">
                          <AlertCircle className="w-4 h-4 inline" />
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Treatment Progress</span>
                  <span className="text-sm text-gray-600">
                    {treatment.completed} of {treatment.total} doses
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(treatment.completed, treatment.total)} transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(progressPercentage)}% complete
                </p>
              </div>

              {/* Treatment Details */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Start Date</p>
                    <p className="text-sm font-medium">{new Date(treatment.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="text-sm font-medium">{treatment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Pill className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Frequency</p>
                    <p className="text-sm font-medium">Daily</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Completion</p>
                    <p className="text-sm font-medium">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => markDoseCompleted(treatment.id)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all"
                >
                  Mark Dose Completed
                </button>
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                  View Full Schedule
                </button>
                <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Add Side Effects
                </button>
                <button className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-colors">
                  Set Reminder
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {treatments.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No active treatments</h3>
          <p className="text-gray-500">Treatment schedules will appear here once patients are assigned medication.</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentTracker;
