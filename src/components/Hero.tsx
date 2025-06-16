
import React from 'react';
import { Shield, Users, MapPin, BookOpen } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Shield,
      title: 'Early Detection',
      description: 'AI-assisted symptom assessment for early leprosy detection'
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Digital records and comprehensive patient care tracking'
    },
    {
      icon: MapPin,
      title: 'Community Care',
      description: 'GPS-enabled tracking for community health workers'
    },
    {
      icon: BookOpen,
      title: 'Treatment Protocols',
      description: 'Access to verified treatment guidelines and resources'
    }
  ];

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Smart Healthcare
            </span>
            <br />
            <span className="text-gray-800">for Leprosy Care</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Empowering healthcare workers and communities with digital tools for early detection, 
            patient management, and comprehensive leprosy care in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#symptom-checker"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Start Symptom Assessment
            </a>
            <a
              href="#patient-records"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              Manage Patients
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
