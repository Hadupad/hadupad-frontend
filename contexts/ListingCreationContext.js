"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const LISTING_ACTIONS = {
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  UPDATE_DATA: 'UPDATE_DATA',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_FLOW: 'RESET_FLOW',
  SAVE_DRAFT: 'SAVE_DRAFT',
  LOAD_DRAFT: 'LOAD_DRAFT'
};

// Initial state
const initialState = {
  currentStep: 0,
  totalSteps: 17,
  isLoading: false,
  error: null,
  formData: {
    // Step 1: Property basics
    propertyType: '',
    placePrivacy: '',
    address: '',
    fullAddress: {},
    coordinates: null,
    roomCounts: {},
    
    // Step 2: Details
    amenities: [],
    photos: [],
    title: '',
    description: '',
    
    // Step 3: Booking & Pricing
    bookingSettings: {},
    pricing: {},
    discounts: {}
  },
  isDraft: false,
  lastSaved: null
};

// Reducer
function listingReducer(state, action) {
  switch (action.type) {
    case LISTING_ACTIONS.SET_STEP:
      return { ...state, currentStep: action.payload };
    
    case LISTING_ACTIONS.NEXT_STEP:
      return { 
        ...state, 
        currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
      };
    
    case LISTING_ACTIONS.PREV_STEP:
      return { 
        ...state, 
        currentStep: Math.max(state.currentStep - 1, 0) 
      };
    
    case LISTING_ACTIONS.UPDATE_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        isDraft: true
      };
    
    case LISTING_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case LISTING_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case LISTING_ACTIONS.RESET_FLOW:
      return { ...initialState };
    
    case LISTING_ACTIONS.SAVE_DRAFT:
      return { 
        ...state, 
        isDraft: false, 
        lastSaved: new Date().toISOString() 
      };
    
    case LISTING_ACTIONS.LOAD_DRAFT:
      return { 
        ...state, 
        formData: { ...state.formData, ...action.payload },
        isDraft: false 
      };
    
    default:
      return state;
  }
}

// Context
const ListingCreationContext = createContext();

// Provider
export function ListingCreationProvider({ children }) {
  const [state, dispatch] = useReducer(listingReducer, initialState);

  const actions = {
    setStep: (step) => dispatch({ type: LISTING_ACTIONS.SET_STEP, payload: step }),
    nextStep: () => dispatch({ type: LISTING_ACTIONS.NEXT_STEP }),
    prevStep: () => dispatch({ type: LISTING_ACTIONS.PREV_STEP }),
    updateData: (data) => dispatch({ type: LISTING_ACTIONS.UPDATE_DATA, payload: data }),
    setLoading: (loading) => dispatch({ type: LISTING_ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: LISTING_ACTIONS.SET_ERROR, payload: error }),
    resetFlow: () => dispatch({ type: LISTING_ACTIONS.RESET_FLOW }),
    
    // Draft management
    saveDraft: () => {
      try {
        localStorage.setItem('listing_draft', JSON.stringify(state.formData));
        dispatch({ type: LISTING_ACTIONS.SAVE_DRAFT });
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    },
    
    loadDraft: () => {
      try {
        const draft = localStorage.getItem('listing_draft');
        if (draft) {
          const draftData = JSON.parse(draft);
          dispatch({ type: LISTING_ACTIONS.LOAD_DRAFT, payload: draftData });
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    },
    
    clearDraft: () => {
      localStorage.removeItem('listing_draft');
    },

    // Validation
    validateCurrentStep: () => {
      // Add step-specific validation logic here
      return true;
    },

    // Progress calculation
    getProgress: () => {
      return Math.round((state.currentStep / state.totalSteps) * 100);
    }
  };

  // Auto-save draft functionality
  useEffect(() => {
    if (state.isDraft && state.currentStep > 0) {
      const timer = setTimeout(() => {
        actions.saveDraft();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [state.formData, state.isDraft]);

  // Load draft on mount
  useEffect(() => {
    actions.loadDraft();
  }, []);

  const value = {
    ...state,
    ...actions
  };

  return (
    <ListingCreationContext.Provider value={value}>
      {children}
    </ListingCreationContext.Provider>
  );
}

// Hook
export function useListingCreation() {
  const context = useContext(ListingCreationContext);
  if (!context) {
    throw new Error('useListingCreation must be used within ListingCreationProvider');
  }
  return context;
}

export { LISTING_ACTIONS };
