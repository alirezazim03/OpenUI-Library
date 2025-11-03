"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCheckmark, IoClose } from "react-icons/io5";

const PasswordStrengthMeter = ({ onChange }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({ label: "", score: 0 });

  const requirements = [
    { id: 1, text: "At least 8 characters", test: (val) => val.length >= 8 },
    { id: 2, text: "One uppercase letter", test: (val) => /[A-Z]/.test(val) },
    { id: 3, text: "One number", test: (val) => /[0-9]/.test(val) },
    { id: 4, text: "One special character", test: (val) => /[^A-Za-z0-9]/.test(val) },
  ];

  const evaluate = (val) => {
    if (!val) return { label: "", score: 0, color: "" };
    
    let score = 0;
    requirements.forEach((req) => {
      if (req.test(val)) score++;
    });

    const strengthMap = {
      1: { label: "Weak", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
      2: { label: "Fair", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
      3: { label: "Good", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      4: { label: "Strong", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
    };

    return { ...strengthMap[score], score };
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    const s = evaluate(val);
    setStrength(s);
    if (onChange) onChange(val, s.label);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Create Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-white transition-colors"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
        </div>

        {password && (
          <div className="space-y-4">
            <div className={`rounded-lg p-4 border ${strength.bgColor} ${strength.borderColor}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Password strength
                </span>
                <span className={`text-sm font-semibold ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Password must contain:
              </p>
              <div className="space-y-2">
                {requirements.map((req) => {
                  const isMet = req.test(password);
                  return (
                    <div
                      key={req.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isMet
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {isMet ? <IoCheckmark size={14} /> : <IoClose size={14} />}
                      </div>
                      <span
                        className={`transition-colors ${
                          isMet ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;