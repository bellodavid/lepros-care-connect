import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Info, ArrowRight, Camera, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ImageAnalysis from './ImageAnalysis';

const SymptomChecker = () => {
  const { toast } = useToast();
  const [assessmentType, setAssessmentType] = useState<'questionnaire' | 'image' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [imageAnalysisResult, setImageAnalysisResult] = useState<{
    riskLevel: string;
    confidence: number;
    findings: string[];
  } | null>(null);

  const questions = [
    {
      id: 0,
      question: "Do you have patches of skin that are lighter or darker than normal?",
      options: ["Yes", "No", "Not sure"]
    },
    {
      id: 1,
      question: "Have you noticed any patches of skin with reduced sensation (numbness)?",
      options: ["Yes", "No", "Not sure"]
    },
    {
      id: 2,
      question: "Do you have any thickened nerves under your skin?",
      options: ["Yes", "No", "Not sure"]
    },
    {
      id: 3,
      question: "Have you experienced muscle weakness in hands or feet?",
      options: ["Yes", "No", "Not sure"]
    },
    {
      id: 4,
      question: "Do you have any painless wounds or ulcers?",
      options: ["Yes", "No", "Not sure"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentStep]: answer });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeSymptoms();
    }
  };

  const analyzeSymptoms = () => {
    const yesCount = Object.values(answers).filter(answer => answer === "Yes").length;
    const notSureCount = Object.values(answers).filter(answer => answer === "Not sure").length;
    
    let riskLevel = "Low";
    let recommendation = "";
    let color = "green";

    if (yesCount >= 3) {
      riskLevel = "High";
      recommendation = "Immediate medical consultation recommended. Multiple symptoms suggest possible leprosy.";
      color = "red";
    } else if (yesCount >= 2 || (yesCount >= 1 && notSureCount >= 2)) {
      riskLevel = "Medium";
      recommendation = "Medical consultation advised within 1-2 weeks. Some symptoms require professional evaluation.";
      color = "yellow";
    } else {
      riskLevel = "Low";
      recommendation = "Continue monitoring symptoms. Consult healthcare provider if symptoms persist or worsen.";
      color = "green";
    }

    toast({
      title: `Risk Assessment: ${riskLevel} Risk`,
      description: recommendation,
      variant: color === "red" ? "destructive" : "default",
    });

    setCurrentStep(questions.length);
  };

  const handleImageAnalysisComplete = (result: { riskLevel: string; confidence: number; findings: string[] }) => {
    setImageAnalysisResult(result);
  };

  const resetAssessment = () => {
    setAssessmentType(null);
    setCurrentStep(0);
    setAnswers({});
    setImageAnalysisResult(null);
  };

  // Show assessment type selection
  if (!assessmentType) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">AI-Assisted Health Assessment</h2>
          <p className="text-lg text-gray-600">Choose your preferred assessment method</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            onClick={() => setAssessmentType('questionnaire')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Symptom Questionnaire</h3>
              <p className="text-gray-600 mb-4">
                Answer a series of questions about symptoms you may be experiencing
              </p>
              <div className="text-sm text-blue-600 font-medium">
                5 questions • 2-3 minutes
              </div>
            </div>
          </div>

          <div 
            onClick={() => setAssessmentType('image')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-green-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Photo Analysis</h3>
              <p className="text-gray-600 mb-4">
                Upload a photo of your skin for AI-powered visual analysis
              </p>
              <div className="text-sm text-green-600 font-medium">
                1 photo • 1-2 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show image analysis
  if (assessmentType === 'image') {
    if (imageAnalysisResult) {
      const { riskLevel, confidence, findings } = imageAnalysisResult;
      let RiskIcon = CheckCircle;
      let colorClass = "text-green-600";

      if (riskLevel === "High") {
        RiskIcon = AlertTriangle;
        colorClass = "text-red-600";
      } else if (riskLevel === "Medium") {
        RiskIcon = AlertTriangle;
        colorClass = "text-yellow-600";
      }

      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Analysis Complete</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <RiskIcon className={`w-16 h-16 ${colorClass} mx-auto mb-4`} />
              <h3 className={`text-2xl font-bold ${colorClass} mb-2`}>
                {riskLevel} Risk Level
              </h3>
              <p className="text-gray-600 mb-4">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Analysis Findings:</h4>
              <ul className="space-y-1">
                {findings.map((finding, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Important Note:</p>
                  <p>This AI analysis is for screening purposes only and does not replace professional medical diagnosis. Always consult with a qualified healthcare provider.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetAssessment}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                New Assessment
              </button>
              <a
                href="#patient-records"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all text-center"
              >
                Create Patient Record
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Photo Analysis</h2>
          <button
            onClick={resetAssessment}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Assessment Options
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <ImageAnalysis onAnalysisComplete={handleImageAnalysisComplete} />
        </div>
      </div>
    );
  }

  // Rest of the questionnaire logic remains the same
  if (currentStep >= questions.length) {
    const yesCount = Object.values(answers).filter(answer => answer === "Yes").length;
    let riskLevel = "Low";
    let recommendation = "";
    let RiskIcon = CheckCircle;
    let colorClass = "text-green-600";

    if (yesCount >= 3) {
      riskLevel = "High";
      recommendation = "Immediate medical consultation recommended. Multiple symptoms suggest possible leprosy.";
      RiskIcon = AlertTriangle;
      colorClass = "text-red-600";
    } else if (yesCount >= 2) {
      riskLevel = "Medium";
      recommendation = "Medical consultation advised within 1-2 weeks. Some symptoms require professional evaluation.";
      RiskIcon = AlertTriangle;
      colorClass = "text-yellow-600";
    } else {
      recommendation = "Continue monitoring symptoms. Consult healthcare provider if symptoms persist or worsen.";
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <RiskIcon className={`w-16 h-16 ${colorClass} mx-auto mb-4`} />
            <h3 className={`text-2xl font-bold ${colorClass} mb-2`}>
              {riskLevel} Risk Level
            </h3>
            <p className="text-gray-600">{recommendation}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Note:</p>
                <p>This assessment is for screening purposes only and does not replace professional medical diagnosis. Always consult with a qualified healthcare provider.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetAssessment}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Take Assessment Again
            </button>
            <a
              href="#patient-records"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all text-center"
            >
              Create Patient Record
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Symptom Questionnaire</h2>
        <p className="text-lg text-gray-600">Answer a few questions to assess leprosy risk factors</p>
        <button
          onClick={resetAssessment}
          className="text-blue-600 hover:text-blue-700 font-medium mt-2"
        >
          ← Back to Assessment Options
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-600">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep) / questions.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentStep].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 group-hover:text-blue-700">
                    {option}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
