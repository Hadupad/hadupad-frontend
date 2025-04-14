"use client"

import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const faqs = [
  {
    question: "What is refundable caution fee?",
    answer:
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "How do I list my property on Hadupad?",
    answer: "",
  },
  {
    question: "What is my booking reference number?",
    answer: "",
  },
  {
    question: "How are payments confirmed?",
    answer: "",
  },
  {
    question: "How do i get in contact with the property owner",
    answer: "",
  },
  {
    question: "Can i get a refund?",
    answer: "",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-50 max-w-7xl mx-auto">
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 leading-tight">
        Frequently Asked Questions
      </h2>

      <p className="text-center mb-10 text-base md:text-lg">
        For support reach out to our support team @{" "}
        <span className="font-medium">
          +2348062489517, +2348087884829, info@hadupad.com
        </span>
      </p>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl px-6 py-5 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#1E0E62]">
                    {faq.question}
                  </h3>
                  {isOpen && faq.answer && (
                    <p className="text-sm text-black mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>

                {/* Square Icon with rounded edges */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`${
                    isOpen
                      ? "bg-[#DC4731] text-white"
                      : "bg-[#F7F7FF] text-[#6F6C90]"
                  } w-7 h-7 flex items-center justify-center rounded-md`}
                >
                  {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
