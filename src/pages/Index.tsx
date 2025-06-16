
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SymptomChecker from '../components/SymptomChecker';
import PatientRecords from '../components/PatientRecords';
import TreatmentTracker from '../components/TreatmentTracker';
import EducationHub from '../components/EducationHub';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      <div id="home">
        <Hero />
      </div>
      <div id="symptom-checker" className="py-16">
        <SymptomChecker />
      </div>
      <div id="patient-records" className="py-16 bg-slate-50">
        <PatientRecords />
      </div>
      <div id="treatment-tracker" className="py-16">
        <TreatmentTracker />
      </div>
      <div id="education" className="py-16 bg-slate-50">
        <EducationHub />
      </div>
    </div>
  );
};

export default Index;
