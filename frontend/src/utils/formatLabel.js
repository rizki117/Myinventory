









export const formatLabel = (key, fieldLabels = {}) => 
  fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  