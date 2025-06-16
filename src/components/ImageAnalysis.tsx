
import React, { useState } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ImageAnalysisProps {
  onAnalysisComplete: (result: { riskLevel: string; confidence: number; findings: string[] }) => void;
}

const ImageAnalysis = ({ onAnalysisComplete }: ImageAnalysisProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis (in a real app, this would call an AI service)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis results based on random factors
      const mockAnalysis = generateMockAnalysis();
      
      toast({
        title: "Analysis Complete",
        description: `Risk Level: ${mockAnalysis.riskLevel}`,
        variant: mockAnalysis.riskLevel === "High" ? "destructive" : "default",
      });

      onAnalysisComplete(mockAnalysis);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockAnalysis = () => {
    const random = Math.random();
    
    if (random < 0.3) {
      return {
        riskLevel: "High",
        confidence: 0.85,
        findings: [
          "Hypopigmented patches detected",
          "Possible nerve involvement areas",
          "Irregular skin texture patterns"
        ]
      };
    } else if (random < 0.6) {
      return {
        riskLevel: "Medium",
        confidence: 0.72,
        findings: [
          "Slight skin discoloration observed",
          "Texture changes in localized areas",
          "Requires professional evaluation"
        ]
      };
    } else {
      return {
        riskLevel: "Low",
        confidence: 0.91,
        findings: [
          "Normal skin pigmentation",
          "No obvious lesions detected",
          "Regular monitoring recommended"
        ]
      };
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          AI-Powered Skin Analysis
        </h3>
        <p className="text-gray-600">
          Upload a clear photo of the affected skin area for analysis
        </p>
      </div>

      {!imagePreview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload Skin Photo
              </p>
              <p className="text-sm text-gray-500 mb-4">
                JPG, PNG up to 10MB
              </p>
              <label className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Choose Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded skin photo"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-center">
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 inline-flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Important Notice:</p>
            <p>
              This AI analysis is for screening purposes only and should not replace professional medical diagnosis. 
              Always consult with a qualified healthcare provider for proper evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
