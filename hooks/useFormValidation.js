"use client";

import { useState, useCallback } from 'react';

export default function useFormValidation(validationRules = {}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return null;

    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.requiredMessage || `${fieldName} is required`;
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      return rule.minLengthMessage || `${fieldName} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      return rule.maxLengthMessage || `${fieldName} must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      return rule.patternMessage || `${fieldName} format is invalid`;
    }

    if (rule.custom && typeof rule.custom === 'function') {
      return rule.custom(value);
    }

    return null;
  }, [validationRules]);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  }, [validateField, validationRules]);

  const handleFieldChange = useCallback((fieldName, value) => {
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, [errors]);

  const handleFieldBlur = useCallback((fieldName, value) => {
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
    clearErrors,
    hasErrors: Object.keys(errors).some(key => errors[key])
  };
}
