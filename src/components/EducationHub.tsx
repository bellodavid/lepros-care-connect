
import React, { useState } from 'react';
import { BookOpen, Download, Play, Users, AlertTriangle, Heart, Shield } from 'lucide-react';

const EducationHub = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const educationalContent = {
    overview: {
      title: 'Understanding Leprosy',
      content: [
        {
          icon: AlertTriangle,
          title: 'What is Leprosy?',
          description: 'Leprosy (Hansen\'s disease) is a chronic infectious disease caused by Mycobacterium leprae. It primarily affects the skin, peripheral nerves, mucosal surfaces, and eyes.'
        },
        {
          icon: Users,
          title: 'Transmission',
          description: 'Leprosy spreads through prolonged, close contact with untreated patients via respiratory droplets. It is not highly contagious and most people have natural immunity.'
        },
        {
          icon: Shield,
          title: 'Prevention',
          description: 'Early detection and treatment prevent disability. BCG vaccination may provide some protection. Good hygiene and avoiding close contact with untreated patients helps.'
        }
      ]
    },
    symptoms: {
      title: 'Signs & Symptoms',
      content: [
        {
          icon: AlertTriangle,
          title: 'Early Signs',
          description: 'Skin patches that are lighter or darker than normal skin, often with reduced sensation. These patches may be flat or slightly raised.'
        },
        {
          icon: Heart,
          title: 'Nerve Involvement',
          description: 'Thickened nerves, loss of sensation in hands and feet, muscle weakness, and paralysis of small muscles in hands and feet.'
        },
        {
          icon: Shield,
          title: 'Advanced Symptoms',
          description: 'Painless wounds, eye problems, nose deformity, and claw-like hands. These complications can be prevented with early treatment.'
        }
      ]
    },
    treatment: {
      title: 'Treatment Protocols',
      content: [
        {
          icon: BookOpen,
          title: 'MDT - Multidrug Therapy',
          description: 'WHO-recommended treatment combining rifampicin, dapsone, and clofazimine. Duration: 6 months for PB, 12 months for MB leprosy.'
        },
        {
          icon: Users,
          title: 'Patient Management',
          description: 'Regular follow-up, disability prevention, wound care, and psychological support. Treatment is free and available at health centers.'
        },
        {
          icon: Heart,
          title: 'Contact Screening',
          description: 'Examine household contacts and close associates annually for 5 years. Early detection in contacts prevents transmission and disability.'
        }
      ]
    }
  };

  const resources = [
    {
      title: 'WHO Leprosy Guidelines 2024',
      description: 'Complete treatment and management guidelines',
      type: 'PDF',
      size: '2.3 MB'
    },
    {
      title: 'Patient Education Materials',
      description: 'Printable materials for patient education',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'Disability Prevention Exercises',
      description: 'Video guide for preventing disabilities',
      type: 'Video',
      size: '45 min'
    },
    {
      title: 'Contact Screening Checklist',
      description: 'Step-by-step screening guide',
      type: 'PDF',
      size: '0.5 MB'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'symptoms', label: 'Symptoms', icon: AlertTriangle },
    { id: 'treatment', label: 'Treatment', icon: Heart }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Education Hub</h2>
        <p className="text-lg text-gray-600">Comprehensive resources and verified treatment protocols</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2 border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {educationalContent[activeTab as keyof typeof educationalContent].title}
            </h3>
            
            <div className="space-y-6">
              {educationalContent[activeTab as keyof typeof educationalContent].content.map((item, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resources & Downloads</h3>
            
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">{resource.title}</h4>
                    <div className="flex space-x-1">
                      {resource.type === 'Video' ? (
                        <Play className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Download className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{resource.size}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      {resource.type === 'Video' ? 'Watch' : 'Download'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Need More Help?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Contact our medical support team for additional resources or training materials.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Emergency Protocols</h3>
          <p className="text-sm text-gray-600 mb-4">Quick reference for medical emergencies</p>
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">View Guide</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Community Training</h3>
          <p className="text-sm text-gray-600 mb-4">Materials for community health workers</p>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm">Access Materials</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Patient Support</h3>
          <p className="text-sm text-gray-600 mb-4">Counselling and social support resources</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Learn More</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Research Updates</h3>
          <p className="text-sm text-gray-600 mb-4">Latest research and clinical findings</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
